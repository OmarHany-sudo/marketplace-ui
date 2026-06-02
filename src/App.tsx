import './App.css';
import { useEffect, useRef, useState, type TouchEvent, type UIEvent } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import DesktopHeader from './components/DesktopHeader';
import DesktopSidebar from './components/DesktopSidebar';
import MobileMenu from './components/MobileMenu';
import Toast from './components/Toast';
import FilterSheet from './components/FilterSheet';
import SplashScreen from './components/SplashScreen';
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
import InventoryPage from './pages/InventoryPage';
import OrdersMgmtPage from './pages/OrdersMgmtPage';
import ThemeMgmtPage from './pages/ThemeMgmtPage';
import ReviewsPage from './pages/ReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import SearchPage from './pages/SearchPage';
import SaaSFeaturePage from './pages/SaaSFeaturePage';

function ScreenRouter() {
  const { state } = useApp();

  switch (state.screen) {
    case 'home':
      return <HomePage />;
    case 'feed':
      return <HomePage />;
    case 'stores':
      return <HomePage />;
    case 'categories':
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
    case 'inventory':
      return <InventoryPage />;
    case 'orders-mgmt':
      return <OrdersMgmtPage />;
    case 'theme-mgmt':
      return <ThemeMgmtPage />;
    case 'reviews':
      return <ReviewsPage />;
    case 'notifications':
      return <NotificationsPage />;
    case 'wallet':
    case 'employees':
    case 'bulk-import':
    case 'reports':
    case 'finance':
    case 'users-mgmt':
    case 'stores-mgmt':
    case 'categories-mgmt':
    case 'banners-mgmt':
    case 'support':
    case 'about':
    case 'contact':
    case 'privacy':
    case 'track-orders':
    case 'returns':
    case 'login':
      return <SaaSFeaturePage type={state.screen} />;
    default:
      return <HomePage />;
  }
}

function AppContent() {
  const { state, setTab } = useApp();
  const [navHidden, setNavHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLeavingSplash, setIsLeavingSplash] = useState(false);
  const lastScrollY = useRef(0);
  const touchStart = useRef<{ x: number; y: number; active: boolean } | null>(null);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeavingSplash(true), 900);
    const removeTimer = window.setTimeout(() => setIsLoading(false), 1350);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    lastScrollY.current = 0;
    const frame = window.requestAnimationFrame(() => setNavHidden(false));
    return () => window.cancelAnimationFrame(frame);
  }, [state.screen]);

  const handleScrollCapture = (event: UIEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (!target || target.scrollHeight <= target.clientHeight) return;

    const currentY = target.scrollTop;
    const delta = currentY - lastScrollY.current;

    if (currentY < 24) {
      setNavHidden(false);
    } else if (Math.abs(delta) > 8) {
      setNavHidden(delta > 0);
    }

    lastScrollY.current = Math.max(0, currentY);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 1024) {
      touchStart.current = null;
      return;
    }

    const target = event.target as HTMLElement;
    const point = event.touches[0];
    const insideHorizontalScroll = Boolean(target.closest('[data-swipe-home-ignore="true"]'));

    touchStart.current = {
      x: point.clientX,
      y: point.clientY,
      active: point.clientX <= 26 && !insideHorizontalScroll,
    };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start?.active) return;

    const point = event.changedTouches[0];
    const deltaX = point.clientX - start.x;
    const deltaY = Math.abs(point.clientY - start.y);

    if (deltaX > 90 && deltaY < 60 && state.screen !== 'home') {
      setTab('home');
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-100 flex justify-center items-center p-0 lg:block">
      <div
        className={`mobile-container w-full h-[100dvh] bg-white rounded-none overflow-hidden shadow-2xl relative isolate flex flex-col md:shadow-none lg:h-screen ${
          navHidden ? 'nav-hidden' : ''
        }`}
        lang={state.language}
        dir={state.language === 'ar' ? 'rtl' : 'ltr'}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <DesktopHeader hidden={navHidden} />
        <div className="flex min-h-0 flex-1 lg:bg-gray-50">
          <DesktopSidebar />
          <main className="flex-1 overflow-hidden flex flex-col" onScrollCapture={handleScrollCapture}>
            <ScreenRouter />
          </main>
        </div>

        {/* Overlays */}
        {state.showSearch && (
          <div className="absolute inset-0 z-[80] bg-white lg:left-[272px] lg:top-[72px]">
            <SearchPage />
          </div>
        )}
        <MobileMenu />
        <FilterSheet />
        <Toast />
        <BottomNav hidden={navHidden} />
        {isLoading && <SplashScreen isLeaving={isLeavingSplash} />}
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
