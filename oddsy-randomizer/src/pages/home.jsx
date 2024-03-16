import React from "react";
import { useRef } from "react";
import { db } from "../firebase.js";
import { addDoc, collection, getDocs } from "@firebase/firestore";

export default function Home() {
  const ref = collection(db, "messages");

  getDocs(ref).then(snapshot => console.log(snapshot.docs[0].data().message))

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap);
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//   }
  const messageRef = useRef();

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);

    let data = {
      message: messageRef.current.value,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form onSubmit={handleSave}>
        <label>Enter message</label>
        <input type="text" ref={messageRef} />
        <br />
        <button type="Submit">Save</button>
      </form>
    </div>
  );
}
