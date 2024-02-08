import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
   //firebase Daten
  };

const app = initializeApp(firebaseConfig);
const firedb = getFirestore(app);
export default firedb ;