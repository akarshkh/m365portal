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
                .select("id,displayName,userPrincipalName")
                .top(25)
                .get();

            const users = usersResponse.value;

            // 2. Fetch Mailbox Settings for each user 
            // Using BETA for deeper property access
            const detailedReports = await Promise.all(users.map(async (user) => {
                try {
                    const settings = await this.client.api(`/beta/users/${user.id}/mailboxSettings`).get();

                    return {
                        displayName: user.displayName,
                        emailAddress: user.userPrincipalName,
                        archivePolicy: settings.archiveStatus === 'active' || settings.archiveStatus === 'enabled',
                        retentionPolicy: "Default Policy",
                        autoExpanding: settings.autoExpandingArchive === 'enabled' || settings.autoExpandingArchive === 'true'
                    };
                } catch (err) {
                    return {
                        displayName: user.displayName,
                        emailAddress: user.userPrincipalName,
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
