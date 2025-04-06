# Local Development Guide

This guide provides instructions for setting up and running the PropCloud.io application locally.

## Prerequisites

Before starting local development, make sure you have:

1. Node.js (v16 or higher) installed
2. A Supabase project set up with the required tables and configurations
3. Your Supabase URL and Anon Key ready

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/propcloud-io/lovable-propcloud-io.git
   cd lovable-propcloud-io
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root (or run `npm start` which will create one for you)
   - Add your Supabase URL and Anon Key:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Testing the Waitlist Form

The waitlist form is located on the landing page. To test it:

1. Navigate to the landing page
2. Fill out the form with a name, email, and number of properties
3. Submit the form
4. Check the browser console for any errors
5. Verify in your Supabase dashboard that the entry was added to the `waitlist` table

## Testing Authentication

To test the authentication functionality:

1. Navigate to `/login` or click the "Login" button on the landing page
2. Use the login form to sign in with an existing account or create a new one
3. After successful authentication, you should be redirected to the dashboard
4. Test protected routes by trying to access `/app/dashboard` directly

## Troubleshooting

### Common Issues

1. **Supabase Connection Issues**
   - Verify your Supabase URL and Anon Key in the `.env` file
   - Check the browser console for any connection errors
   - Ensure your Supabase project is active and accessible

2. **Build Errors**
   - Make sure all dependencies are installed with `npm install`
   - Check for TypeScript errors with `npm run lint`

3. **Authentication Issues**
   - Ensure the Supabase Auth service is enabled in your project
   - Check that email confirmations are properly configured
   - Verify that Row Level Security (RLS) policies are set up correctly

### Getting Help

If you encounter any issues that aren't covered here, please:

1. Check the browser console for error messages
2. Look at the Supabase logs for any backend errors
3. Contact the development team for assistance
