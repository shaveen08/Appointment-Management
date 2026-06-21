import { useState } from "react";
import ToastNotification from "../components/ToastNotification";

const useNotification = (position = "top-right") => {
  const [notification, setNotification] = useState(null);

  // It will trigger the notification and remove it after certain time
  const triggerNotification = (notificationProps) => {
    setNotification(notificationProps);
    setTimeout(() => {
      setNotification(null);
    }, notificationProps.duration || 3000);
  };

  // Close notification when click close
  const closeNotification = () => setNotification(null);

  // It will check whether the notification is true or false if it is true it will pass props to "ToastNotification" else return null
  const NotificationComponent = notification ? (
    <ToastNotification
      {...notification}
      position={position}
      onClose={closeNotification}
    />
  ) : null;

  return { triggerNotification, NotificationComponent };
};

export default useNotification;
