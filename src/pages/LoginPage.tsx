import React, { ReactElement, useState } from "react";
import { loggedIn } from "../services/auth/authService";

const LoginPage = (): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(e: any): Promise<void> {
    try {
      setIsLoading(true);
      await loggedIn(e);
    } catch (e) {
      setError("Username or password are wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Login page</h1>

      <form onSubmit={(e) => handleLogin(e)}>
        {error && <div>{error}</div>}

        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit" disabled={isLoading}>
          Login !
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
