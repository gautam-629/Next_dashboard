import { useEffect } from 'react';
import io from 'socket.io-client';

export const NotificationsScreen = () => {
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const socket = io(`ws://localhost:3002`, { transports: ['websocket'] });
    console.log('here');
    // Listen for notification events
    socket.on('notification/' + userId, (message: any) => {
      // socket.on('notification/userId', (message) => {
      // Handle the received notification
      console.log('Received notification:', message);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Render the component
  return <div>{/* Your component JSX */}</div>;
};
