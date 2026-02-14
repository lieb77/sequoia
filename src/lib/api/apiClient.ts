// src/lib/api/apiClient.ts
export abstract class ApiClient {
    abstract getResourceCollection<T>(resourceType: string, options?: any): Promise<T[]>;
    // ... other abstract methods
}