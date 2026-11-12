import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const handleSongCreated = (data) => {
            setNotifications((prev) => [
                {
                    id: Date.now(),
                    type: "created",
                    message: data.message,
                    timestamp: data.timestamp,
                },
                ...prev,
            ]);
        };

        const handleSongUpdated = (data) => {
            setNotifications((prev) => [
                {
                    id: Date.now(),
                    type: "updated",
                    message: data.message,
                    timestamp: data.timestamp,
                },
                ...prev,
            ]);
        };

        const handleSongDeleted = (data) => {
            setNotifications((prev) => [
                {
                    id: Date.now(),
                    type: "deleted",
                    message: data.message,
                    timestamp: data.timestamp,
                },
                ...prev,
            ]);
        };

        socket.on("song:created", handleSongCreated);
        socket.on("song:updated", handleSongUpdated);
        socket.on("song:deleted", handleSongDeleted);

        return () => {
            socket.off("song:created", handleSongCreated);
            socket.off("song:updated", handleSongUpdated);
            socket.off("song:deleted", handleSongDeleted);
        };
    }, []);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, clearNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
