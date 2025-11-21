import React from 'react';
import { TourProvider } from './TourGuide';
import MiniBot from './MiniBot';

const Layout = ({ children }) => {
  return (
    <TourProvider>
      <div className="relative w-full min-h-screen overflow-hidden">
        <MiniBot />
        {children}
      </div>
    </TourProvider>
  );
};

export default Layout;
