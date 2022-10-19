import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  const name = req.query.name;
  const userID =
    name.toString().slice(0, 3).replace(/\s/g, "") +
    Math.random().toString().slice(2, 8);
  const password = Math.random().toString(36).slice(2, 10);
  const docRef = await addDoc(collection(db, "users"), {
    userId: userID,
    password: password
  });
  if(docRef && docRef.id){
    res.status(200).json(docRef);
  }
}
