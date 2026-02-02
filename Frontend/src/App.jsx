// App.jsx
import { useState } from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { Outlet } from 'react-router-dom';
import { TripProvider } from './component/TripContext';
import LoginModal from './page/auth/AdminLogin';
import AuthModal from './page/auth/AuthModal'; 


function App() {
   const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar openLoginModal={() => setAuthModalOpen(true)} />
      <TripProvider>
        <main className="flex-grow">
          <Outlet />
        </main>
      </TripProvider>
      <Footer />

      {/* Login Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}

export default App;
