export interface User {
  uid: string;
  email: string;
  roles: Roles;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: number;
  lastTimeUpdate?: string;
  activeNovenas?: Novena[];
  ui?: UI;
}

export interface Roles {
  subscriber?: boolean;
  admin?: boolean;
}

export interface Novena {
  id: number;
  route: string;
  totalDaysAmount: string;
  dateStarted: string;
  dateCompleted: string;
  //if a novena consists of smaller prayers
  amountOfSmallerPartsOfNovena: number;
  partsPerNovenaCompleted: number;
}

export interface ThemeInterface {
  id: number;
  color: string;
  file: string;
  name: string;
}

export interface UI {
  activeTheme?: ThemeInterface;
}
