export class User {
  map(arg0: (info: any) => { username: any; name: any; email: any; role: any }) {
    throw new Error('Method not implemented.')
  }
  constructor(
    private id: string,
    private username: string,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole
  ){}

  getId(){
    return this.id
  }

  getUsername(){
    return this.username
  }

  getName(){
      return this.name
  }

  getEmail(){
      return this.email
  }

  getPassword(){
      return this.password
  }

  getRole(){
      return this.role
  }

  setId(id: string){
      this.id = id
  }

  setUsername(username: string){
    this.username = username
  }

  setName(name: string){
      this.name = name
  }

  setEmail(email: string){
      this.email = email
  }

  setPassword(password: string){
      this.password = password
  }

  setRole(role: UserRole){
      this.role = role
  }

  static stringToUserRole(input: string): UserRole{
    switch (input) {
        case "NORMAL":
          return UserRole.NORMAL;
        case "ADMIN":
          return UserRole.ADMIN;
        default:
          throw new Error("Invalid user role");
      }
  }

  static toUserModel(user: any): User {
      return new User(user.id, user.username, user.name, user.email, user.password, User.stringToUserRole(user.role));
    }
}

export interface UserInputDTO {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginInputDTO {
  email: string;
  username: string;
  password: string;
}

export enum UserRole{
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}