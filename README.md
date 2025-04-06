# PropCloud.io Assistant App (propassistant-ai)

This repository contains the frontend application for PropCloud.io, an AI-powered property management dashboard.

## Vision

The goal of PropCloud.io is to provide property owners and managers with a unified platform to manage their portfolio efficiently. The core concept involves:

1.  **Onboarding:** Guiding users through the initial setup.
2.  **Connect & Sync:** Integrating with various Online Travel Agencies (OTAs like Airbnb, Vrbo, Booking.com), websites, and social media to sync property, booking, and communication data into a central Supabase backend.
3.  **Unified Overview:** Presenting aggregated data (bookings, messages, revenue, occupancy, operational tasks) on a central dashboard.
4.  **Automation:** Implementing AI-driven features for sales automation (dynamic pricing - future), communication (suggested replies, templates), and operations (automated cleaning/maintenance scheduling).
5.  **Optimization:** Providing insights and reports to help users optimize their operations, aiming for autonomous property management.

## Tech Stack

*   **Framework:** React (using Vite)
*   **Language:** TypeScript
*   **UI Library:** Shadcn UI
*   **Styling:** Tailwind CSS
*   **Backend:** Supabase (Authentication, Database, Edge Functions)
*   **Routing:** React Router DOM
*   **Email:** Resend (via Supabase Edge Function)
*   **Deployment:** Currently deployed on Netlify (previously testing Lovable)

## Current Status (As of 2025-04-06)

*   **Public Landing Page:** Functional landing page (`src/pages/Index.tsx`) displaying marketing sections.
*   **Waitlist:** Waitlist form (`src/components/WaitlistSection.tsx`) collects user Name, Email, and Property Count and attempts to save to Supabase.
*   **Waitlist Email Alert:** An Edge Function (`handle-waitlist-signup`) integrated with Resend exists to send internal email alerts for new signups. **Note:** The trigger mechanism (Supabase Database Webhook) is currently suspected to be unreliable or misconfigured, preventing alerts from firing consistently upon database insertion. Requires further investigation/support.
*   **Login/Authentication:** Basic user login (`src/components/LoginForm.tsx`) using Supabase Auth is implemented.
*   **Authenticated Dashboard View:**
    *   A unified dashboard layout (`src/components/layout/DashboardLayout.tsx` with sidebar) is implemented using nested routing under `/app`.
    *   The main dashboard overview (`AuthenticatedDashboard` component within `src/pages/Index.tsx`) displays **simulated data** for:
        *   Portfolio Overview stats.
        *   Upcoming Activity (bookings with source indicators).
        *   Unread Messages (with source indicators).
        *   Operational Alerts.
    *   This serves as a **visual demo** of the target unified view.
*   **Properties Page:** Basic page (`src/pages/Properties.tsx`) exists under `/app/properties`, displaying a table of **simulated** properties with placeholder Add/Edit/Delete actions.
*   **Logout:** Functional logout button in the sidebar.
*   **Deployment:** Successfully deployed to Netlify with SPA redirect rules configured via `netlify.toml`. Supabase environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) have been configured on Netlify.
*   **Lovable Deployment:** Stuck due to platform issues (incorrect build error reporting, failing to deploy latest commits).

## Key Pending Features / Next Steps

1.  **Resolve Waitlist Email Alert Trigger:** Diagnose and fix the Supabase Database Webhook or implement a reliable alternative trigger for the `handle-waitlist-signup` Edge Function.
2.  **Implement Waitlist Confirmation Email:** Add logic to the Edge Function to send a confirmation email *to the user* upon successful waitlist signup.
3.  **Implement Settings & Integrations:**
    *   Build the UI for connecting/managing OTA accounts (Airbnb, Vrbo, etc.).
    *   Implement backend logic/Supabase Functions for syncing data (Properties, Bookings, Messages) from connected sources into local Supabase tables.
