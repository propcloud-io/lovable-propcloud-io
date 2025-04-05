export const config = {
  // Google AI Studio API
  googleAI: {
    apiKey: process.env.VITE_GOOGLE_AI_API_KEY || '',
    projectId: process.env.VITE_GOOGLE_CLOUD_PROJECT_ID || '',
  },
  
  // WhatsApp API (Meta)
  whatsapp: {
    apiKey: process.env.VITE_WHATSAPP_API_KEY || '',
    phoneNumberId: process.env.VITE_WHATSAPP_PHONE_NUMBER_ID || '',
    businessAccountId: process.env.VITE_WHATSAPP_BUSINESS_ACCOUNT_ID || '',
  },

  // Feature flags for development
  features: {
    useSimulatedOTAs: true, // Set to false when we have real OTA APIs
    enableWhatsApp: true,
    enableGoogleAI: true,
  },

  // Fallback settings
  fallbacks: {
    maxRetries: 3,
    retryDelay: 1000, // ms
    defaultLanguage: 'en',
  }
}; 