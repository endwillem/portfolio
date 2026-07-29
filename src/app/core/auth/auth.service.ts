import { Injectable } from '@angular/core';
import {
  User,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signOut,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { auth } from '../firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
    });

    this.completeSignInWithEmailLink();
  }

  sendLoginLink(email: string) {
    const actionCodeSettings = {
      url: window.location.origin,
      handleCodeInApp: true,
    };

    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  }

  private async completeSignInWithEmailLink() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');

      // Als het e-mailadres niet in localStorage staat (bijv. op een ander apparaat geopend), vraag er dan om
      if (!email) {
        email = window.prompt('Voer je e-mailadres in ter bevestiging:');
      }

      if (email) {
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
        } catch (error) {
          console.error('Fout bij het inloggen met link:', error);
        }
      }
    }
  }

  logout() {
    return signOut(auth);
  }
}
