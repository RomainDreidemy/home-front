import { User } from "../../api/api";
import history, { goToByName } from "../history";
import { getPath } from "../../routes";
import { log } from "util";

export interface IToken {
  token: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export function isLoggedIn(): boolean {
  return true;
}

export async function loggedIn(e: any): Promise<void> {
  try {
    e.preventDefault();

    const credentials: ILogin = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const { token } = await User.login(credentials);

    await localStorage.setItem("token", token);

    goToByName("about");
  } catch (e) {
    throw new DOMException(e);
  }
}

export async function getToken(): Promise<string | null> {
  return localStorage.getItem("token");
}

export async function loggedOut(): Promise<void> {
  await localStorage.removeItem("token");
  goToByName("login");
}
