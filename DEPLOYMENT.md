# Deployment Guide for PropCloud.io

This guide provides instructions for deploying the PropCloud.io application to various platforms.

## Prerequisites

Before deploying, make sure you have:

1. A Supabase project set up with the required tables and configurations
2. Environment variables ready for the deployment platform
3. Built the application locally to verify it works correctly

## Environment Variables

The following environment variables are required for deployment:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment to Netlify

### Automatic Deployment (Recommended)

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add the environment variables in the Netlify dashboard
4. Enable automatic deployments for your branch

### Manual Deployment

1. Build the application locally:
   ```
   npm run build
   ```

2. Deploy using the Netlify CLI:
   ```
   netlify deploy --prod
   ```

## Deployment to Vercel

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Framework Preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add the environment variables in the Vercel dashboard
4. Deploy

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Make sure all dependencies are installed
   - Check for TypeScript errors
   - Verify the build command is correct

2. **Runtime Errors**
   - Check that all environment variables are set correctly
   - Verify Supabase connection is working
   - Check browser console for errors

3. **Routing Issues**
   - Ensure the `_redirects` file is present in the `public` directory for Netlify
   - For Vercel, check the `vercel.json` configuration

### Debugging Deployments

1. Enable verbose build logs in your deployment platform
2. Test the build locally before pushing changes
3. Use the platform's preview deployments to test changes before merging to main

## Post-Deployment Verification

After deploying, verify the following:

1. The landing page loads correctly
2. The waitlist form works
3. Authentication (login/signup) functions properly
4. Dashboard pages load for authenticated users
5. API calls to Supabase are successful
