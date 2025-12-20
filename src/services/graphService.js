import { Client } from "@microsoft/microsoft-graph-client";

export class GraphService {
    constructor(accessToken) {
        this.client = Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            },
        });
    }

    async getUserDetails() {
        return await this.client.api("/me").get();
    }

    // Fetches users and their mailbox settings using the Beta endpoint
    async getExchangeMailboxReport() {
        try {
            // 1. Get List of Users
            const usersResponse = await this.client.api("/users")
                .select("id,displayName,userPrincipalName,mail")
                .top(25)
                .get();

            const users = usersResponse.value;

            // 2. Fetch Mailbox Settings for each user 
            // Using BETA for deeper property access
            const detailedReports = await Promise.all(users.map(async (user) => {
                try {
                    // Note: accessing mailboxSettings for other users requires MailboxSettings.Read and can be restricted.
                    // If this fails, we return basic user info.
                    const settings = await this.client.api(`/beta/users/${user.id}/mailboxSettings`).get();

                    return {
                        displayName: user.displayName,
                        emailAddress: user.mail || user.userPrincipalName,
                        archivePolicy: settings.archiveStatus === 'active' || settings.archiveStatus === 'enabled',
                        retentionPolicy: settings.retentionPolicy || "Default Policy",
                        autoExpanding: settings.autoExpandingArchive === 'enabled' || settings.autoExpandingArchive === 'true'
                    };
                } catch (err) {
                    console.warn(`Failed to fetch settings for ${user.displayName}`, err);
                    return {
                        displayName: user.displayName,
                        emailAddress: user.mail || user.userPrincipalName,
                        archivePolicy: false,
                        retentionPolicy: "Not Set",
                        autoExpanding: false
                    };
                }
            }));

            return detailedReports;
        } catch (error) {
            console.error("Graph API Error:", error);
            throw error;
        }
    }
}
