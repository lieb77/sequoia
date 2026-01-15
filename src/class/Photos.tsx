// /class/Photos.tsx
import { base } from '@/lib/api'

export interface PhotoData {
  id:   string,
  name: string,
  url:  string,
}

interface JsonPhoto {
  id: string,
  name: string,
  field_media_image: {
    uri: {
      url: string
    }
  }
}


export class Photos {
  Photos: PhotoData[] = []

  constructor(data: JsonPhoto[]){
    data.forEach((media: JsonPhoto) => {
      this.Photos.push({
        id: media.id,
        name: media.name,
        url: media.field_media_image.image_style_uri ? media.field_media_image.image_style_uri['1024x768'] : "/Touring.jpg"
//        url: media.field_media_image.uri ? base + media.field_media_image.uri.url : "/Touring.jpg"
      })
    })
  }

  public getPhotos() : PhotoData[] {
    return this.Photos
  }

//end-of-class
}

