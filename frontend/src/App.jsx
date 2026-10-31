import { useState } from 'react';
import Header from './components/Header.jsx';
import ChatPage from './pages/ChatPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

const PAGES = {
  CHAT: 'chat',
  BOOKING: 'booking',
  ADMIN: 'admin',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.CHAT);

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="app-main">
        {currentPage === PAGES.CHAT && (
          <ChatPage onRequestBooking={() => setCurrentPage(PAGES.BOOKING)} />
        )}
        {currentPage === PAGES.BOOKING && <BookingPage />}
        {currentPage === PAGES.ADMIN && <AdminPage />}
      </main>
    </div>
  );
}
