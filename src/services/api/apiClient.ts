import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/config/api.config';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://dolphinai.webredirect.org',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          // Redirect to login or show auth modal
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request methods
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    console.log('ApiClient: PUT request', { url, data });
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    console.log('ApiClient: DELETE request', { url });
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError): void {
    console.log('ApiClient: Error details', {
      config: error.config,
      response: error.response?.data
    });
    if (error.response) {
      console.error('Response error:', error.response.data);
      // Handle specific error codes
      switch (error.response.status) {
        case 400:
          console.error('Bad request');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

export const apiClient = ApiClient.getInstance();
