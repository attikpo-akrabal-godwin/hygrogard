import { io } from 'socket.io-client';

const URL = 'http://192.168.137.1:3000';
export const socket = io(URL);

