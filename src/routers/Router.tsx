import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import ErrorPage from '../pages/ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import toast from 'react-hot-toast';
import ForgotPassword from '../pages/auth/ForgotPassword';

interface PreparationProgress {
  SessionId: number;
  Progress: number;
}

const Router = () => {
  // const [notification, setNotifications] = useState(0);
  const [NotificationId, setNotificationId] = useState(0);
  const [preparationProgress, setPreparationProgress] =
    useState<PreparationProgress | null>(null);
  const [wsError, setWsError] = useState<string | null>(null);
  const [moduleId, setModuleId] = useState(0);
  const [connection, setConnection] = useState(false);

  let ws: WebSocket | null;
  const ConnectWebsocket = (tokenString: string) => {
    ws = new WebSocket('wss://sams-project.com/ws/client?root=true', [
      'access_token',
      tokenString,
    ]);

    ws.onopen = () => {
      console.log('WebSocket root connection opened');
      toast.success('WebSocket connection opened', {
        position: 'bottom-right',
      });
    };

    ws.onmessage = (event) => {
      console.log('Message received:', event.data);
      const message = JSON.parse(event.data);
      switch (message.Event) {
        case 'NewNotification': {
          const data = message.Data;
          const NotificationId = data.NotificationId;
          // setNotifications((prev) => prev + 1);
          setNotificationId(NotificationId);
          break;
        }

        case 'PreparationProgress': {
          const data = message.Data;
          const progressTrack: PreparationProgress = {
            SessionId: data.SessionId as number,
            Progress: data.Progress as number,
          };
          setPreparationProgress(progressTrack);
          break;
        }

        case 'ModuleConnected': {
          const data = message.Data;
          const moduleId = data.ModuleId;
          setConnection(true);
          setModuleId(moduleId);
          break;
        }

        case 'ModuleLostConnected': {
          const data = message.Data;
          const moduleId = data.ModuleId;
          setConnection(false);
          setModuleId(moduleId);
          break;
        }

        default: {
          console.log('Undefined Event!');
          break;
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket root connection closed');
      toast.success('WebSocket connection closed', {
        position: 'bottom-right',
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket root error:', error);
      setWsError('WebSocket connection error: ' + error);
      toast.error('WebSocket connection error', {
        position: 'bottom-right',
      });
    };

    return () => {
      ws?.close();
    };
  };

  const closeWebsocket = () => {
    console.log(
      'WebSocket root connection closedddddddddddddddddddddddddddddddd',
    );
    setPreparationProgress(null);
    ws?.close();
  };


  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute />
        }
      />
      <Route path="/login" element={<Login ConnectWebsocket={ConnectWebsocket} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
