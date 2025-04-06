/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { notifyWaitlistSignup } from './notifyWaitlistSignup';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Export the Cloud Functions
export const waitlistSignup = onCall(async (request) => {
  try {
    const { name, email, propertyCount } = request.data;
    logger.info("New waitlist signup", { name, email, propertyCount });
    
    // Generate an entry ID
    const entryId = `waitlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Call the notification handler with the entry ID
    return await notifyWaitlistSignup({
      entryId,
      name,
      email,
      propertyCount
    });
  } catch (error) {
    logger.error("Error in waitlist signup", error);
    throw new Error('Failed to process waitlist signup');
  }
});
