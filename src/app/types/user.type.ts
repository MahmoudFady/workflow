export default interface Iuser {
  name?: string;
  id?: string;
  fname?: string;
  lname?: string;
  role?: string;
  permissions?: Array<string>;
  auth?: boolean;
  image?: string;
}
