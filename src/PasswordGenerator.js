// src/PasswordGenerator.js
import React, { useState } from 'react';
import styles from './PasswordGenerator.module.css';

function PasswordGenerator({ onPasswordGenerated }) {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterPool = '';
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (characterPool === '') {
      alert('Please select at least one character type.');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomChar = characterPool.charAt(Math.floor(Math.random() * characterPool.length));
      password += randomChar;
    }

    onPasswordGenerated(password);
  };

  return (
    <div className={styles.generator}>
      <h3 className={styles.title}>Password Generator</h3>
      <div className={styles.option}>
        <label>Length:</label>
        <input type="number" value={length} onChange={e => setLength(e.target.value)} min="4" max="64" />
      </div>
      <div className={styles.option}>
        <input type="checkbox" checked={includeUppercase} onChange={e => setIncludeUppercase(e.target.checked)} />
        <label>Include Uppercase Letters</label>
      </div>
      <div className={styles.option}>
        <input type="checkbox" checked={includeLowercase} onChange={e => setIncludeLowercase(e.target.checked)} />
        <label>Include Lowercase Letters</label>
      </div>
      <div className={styles.option}>
        <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} />
        <label>Include Numbers</label>
      </div>
      <div className={styles.option}>
        <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} />
        <label>Include Symbols</label>
      </div>
      <button onClick={generatePassword} className={styles.generateButton}>Generate Password</button>
    </div>
  );
}

export default PasswordGenerator;
