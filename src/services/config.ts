export const config = {
  // Google AI Studio API
  googleAI: {
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY || '',
    projectId: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT_ID || '',
  },
  
  // WhatsApp API (Meta)
  whatsapp: {
    apiKey: import.meta.env.VITE_WHATSAPP_API_KEY || '',
    phoneNumberId: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || '',
    businessAccountId: import.meta.env.VITE_WHATSAPP_BUSINESS_ACCOUNT_ID || '',
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