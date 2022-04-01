import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCarsMfbrTTvyWPMZOapFHm_zCkYhHgsVg",
    authDomain: "scheduler-17e79.firebaseapp.com",
    databaseURL: "https://scheduler-17e79-default-rtdb.firebaseio.com",
    projectId: "scheduler-17e79",
    storageBucket: "scheduler-17e79.appspot.com",
    messagingSenderId: "793941472933",
    appId: "1:793941472933:web:404aeaa03a351093047f4c",
    measurementId: "G-KZKP9T4K1E"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };
  

export const setData = (path, value) => (
    set(ref(database, path), value)
  );