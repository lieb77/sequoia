// src/lib/api/drupalClient.ts

import { NextDrupal } from "next-drupal"
import { ApiClient } from "./apiClient"
import { base } from "../constants"

export class DrupalClient extends ApiClient {
    private client: NextDrupal

    constructor(baseUrl: string) {
        super()
        this.client = new NextDrupal(baseUrl)
    }

    async getResourceCollection<T>(resourceType: string, options?: any): Promise<T[]> {
        return this.client.getResourceCollection<T>(resourceType, options)
    }
    
    async getResource<T>(resourceType: string, options?: any): Promise<T[]> {
        return this.client.getResource<T>(resourceType, options)
    }
    deserialize(body: any, options?: any) {
        return this.client.deserialize(body)
    }
    // ... other methods using this.client
}

export const client = new DrupalClient(base)
