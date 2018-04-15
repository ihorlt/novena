export interface User {
  uid: string;
  email: string;
  roles: Roles;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: number;
  lastTimeUpdate?: string;
}

export interface Roles {
  subscriber?: boolean;
  admin?: boolean;
}
