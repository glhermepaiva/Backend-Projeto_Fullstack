export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private author: string,
    private date: number,
    private file: string,
    private tags: string[],
    private collection: string,
    private user_id: string
  ){}

  getId(){
    return this.id
  }
  
  getSubtitle(){
    return this.subtitle
  }
  
  getAuthor(){
    return this.author
  }
  
  getDate(){
    return this.date
  }
  
  getFile(){
    return this.file
  }
  
  getTags(){
    return this.tags
  }
  
  getCollection(){
    return this.collection
  }
  
  getUserId(){
    return this.user_id
  }
  
  setId(id: string){
    this.id = id
  }
  
  setSubtitle(subtitle: string){
    this.subtitle = subtitle
  }
  
  setAuthor(author: string){
    this.author = author
  }
  
  setDate(date: number){
    this.date = date
  }
  
  setFile(file: string){
    this.file = file
  }
  
  setTags(tags: string[]){
    this.tags = tags
  }
  
  setCollection(collection: string){
    this.collection = collection
  }
  
  setUserId(user_id: string){
    this.user_id = user_id
  }

  static toImageModel(image: any): Image {
    return new Image(image.id, image.subtitle, image.author, image.date, image.file, image.tags, image.collection, image.user_id)
  }
}

export interface ImageInputDTO {
  subtitle: string,
  author: string,
  date: number,
  file: string,
  tags: string[],
  collection: string  
}

export interface ProfileImageInputDTO {
  file: string
}