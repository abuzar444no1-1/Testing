
import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { Background3D } from './components/Background3D';
import { CustomCursor } from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-primary overflow-hidden">
      <CustomCursor />
      <Background3D />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
