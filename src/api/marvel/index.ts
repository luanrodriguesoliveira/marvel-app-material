import axios from 'axios';
import { MD5 } from 'crypto-js';

const ts = new Date().getTime();
const publicKey = '02803c593f0b084ef83ff02382105ba8';
const privateKey = '1a235f6438f7a411cc19cdaede0b704b9d4a8d79';
const msg = ts + privateKey + publicKey;
const hash = MD5(msg);

console.log(publicKey);

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    apikey: publicKey,
    ts: ts,
    hash: String(hash),
    limit: 12,
  },
});
