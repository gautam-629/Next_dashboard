import React from 'react';
import axios from 'axios';

const GitHubLoginButton = () => {
  const handleLogin = () => {
    axios
      .get('http://localhost:3000/auth/github')
      .then((response) => {
        // Redirect the user to the provided URL to initiate the GitHub authentication flow.
        window.location.href = response.data;
      })
      .catch((error) => {
        console.error('GitHub login failed:', error);
      });
  };

  return <button onClick={handleLogin}>Sign in with GitHub</button>;
};

export default GitHubLoginButton;
