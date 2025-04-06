import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

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
      
      // Check if the table exists
      const { data: schemaData, error: schemaError } = await supabase
        .rpc('get_schema_info');
      
      if (schemaError) {
        console.error('Error getting schema info:', schemaError);
      } else {
        console.log('Available tables:', schemaData);
      }
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
      
      // Clean up the test record
      const { error: deleteError } = await supabase
        .from('waitlist')
        .delete()
        .eq('id', insertData.id);
      
      if (deleteError) {
        console.error('Error deleting test record:', deleteError);
      } else {
        console.log('Successfully deleted test record');
      }
    }
    
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
  }
}

// Run the test
testConnection();
