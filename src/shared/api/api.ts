import axios from 'axios';

const baseURL = process.env.NEXTAUTH_URL;

export const api = axios.create({
  baseURL,
})