import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';


function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [auth]);

  
  const [show, setShow] = useState(false);

  
  const handleProfileClick = () => {
      setShowDetails(true);
    
  };
  return (
    <div>
      <h1>User Details</h1>
      {isLoading ? (
        <p>Loading user details...</p>
      ) : userDetails ? (
        <div>
          <p>
            <strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Role:</strong> {userDetails.role}
          </p>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
        </div>
      ) : (
        <p>No user details available</p>
      )}
        </div>    
  );
}

export default UserDetails;