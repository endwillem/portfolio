import { Component, effect, inject, signal } from '@angular/core';
import { LoginComponent } from '../../components/login/login';
import { AuthService } from '../../core/auth/auth.service';
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { User } from 'firebase/auth';
@Component({
  selector: 'app-home',
  imports: [LoginComponent],
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private authService = inject(AuthService);

  events = signal<any[]>([]);
  user = this.authService.user;

  constructor() {
    effect(() => {
      const user = this.user();
      this.events.set([]);
      this.getData(user);
    });
  }

  async getData(user: User | null): Promise<void> {
    const db = getFirestore();
    const eventsRef = collection(db, 'events');
    try {
      // -------------------------
      // NIET INGELOGD
      // -------------------------
      if (!user) {
        const q = query(eventsRef, where('access', 'array-contains', 'public'));
        const snapshot = await getDocs(q);
        this.events.set(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        );
        return;
      }

      // -------------------------
      // INGELOGD
      // -------------------------

      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        console.error('Geen user-document gevonden voor:', user.uid);
        return;
      }

      const userData = userSnapshot.data();
      const roles = userData['roles'] ?? [];

      console.log('Gebruiker:', user.email);
      console.log('Rollen:', roles);

      // -------------------------
      // ADMIN
      // -------------------------

      if (roles.includes('admin')) {
        const snapshot = await getDocs(eventsRef);

        this.events.set(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        );

        return;
      }

      // -------------------------
      // RECRUITER / FRIEND
      // -------------------------

      const allowedAccess = ['public', ...roles];

      const q = query(eventsRef, where('access', 'array-contains-any', allowedAccess));

      const snapshot = await getDocs(q);

      this.events.set(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      );
    } catch (error) {
      console.error('Fout bij ophalen events:', error);
    }
  }
}
