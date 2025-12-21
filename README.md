# M365 Portal

A modern, unified operations portal for Microsoft 365. This application provides real-time telemetry, license tracking, and mailbox reporting directly from Microsoft Graph API.

## 🚀 Features

- **Unified Dashboard**: Oversight of core M365 services (Exchange, Entra, Intune, Purview).
- **Exchange Reports**: Real-time mailbox statistics, archive status, and migration tracking.
- **Licensing Analysis**: Detailed breakdown of tenant SKUs, assigned seats, and usage metrics.
- **Secure Authentication**: Integrated with Microsoft Identity Platform (MSAL).

---

## 🛠️ Prerequisites

Before you begin, ensure you have:
- An **Azure AD (Entra ID) Tenant**.
- **Global Administrator** or **Privileged Role Administrator** access (to grant API permissions).
- [Node.js](https://nodejs.org/) installed (v18+ recommended).

---

## 🔐 Azure Setup Instructions

### 1. App Registration
1. Sign in to the [Azure Portal](https://portal.azure.com/).
2. Navigate to **Microsoft Entra ID** > **App registrations** > **New registration**.
3. **Name**: `M365 Portal` (or any preferred name).
4. **Supported account types**: `Accounts in this organizational directory only (Single tenant)`.
5. **Redirect URI**:
    - Select **SPA (Single-page application)** from the dropdown.
    - Enter `http://localhost:5173` (for local development).
6. Click **Register**.

### 2. API Permissions
1. In your registered app, go to **API permissions** > **Add a permission**.
2. Select **Microsoft Graph** > **Delegated permissions**.
3. Search and add the following permissions:
    - `User.Read`
    - `User.Read.All`
    - `Directory.Read.All`
    - `MailboxSettings.Read`
    - `Organization.Read.All`
    - `Reports.Read.All`
4. Click **Add permissions**.
5. **CRITICAL**: Click **Grant admin consent for [Your Tenant Name]** to enable these permissions for all users.

### 3. Client ID & Tenant ID
- Copy the **Application (client) ID** and **Directory (tenant) ID** from the **Overview** page. You'll need these for your environment variables.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory and add the following:

```env
VITE_CLIENT_ID=your_client_id_here
VITE_TENANT_ID=your_tenant_id_here
VITE_AZURE_MFA_FUNCTION_URL=optional_azure_function_url
```

---

## 🏃 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the App**:
   ```bash
   npm run dev
   ```

3. **Access the Portal**: Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Azure Functions (Optional)

For features like "Bulk MFA Enforcement", you will need to host an Azure Function. See the setup guide in [azure_function_setup.md](./azure_function_setup.md) for details.
