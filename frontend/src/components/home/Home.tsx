import * as React from 'react';
import PaginatedBooks from '../Books/PaginatedBooks';

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <PaginatedBooks />
    </div>
  );
}

export default Home;