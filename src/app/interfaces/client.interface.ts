export interface Client {
  $key?:string,
  firstName?:string,
  lastName?:string,
  phone?:string,
  email?:string,
  balance?:number,
  membership?: string,
  location: {
       address?:string,
       state?:string,
       zip?:number
  }
}