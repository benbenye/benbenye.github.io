/**
 * Created by bby on 18/3/28.
 */
import axios from "axios";

export default function(token = localStorage.getItem("github-token")) {
  let headers = {
    Accept: "application/vnd.github.black-panther-preview+json",
    "Content-type": "application/json"
  };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return axios.create({
    baseURL: "https://api.github.com",
    headers: headers
  });
}
//a5d793321625d6a13b0bfd606f34a7c85608b886

export const githubOauth = axios.create({
  baseURL: "https://github.com"
});
