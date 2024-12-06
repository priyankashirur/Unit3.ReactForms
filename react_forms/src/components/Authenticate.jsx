import { useState } from "react";

export default function Authenticate({ token, setToken }) {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  async function authenticateRequest() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      setMessage(result.message);
      setUsername(result.data.username);
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      <button id="authenticate_button" onClick={authenticateRequest}>
        Authenticate Request
      </button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      {username && (
        <p>
          Logged-in user: <strong>{username}</strong>
        </p>
      )}
    </>
  );
}
