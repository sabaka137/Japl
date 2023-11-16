import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { BrowserRouter } from 'react-router-dom'
import { SocketContext, socket } from './context/SocketContext'
import * as process from 'process';
(window as any).global = window;
(window as any).process = process;
(window as any).Buffer = [];

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <SocketContext.Provider value={socket}>
                <App />
            </SocketContext.Provider>
        </BrowserRouter>
    </Provider>
)
