

export interface PhotoData {
  id:   string,
  name: string,
  url:  string,
}

export interface JsonPhoto {
  id: string,
  name: string,
  field_media_image: {
    uri: {
      url: string
    }
  }
}


export interface Event {
        id:    string
        name:  string
}
