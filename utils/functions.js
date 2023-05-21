import jwt from "jsonwebtoken";
import { msgCardStyles } from "../constants/msgCardStyles";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const makeUserId = (username) => {
  return (
    username.toString().slice(0, 3).replace(/\s/g, "") +
    Math.random().toString().slice(2, 8)
  );
};

export const makeUserPassword = () => {
    return Math.random().toString(36).slice(2, 10);
}

export const generateToken = (id) => {
  return jwt.sign({ id }, "rajdeep", { expiresIn: "7d" });
};

export const generateRandomStyle = () => {
  return msgCardStyles[Math.floor(Math.random()*msgCardStyles.length)]
}

export const getUserMessages = async (uid) => {
    try {
      let gg = uid;
      const docRef = doc(db, "users", gg);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data()?.answers) {
          return {
            msgList: docSnap.data().answers
          }
        }
      } else {
        return {
          msgList: []
        }
      }
    } catch (error) {
      console.log("error ===>>> ", error);
      return {
        msgList: null
      }
    }
}

