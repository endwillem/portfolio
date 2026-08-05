import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  imports: [LoginComponent],
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  constructor() {
    this.getData();
  }
  events: any = [];

  getData() {
    const db = getFirestore();
    const colRef = collection(db, 'events');
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.events.push({ ...doc.data(), id: doc.id });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
