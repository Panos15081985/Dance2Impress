import { initializeApp } from  "firebase/app";
import { getDatabase } from "firebase/database"
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
   //firebase Daten
  };

  const app = initializeApp(firebaseConfig);

  
 // export default db 
 export const db = getDatabase(app);