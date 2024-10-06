// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import PasswordField from './PasswordField';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchPasswordEntries();
  }, []);

  async function fetchPasswordEntries() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      window.location.href = '/signup';
      return;
    }

    try {
      const response = await fetch('http://localhost:3200/passwords/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else if (response.status === 401) {
        console.error('Access token expired or invalid');
        // Handle token refresh here
      } else {
        console.error('Failed to fetch password entries');
      }
    } catch (error) {
      console.error('Error fetching password entries:', error);
    }
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.content}>
        <h1 className={styles.title}>Password Vault</h1>
        <button onClick={() => window.location.href = '/add'} className={styles.addButton}>Add New Entry</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.website}</td>
                <td>{entry.username}</td>
                <td>
                  <PasswordField entryId={entry.id} />
                </td>
                <td>
                  <button onClick={() => window.location.href = `/edit/${entry.id}`} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(entry.id)} className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  async function handleDelete(entryId) {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      window.location.href = '/signup';
      return;
    }

    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`http://localhost:3200/passwords/${entryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          // Refresh entries
          fetchPasswordEntries();
        } else {
          console.error('Failed to delete password entry');
        }
      } catch (error) {
        console.error('Error deleting password entry:', error);
      }
    }
  }
}

export default Dashboard;
