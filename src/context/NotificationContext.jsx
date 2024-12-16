import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const hideNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        notificationOpen,
        notificationMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
