// src/EditEntry.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PasswordGenerator from './PasswordGenerator';
import styles from './EditEntry.module.css';

function EditEntry() {
  const { entryId } = useParams();
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchEntryDetails();
  }, []);

  async function fetchEntryDetails() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      window.location.href = '/signup';
      return;
    }

    try {
      const response = await fetch(`http://localhost:3200/passwords/${entryId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWebsite(data.website);
        setUsername(data.username);
        setPassword(data.password);
        setNotes(data.notes);
      } else {
        console.error('Failed to fetch entry details');
      }
    } catch (error) {
      console.error('Error fetching entry details:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      window.location.href = '/signup';
      return;
    }

    try {
      const response = await fetch(`http://localhost:3200/passwords/${entryId}`, {
        method: 'PUT',
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
        // Entry updated successfully; redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        console.error('Failed to update password entry');
      }
    } catch (error) {
      console.error('Error updating password entry:', error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Edit Password Entry</h1>
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
          <button type="submit" className={styles.updateButton}>Update Entry</button>
        </form>
      </div>
    </div>
  );
}

export default EditEntry;
