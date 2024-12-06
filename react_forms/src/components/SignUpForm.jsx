import { useState, useEffect } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      console.log("Updated token:", token); // Log updated token here
    }
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      //   setToken(result.token);
      console.log("result", result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }

    return <p>error</p>;
  }

  return (
    <>
      <h2>Sign up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          username:{" "}
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          password:{" "}
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}
