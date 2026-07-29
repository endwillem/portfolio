import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { environment } from '../../../environments/environments';

const firebaseApp = initializeApp(environment.firebase);

export const auth = getAuth(firebaseApp);
