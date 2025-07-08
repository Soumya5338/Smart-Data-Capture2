// firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCpqPxsMfqMoBF8dpvj_P_KPfD6BWL1JNQ",
  authDomain: "smart-data1.firebaseapp.com",
  projectId: "smart-data1",
  storageBucket: "smart-data1.appspot.com", // ✅ fixed ".app" typo
  messagingSenderId: "441999724341",
  appId: "1:441999724341:web:d20137b3cb3a7a7a7e067c",
  measurementId: "G-NL8BFY2CP3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);               // ✅ get and export auth
const analytics = getAnalytics(app);

export { auth };                         // ✅ export it like this
