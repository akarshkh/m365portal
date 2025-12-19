export const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID_HERE", // Replace with your Application (client) ID from Azure Portal
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID_HERE", // Replace with your Directory (tenant) ID
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

// Scopes for the Graph API calls we need
export const loginRequest = {
    scopes: [
        "User.Read",
        "Directory.Read.All",
        "Reports.Read.All"
    ]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    // Endpoint for Mailbox usage and settings
    mailboxSettingsEndpoint: "https://graph.microsoft.com/v1.0/users"
};
