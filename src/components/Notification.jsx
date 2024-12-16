import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotification } from "../context/NotificationContext";

const Notification = () => {
  const { notificationOpen, notificationMessage, hideNotification } =
    useNotification();

  return (
    <Snackbar
      open={notificationOpen}
      autoHideDuration={3000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={hideNotification}
        severity="success"
        sx={{ width: "100%" }}
      >
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
