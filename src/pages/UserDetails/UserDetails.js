import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Sidebar from '../../components/Sidebar';
import './UserDetails.css';

function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
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

  const handleProfileClick = () => {
    setSelectedPage(null);
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  const pages = [
    { name: 'Dashboard' },
    { name: 'Profile' },
  ];

  return (
    <div>
      <Sidebar pages={pages} onProfileClick={handleProfileClick} onPageClick={handlePageClick} />
      <div style={{ marginLeft: '200px' }}>
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
      {selectedPage && (
        <div style={{ position: 'absolute', top: 0, left: '200px', right: 0, bottom: 0 }}>
          {selectedPage.name === 'Dashboard' ? <h2>Dashboard</h2> : <h2>Profile</h2>}
        </div>
      )}
    </div>
  );
}

export default UserDetails;
