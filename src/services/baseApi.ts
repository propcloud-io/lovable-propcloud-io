import { config } from './config';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class BaseApiService {
  protected async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = config.fallbacks.maxRetries
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status
        );
      }

      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => 
          setTimeout(resolve, config.fallbacks.retryDelay)
        );
        return this.fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }

  protected async handleApiResponse<T>(response: Response): Promise<T> {
    try {
      const data = await response.json();
      return data as T;
    } catch (error) {
      throw new ApiError('Failed to parse API response');
    }
  }

  protected checkApiKey(apiKey: string, service: string): void {
    if (!apiKey) {
      throw new ApiError(
        `${service} API key is not configured. Please check your environment variables.`,
        401,
        'API_KEY_MISSING'
      );
    }
  }
} 