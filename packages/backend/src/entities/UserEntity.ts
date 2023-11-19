interface UserEntityParams {
  validateEmail: (email: string) => boolean;
  hashFunction: (input: string) => string;
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    validateEmail, // dependency injection
    hashFunction, // dependency injection
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
  }: UserEntityParams) {
    if (!id) throw new Error('User must have a id');
    if (!name) throw new Error('User must have a name');
    if (!email) throw new Error('User must have an email');
    if (!validateEmail(email)) throw new Error('Invalid email format');
    if (!password) throw new Error('User must have a password');
    if (password.length < 6)
      throw new Error('Password must be at least 6 characters long.');

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // getter and setter to manipulate the UserEntity
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  updateName(name: string) {
    if (name.length < 2)
      throw new Error("User's name must be more than 2 characters long");
    this.name = name;
  }

  updateEmail(email: string, validateEmail: (email: string) => boolean) {
    if (!validateEmail) throw new Error('Invalid email format');
    this.email = email;
  }

  verifyPassword(password: string, hashFunction: (input: string) => string) {
    return this.password === hashFunction(password);
  }

  updatePassword(password: string, hashFunction: (input: string) => string) {
    this.password = hashFunction(password);
  }
}
