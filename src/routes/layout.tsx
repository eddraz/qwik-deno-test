import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBymx2kb01l5urZhwrTHAMRrb2SJ0dUYoA",
  authDomain: "qwikblast.firebaseapp.com",
  projectId: "qwikblast",
  storageBucket: "qwikblast.appspot.com",
  messagingSenderId: "27009587691",
  appId: "1:27009587691:web:a9d723328b413b1636e1ae",
  measurementId: "G-HSV2SRV3EG",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const useGetUsers = routeLoader$(async () => {
  const db = getFirestore(firebaseApp);

  const usersRef = collection(db, "users");
  const query = await getDocs(usersRef);
  return query.docs.map((doc) => ({
    id: doc.id,
    displayName: doc.data().displayName,
    email: doc.data().email,
  })) as {
    id: string;
    displayName: string;
    email: string;
  }[];
});

export default component$(() => {
  return <Slot />;
});
