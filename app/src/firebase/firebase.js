import firebase from 'firebase/compat';
// // import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore/ ';
// import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import 'firebase/auth';


// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

export class APIService {
  static instance;
  static instance_app;
  static instance_auth;
  static instance_db;

  constructor() {
    APIService.instance_app = firebase.initializeApp(firebaseConfig);
    APIService.instance_auth = APIService.instance_app.auth();
    APIService.instance_db = APIService.instance_app.firestore();
  };

  static getInstance() {
    if (!APIService.instance) APIService.instance = new APIService();
    return APIService.instance;
  }

  static app() {
    if (!APIService.instance) APIService.instance = new APIService();
    return APIService.instance_app;
  }

  static auth() {
    if (!APIService.instance) APIService.instance = new APIService();
    return APIService.instance_auth;
  }

  static db() {
    if (!APIService.instance) APIService.instance = new APIService();
    return APIService.instance_db;
  }
}
