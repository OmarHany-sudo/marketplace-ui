import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import FilterSheet from './components/FilterSheet';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import MessagesPage from './pages/MessagesPage';
import ChatPage from './pages/ChatPage';
import SellPage from './pages/SellPage';
import SellFormPage from './pages/SellFormPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ReviewsPage from './pages/ReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import SearchPage from './pages/SearchPage';

function ScreenRouter() {
  const { state } = useApp();

  switch (state.screen) {
    case 'home':
      return <HomePage />;
    case 'feed':
      return <HomePage />;
    case 'search':
      return <SearchPage />;
    case 'product':
      return <ProductDetailPage />;
    case 'store':
      return <StorePage />;
    case 'cart':
      return <CartPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'order-success':
      return <OrderSuccessPage />;
    case 'wishlist':
      return <WishlistPage />;
    case 'messages':
      return <MessagesPage />;
    case 'chat':
      return <ChatPage />;
    case 'sell':
      return <SellPage />;
    case 'sell-form':
      return <SellFormPage />;
    case 'profile':
      return <ProfilePage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'seller-dashboard':
      return <SellerDashboardPage />;
    case 'admin-dashboard':
      return <AdminDashboardPage />;
    case 'reviews':
      return <ReviewsPage />;
    case 'notifications':
      return <NotificationsPage />;
    default:
      return <HomePage />;
  }
}

function AppContent() {
  const { state } = useApp();

  return (
    <div className="h-screen w-full bg-neutral-100 flex justify-center items-center p-0 md:p-4">
      <div className="mobile-container w-full max-w-[430px] h-[100dvh] md:h-[850px] bg-white rounded-none overflow-hidden shadow-2xl relative isolate flex flex-col">
        <main className="flex-1 overflow-hidden flex flex-col">
          <ScreenRouter />
        </main>

        {/* Overlays */}
        {state.showSearch && <SearchPage />}
        <FilterSheet />
        <Toast />
        <BottomNav />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
