
import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI
export const initVertexAI = () => {
  try {
    // Load credentials from environment variable or service account key file
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    if (!projectId) {
      throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set');
    }

    const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

    return new VertexAI({
      project: projectId,
      location
    });
  } catch (error) {
    console.error('Error initializing Vertex AI:', error);
    throw error;
  }
};

// Cache the Vertex AI instance
let vertexAIInstance: VertexAI | null = null;

export const getVertexAI = () => {
  if (!vertexAIInstance) {
    vertexAIInstance = initVertexAI();
  }
  return vertexAIInstance;
};
