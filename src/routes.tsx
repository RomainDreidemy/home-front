import React, { ComponentType } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";

export interface IRoute {
  name: string;
  path: string;
  component: ComponentType;
  protected: boolean;
}

export const routes: IRoute[] = [
  { name: "home", path: "/", component: HomePage, protected: false },
  { name: "about", path: "/about/:id", component: AboutPage, protected: false },
  { name: "login", path: "/login", component: LoginPage, protected: false },
];

export function getPath(
  name: string,
  params: Record<string, unknown> | null = null
): string {
  const route = routes.find((r: IRoute) => r.name === name);

  let path = route ? route.path : null;

  if (path && params) {
    Object.entries(params).forEach(([key, value]: [string, any]) => {
      path = path ? path.replace(`:${key}`, value) : "";
    });
  }

  console.log({ path });

  return path ?? "";
}
