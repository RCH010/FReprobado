export class UserType {
  static unauthorized = 'unauthorized';
  static regular = 'regular';
  static admin = 'admin';
}

export const defaultUser = {
  userId: null,
  name: null,
  email: null,
  type: UserType.unauthorized,
}