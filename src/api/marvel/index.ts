import axios from 'axios';
import { MD5 } from 'crypto-js';

const ts = new Date().getTime();
const publicKey = process.env.PUB_KEY;
const privateKey = process.env.PRIVATE_KEY;
const msg = ts + privateKey + publicKey;
const hash = MD5(msg);

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    apikey: publicKey,
    ts: ts,
    hash: String(hash),
    limit: 12,
  },
});
