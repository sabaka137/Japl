import socketio from 'socket.io-client'

import React from 'react'

//fix- add port to env
export const socket = socketio('https://japl-server-api.onrender.com/')
export const SocketContext = React.createContext(socket)
