// Firebase SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getFirestore
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
