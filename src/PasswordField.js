// src/PasswordField.js
import React, { useState } from 'react';
import styles from './PasswordField.module.css';

function PasswordField({ entryId }) {
  const [password, setPassword] = useState('********');
  const [isVisible, setIsVisible] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const toggleVisibility = async () => {
    if (isVisible) {
      // Hide password
      setPassword('********');
      setIsVisible(false);
    } else {
      // Fetch password from backend
      try {
        const response = await fetch(`http://localhost:3200/passwords/${entryId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPassword(data.password); // Assuming backend returns decrypted password
          setIsVisible(true);
        } else {
          console.error('Failed to fetch password');
        }
      } catch (error) {
        console.error('Error fetching password:', error);
      }
    }
  };

  return (
    <div className={styles.passwordField}>
      <span className={styles.password}>{password}</span>
      <button onClick={toggleVisibility} className={styles.toggleButton}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export default PasswordField;
