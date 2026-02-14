// src/lib/api/drupalClient.ts
import { NextDrupal } from "next-drupal";
import { ApiClient } from "./apiClient";

export const base = "https://paullieberman.org";
export class DrupalClient extends ApiClient {
    private client: NextDrupal;

    constructor(baseUrl: string) {
        super();
        this.client = new NextDrupal(baseUrl);
    }

    async getResourceCollection<T>(resourceType: string, options?: any): Promise<T[]> {
        return this.client.getResourceCollection<T>(resourceType, options);
    }
    // ... other methods using this.client
}
export const client = new DrupalClient(base);
