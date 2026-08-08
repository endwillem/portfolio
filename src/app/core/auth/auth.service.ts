import { Injectable, signal } from '@angular/core';
import {
  User,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signOut,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSignal = signal<User | null>(null);

  user = this.userSignal.asReadonly();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.userSignal.set(user);
    });

    this.completeSignInWithEmailLink();
  }

  sendLoginLink(email: string) {
    const actionCodeSettings = {
      url: `${window.location.origin}/login-success`,
      handleCodeInApp: true,
    };

    window.localStorage.setItem('emailForSignIn', email);

    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  }

  private async completeSignInWithEmailLink() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');

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
