// src/Signup.js
import React, { useEffect } from 'react';

function Signup() {
  useEffect(() => {
    initiateOAuth2Flow();
  }, []);

  async function initiateOAuth2Flow() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);

    // Store codeVerifier and state in sessionStorage
    sessionStorage.setItem('pkce_code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: 'a1b2c3d4-5678-90ab-cdef-1234567890ac', // Replace with your client ID
      redirect_uri: 'http://localhost:3300/callback', 
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: state,
      next_url: '/dashboard', // Add the next_url parameter here
    });

    window.location.href = `http://localhost:3100/authorize?${params.toString()}`;
  }

  function generateCodeVerifier() {
    const length = 128;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
    for (let i = 0; i < length; i++) {
      codeVerifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return codeVerifier;
  }

  async function generateCodeChallenge(codeVerifier) {
    const digest = await sha256(codeVerifier);
    return base64UrlEncode(digest);
  }

  async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return hash;
  }

  function base64UrlEncode(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    let base64 = window.btoa(String.fromCharCode(...uint8Array));
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return base64;
  }

  function generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    return result;
  }

  return (
    <div>
      <p>Redirecting to login...</p>
    </div>
  );
}

export default Signup;
