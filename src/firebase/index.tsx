import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAXjhpGFPc-AHqdzyHwhi3zdbiWr71JAEM",
  authDomain: "chat-project-57370.firebaseapp.com",
  databaseURL: "https://chat-project-57370-default-rtdb.firebaseio.com",
  projectId: "chat-project-57370",
  storageBucket: "chat-project-57370.appspot.com",
  messagingSenderId: "362821772861",
  appId: "1:362821772861:web:fb428044ab5711108d6c54",
};

const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
