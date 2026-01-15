// /lib/geabout.tsx
import { client } from "@/lib/api"


/**
 * Get my About page
 *
 */
export async function fetchAboutPage()  {

  const response = await client.getCollection("node--page", {
    queryString: "filter[drupal_internal__nid]=140"
  })
  return(response.data)
}

