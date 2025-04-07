// Next.js API route for waitlist submissions
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the form data from the request body
    const { email, fullName, numberOfProperties } = req.body;

    // Validate the required fields
    if (!email || !fullName) {
      return res.status(400).json({ error: 'Email and full name are required' });
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ixnfbfvbvwwqvnlnwvxs.supabase.co';
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bmZiZnZidnd3cXZubG53dnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2NTI0NzcsImV4cCI6MjAzMTIyODQ3N30.Yd_QlUQBOIHu5gDNGR-7-vJv8QVU9RJkEjL0SkXgB0Y';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Format the entry for insertion
    const waitlistEntry = {
      email,
      full_name: fullName,
      number_of_properties: numberOfProperties || null,
      signed_up_at: new Date().toISOString()
    };

    // Insert the entry into the waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert(waitlistEntry);

    // Handle errors
    if (error) {
      console.error('Error inserting waitlist entry:', error);
      return res.status(500).json({ error: error.message, details: error });
    }

    // Return success response
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}
