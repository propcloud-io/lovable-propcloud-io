import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
const supabaseUrl = 'https://ixnfbfvbvwwqvnlnwvxs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bmZiZnZidnd3cXZubG53dnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2NTI0NzcsImV4cCI6MjAzMTIyODQ3N30.Yd_QlUQBOIHu5gDNGR-7-vJv8QVU9RJkEjL0SkXgB0Y';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection by getting the current user
async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if we can access the waitlist table
    console.log('\nTest 1: Checking waitlist table...');
    const { data: tables, error: tablesError } = await supabase
      .from('waitlist')
      .select('*')
      .limit(1);
    
    if (tablesError) {
      console.error('Error accessing waitlist table:', tablesError);
    } else {
      console.log('Successfully accessed waitlist table');
      console.log('Sample data:', tables);
    }
    
    // Test 2: Try to insert a test record
    console.log('\nTest 2: Trying to insert a test record...');
    const testEntry = {
      email: `test-${Date.now()}@example.com`,
      full_name: 'Test User',
      number_of_properties: 5,
      signed_up_at: new Date().toISOString()
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('waitlist')
      .insert(testEntry)
      .select('*')
      .single();
    
    if (insertError) {
      console.error('Error inserting test record:', insertError);
    } else {
      console.log('Successfully inserted test record');
      console.log('Inserted data:', insertData);
    }
    
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
  }
}

// Run the test
testConnection();
