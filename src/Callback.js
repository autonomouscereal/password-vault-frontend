// src/Callback.js
import React, { useEffect } from 'react';

function Callback() {
  useEffect(() => {
    async function handleCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      const storedState = sessionStorage.getItem('oauth_state');
      const codeVerifier = sessionStorage.getItem('pkce_code_verifier');

      if (state !== storedState) {
        console.error('Invalid state');
        return;
      }

      // Exchange the authorization code for tokens
      try {
        const response = await fetch('http://localhost:3100/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:3300/callback',
            client_id: 'a1b2c3d4-5678-90ab-cdef-1234567890ac', // Use your client ID
            code_verifier: codeVerifier,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store tokens securely
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);

          // Clear PKCE data
          sessionStorage.removeItem('oauth_state');
          sessionStorage.removeItem('pkce_code_verifier');

          // Redirect to the dashboard
          window.location.href = '/dashboard';
        } else {
          console.error('Token exchange failed:', data);
        }
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
      }
    }

    handleCallback();
  }, []);

  return (
    <div>
      <p>Processing authentication...</p>
    </div>
  );
}

export default Callback;
