// src/AddEntry.js
import React, { useState } from 'react';
import PasswordGenerator from './PasswordGenerator';
import styles from './AddEntry.module.css';

function AddEntry() {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      window.location.href = '/signup';
      return;
    }

    try {
      const response = await fetch('http://localhost:3200/passwords/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          website,
          username,
          password,
          notes,
        }),
      });

      if (response.ok) {
        // Entry added successfully; redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        console.error('Failed to add password entry');
      }
    } catch (error) {
      console.error('Error adding password entry:', error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Add New Password Entry</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Website:</label>
            <input type="text" value={website} onChange={e => setWebsite(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <PasswordGenerator onPasswordGenerated={setPassword} />
          <div className={styles.formGroup}>
            <label>Notes:</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}></textarea>
          </div>
          <button type="submit" className={styles.addButton}>Add Entry</button>
        </form>
      </div>
    </div>
  );
}

export default AddEntry;
