import React from 'react';
import { PacmanLoader } from 'react-spinners';
const Pacman = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50">
      <PacmanLoader color="#ff6b00" size={25} speedMultiplier={2} />
    </div>
  );
};

export default Pacman;
