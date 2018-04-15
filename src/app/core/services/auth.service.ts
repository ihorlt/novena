import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { switchMap } from "rxjs/operators";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { User } from "../models/user";

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    //// Get auth data, then get firestore user document || null
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.user$ = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  ///// Login/Signup //////

 emailSignUp(email: string, password: string): Promise<any> {
   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then(() => (user) => this.getLoggedInUser())
     .catch(error => console.log(error));
 }

 emailLogin(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateUserData({uid: user.uid, email: user.email});
        this.getLoggedInUser();
      })
      .catch(error => console.log(error));
 }

  signOut() {
    this.afAuth.auth.signOut();
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true
      },
      lastTimeUpdate: new Date().toISOString()
    };
    return userRef.set(data, { merge: true });
  }


  ///// Role-based Authorization //////

canRead(user: User): boolean {
  const allowed = ['admin', 'subscriber']
  return this.checkAuthorization(user, allowed)
}

canEdit(user: User): boolean {
  const allowed = ['admin']
  return this.checkAuthorization(user, allowed)
}

canDelete(user: User): boolean {
  const allowed = ['admin']
  return this.checkAuthorization(user, allowed)
}



// determines if user has matching role
private checkAuthorization(user: User, allowedRoles: string[]): boolean {
  if (!user) return false
  for (const role of allowedRoles) {
    if ( user.roles[role] ) {
      return true
    }
  }
  return false
}


}