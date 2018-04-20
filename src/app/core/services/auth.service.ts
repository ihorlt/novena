import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { User, Novena, ThemeInterface } from "../models/user";

@Injectable()
export class AuthService {

  private user: User;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    //// Get auth data, then get firestore user document || null
    this.getLoggedInUser();
  }

  public isLoggedUser(): boolean {
    return this.user ? true : false;
  }

  getLoggedInUser() {
    this.afAuth.authState.switchMap(user => {
      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    })
    .subscribe(user => this.user = user);
  }

  ///// Login/Signup //////

  emailSignUp(email: string, password: string): Promise<any> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.getLoggedInUser())
      .catch();
  }

  emailLogin(email: string, password: string): Promise<any> {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.updateUserData({ uid: user.uid, email: user.email });
        this.getLoggedInUser();
      })
      .catch();
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.user = undefined;
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    userRef.set(user, { merge: true });
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ["admin", "subscriber"];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ["admin"];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ["admin"];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  /**
   * novena
   * @param id novena id
   */
  public getNovena(id: number): Novena {
    if(!this.user.activeNovenas){
      return null;
    }
    return this.user.activeNovenas[id];
  }

  public setNovena(novena: Novena) {
    if(!this.user.activeNovenas){
      this.user.activeNovenas = [];
    }
    this.user.activeNovenas = [...this.user.activeNovenas, novena];
    this.updateUserData(this.user);
  }

  /**
   * theming
   */
  get theme(): ThemeInterface {
    if(!this.user && !this.user.ui && !this.user.ui.activeTheme){
      return null;
    }
    return this.user.ui.activeTheme;
  }

  set theme(theme: ThemeInterface) {
    if(this.user){
      if(!this.user.ui){
        this.user.ui = { activeTheme: undefined };
      }
      this.user.ui.activeTheme = theme;
      this.updateUserData(this.user);
    }
  }

}
