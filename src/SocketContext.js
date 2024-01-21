// src/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io('http://localhost:8080'); // Replace with your server URL and port
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
