import React from 'react';
import ScriptTime from '../pages/script/ScriptTime';
import RegisterFingerprint from '../pages/script/RegisterFingerprint';
import { RouteObject } from 'react-router-dom';

const routeConfig = (
): { [key: string]: RouteObject[] } => {
  const script: RouteObject[] = [
    {
      path: '/script/set-reset-time',
      element: <ScriptTime />,
    },
    {
      path: '/script/register-fingerprint',
      element: <RegisterFingerprint />,
    },
  ];

  return {
    script,
  };
};

export default routeConfig;
