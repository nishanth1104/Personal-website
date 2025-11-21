import React from 'react';
import { TourProvider } from './TourGuide';
import Bot3D from './canvas/Bot3D';

const Layout = ({ children }) => {
  return (
    <TourProvider>
      <div className="relative w-full min-h-screen overflow-hidden">
        <Bot3D />
        {children}
      </div>
    </TourProvider>
  );
};

export default Layout;
