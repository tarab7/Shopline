const { initializeApp }=require( "firebase/app");
const { getAnalytics, isSupported }=require("firebase/analytics");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN ,
  projectId: process.env.PROJECT_ID ,
  storageBucket: process.env.STORAGE_BUCKET ,
  messagingSenderId: process.env.MSG_SENDER_ID ,
  appId: process.env.APP_ID ,
  measurementId: process.env.MEASUREMENT_ID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);