import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { PostType } from "../models/post.interface";
import {
  getToken,
  ILogin,
  IToken,
  loggedOut,
} from "../services/auth/authService";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: any) => instance.post(url, body).then(responseBody),
  put: (url: string, body: any) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const User = {
  login: (body: ILogin): Promise<IToken> =>
    instance.post("/login", body).then(responseBody),
};

export const Module = {
  getModule: (): Promise<PostType[]> => requests.get("/modules"),
};

export const Post = {
  getPosts: (): Promise<PostType[]> => requests.get("posts"),
  getAPost: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
  createPost: (post: PostType): Promise<PostType> =>
    requests.post("posts", post),
  updatePost: (post: PostType, id: number): Promise<PostType> =>
    requests.put(`posts/${id}`, post),
  deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};

instance.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = token;
  }
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const status = error.response.status;

    switch (status) {
      case 404:
        console.error("NotFound");
        break;
      case 401:
        console.error("Not connected");
        loggedOut();
        break;
      default:
        console.error("Erreur non géré");
        break;
    }

    return Promise.reject(error.response || error.message);
  }
);
