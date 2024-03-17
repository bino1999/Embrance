import React, { createContext, useContext, useEffect, useState } from 'react';

const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  const [userID, setUserID] = useState(() => {
    // Initialize userID from localStorage, if available
    const storedUserID = localStorage.getItem('userID');
    return storedUserID ? storedUserID : null;
  });

  const [result ,setResult] = useState()
  

  // Update localStorage whenever userID changes
  useEffect(() => {
    localStorage.setItem('userID', userID);
  }, [userID]);

  return (
    <UserProfileContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}
