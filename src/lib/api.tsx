/* lib/api.ts */
import { JsonApiClient } from "@drupal-api-client/json-api-client"
// import * as JSONAPI from 'jsonapi-typescript'


export const base = "https://paullieberman.org"
export const client = new JsonApiClient(base)

