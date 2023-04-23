import { db } from "../config/firebase";
import "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export const fetchAllVenues = async () => {
  const collectionRef = await getDocs(collection(db, "Venues"));
  let collectionRefArr = [];
  collectionRef.forEach((doc) => {
    collectionRefArr.push(doc.data());
  });
  return collectionRefArr;
};

export const fetchAllEvents = async () => {
  const collectionRef = await getDocs(collection(db, "Events"));
  let collectionRefArr = [];
  collectionRef.forEach((doc) => {
    collectionRefArr.push(doc.data());
  });
  return collectionRefArr;
};

export const fetchAllPLayers = async () => {
  const collectionRef = await getDocs(collection(db, "Users"));
  let collectionRefArr = [];
  collectionRef.forEach((doc) => {
    collectionRefArr.push(doc.data());
  });
  return collectionRefArr;
};