4.  **Connect Frontend to Real Data:** Replace all simulated data fetching (`useEffect` hooks with `setTimeout`) in the Dashboard, Properties, and other pages with actual Supabase client calls querying the (synced) local tables.
5.  **Implement Core Features (with real data):**
    *   **Bookings:** Build unified calendar/list views, manual booking creation, date blocking.
    *   **Communication:** Build unified inbox, implement sending replies via correct platform APIs. Implement AI features (templates, suggestions).
    *   **Operations:** Implement automated cleaning task generation based on check-outs, basic maintenance logging.
    *   **Reports:** Build key reports (Occupancy, Revenue by source) based on aggregated data.
    *   **Properties CRUD:** Implement the actual Supabase calls for Add/Edit/Delete in the `PropertiesPage`.
6.  **Waitlist-to-User Conversion:** Design and implement the flow for converting waitlist entries into active users (invite emails, password setup).
7.  **User Profile Management:** Implement viewing and editing user profile details.
8.  **Testing:** Add unit and integration tests.

## Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/propcloud-io/propassistant-ai.git
    cd propassistant-ai
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    *   Create a `.env` file in the project root.
    *   Add your Supabase URL and Anon Key:
        ```
        VITE_SUPABASE_URL=YOUR_SUPABASE_URL
        VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```
    *   (If implementing email alerts fully) Add your Resend API Key:
        ```
        RESEND_API_KEY=YOUR_RESEND_API_KEY
        ```
        *Note: RESEND_API_KEY is used server-side in the Edge Function, not directly exposed to the client.*
4.  **Run the development server:**
    ```bash
npm run dev
```
    The application should be available at `http://localhost:8080` (or the configured port).

## Deployment

*   **Production (Netlify):** https://polite-scone-26904e.netlify.app/
*   **Preview (Lovable - Currently Stuck):** [Link to Lovable project]

## Core Features

- **Sales Automation**
  - Direct bookings (social → WhatsApp/Messenger)
  - Smart pricing and OTA sync
  - Marketing automation and lead capture

- **Operations Automation**
  - Automated cleaning/maintenance management
  - Team coordination and task tracking
  - Inventory control

- **Communications Automation**
  - Full AI guest journey management
  - Multi-channel unified inbox
  - Automated support and issue handling

## Setup

### Prerequisites

- Node.js 18+
- Firebase account
- Google Cloud Platform account with credits

### Installation

1. Clone the repository:
```bash
git clone https://github.com/propcloud-io/lovable-propcloud-io.git
cd lovable-propcloud-io
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Cloud Platform:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable required APIs:
     - Vertex AI API
     - Cloud Storage API
   - Create a service account:
     - Go to "IAM & Admin" > "Service Accounts"
     - Click "Create Service Account"
     - Name it "propcloud-ai"
     - Grant roles:
       - `Vertex AI User`
       - `Storage Object Viewer`
   - Create and download a key:
     - Click on your service account
     - Go to "Keys" tab
     - Click "Add Key" > "Create New Key"
     - Choose JSON format
     - Save as `src/config/credentials/service-account.json`

4. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the following variables:
     ```
     GOOGLE_CLOUD_PROJECT=your-project-id
     GOOGLE_CLOUD_LOCATION=us-central1
     GMAIL_USER=your-email@gmail.com
     GOOGLE_CLIENT_ID=your-client-id
     GOOGLE_CLIENT_SECRET=your-client-secret
     GOOGLE_REFRESH_TOKEN=your-refresh-token
     NEXT_PUBLIC_API_URL=your-api-url
     ```

5. Start the development server:
```bash
npm run dev
```

## Architecture

- **Frontend**: Next.js with TypeScript
- **Backend**: Firebase Functions
- **Database**: Firestore
- **AI**: Google Vertex AI (Gemini Pro)
- **Authentication**: Firebase Auth
- **Storage**: Google Cloud Storage
- **Email**: Gmail API

## Development

### Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── config/          # Configuration files
├── domain/          # Domain models and interfaces
├── lib/
│   ├── ai/          # AI services (Vertex AI)
│   ├── firebase/    # Firebase services
│   └── utils/       # Utility functions
└── styles/          # Global styles
```

### Key Services

- `PropertyService`: Manages property listings and details
- `BookingService`: Handles reservations and availability
- `CommunicationService`: Manages guest-host messaging
- `TaskService`: Coordinates cleaning and maintenance
- `AIService`: Handles AI-powered features using Vertex AI

### Contributing

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push to the repository:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## License

Proprietary - All rights reserved
