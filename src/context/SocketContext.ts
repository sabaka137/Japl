import socketio from 'socket.io-client'

import React from 'react'

//fix- add port to env
export const socket = socketio('http://localhost:5000/')
export const SocketContext = React.createContext(socket)
