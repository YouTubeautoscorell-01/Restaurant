// Firebase SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getFirestore,
  collection,
  addDoc,
  serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyDi40oL-JtE9LXF8CPGFHHLL6Hqe4p_GDA",
authDomain:"restaurant-63230.firebaseapp.com",
projectId:"restaurant-63230",
storageBucket:"restaurant-63230.firebasestorage.app",
messagingSenderId:"624519670365",
appId:"1:624519670365:web:f23d10079a9adf2c51bbb4"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function saveOrder(order){

    const docRef = await addDoc(collection(db,"orders"),{

        customerName: order.customerName,

        mobile: order.mobile,

        items: order.items,

        total: order.total,

        status: "Pending",

        createdAt: serverTimestamp()

    });

    return docRef.id;

}
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function testFirebase() {
  try {

    const docRef = await addDoc(
      collection(window.db, "test"),
      {
        name: "Royal Navsari Dining",
        time: new Date()
      }
    );

    alert("✅ Firebase Connected Successfully");
    console.log("Document ID:", docRef.id);

  } catch (error) {

    alert("❌ Firebase Connection Failed");
    console.log(error);

  }
}

testFirebase();
