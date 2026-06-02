import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { Product, CartItem } from '../data/mock';

export type Screen =
  | 'home'
  | 'feed'
  | 'stores'
  | 'categories'
  | 'search'
  | 'product'
  | 'store'
  | 'cart'
  | 'checkout'
  | 'checkout-success'
  | 'wishlist'
  | 'messages'
  | 'chat'
  | 'sell'
  | 'sell-form'
  | 'profile'
  | 'dashboard'
  | 'reviews'
  | 'notifications'
  | 'order-success'
  | 'seller-dashboard'
  | 'admin-dashboard'
  | 'inventory'
  | 'orders-mgmt'
  | 'theme-mgmt'
  | 'wallet'
  | 'employees'
  | 'bulk-import'
  | 'reports'
  | 'finance'
  | 'users-mgmt'
  | 'stores-mgmt'
  | 'categories-mgmt'
  | 'banners-mgmt'
  | 'support'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'track-orders'
  | 'returns'
  | 'login';

interface AppState {
  screen: Screen;
  prevScreen: Screen | null;
  activeTab: string;
  selectedProductId: string | null;
  selectedStoreId: string | null;
  selectedConversationId: string | null;
  cart: CartItem[];
  wishlist: string[];
  toast: { message: string; type: 'success' | 'error' } | null;
  showFilterSheet: boolean;
  showSearch: boolean;
  showMobileMenu: boolean;
  language: 'en' | 'ar';
}

type Action =
  | { type: 'NAVIGATE'; screen: Screen }
  | { type: 'GO_BACK' }
  | { type: 'SET_TAB'; tab: string }
  | { type: 'SELECT_PRODUCT'; id: string }
  | { type: 'SELECT_STORE'; id: string }
  | { type: 'SELECT_CONVERSATION'; id: string }
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_CART_QTY'; productId: string; qty: number }
  | { type: 'TOGGLE_WISHLIST'; productId: string }
  | { type: 'SHOW_TOAST'; message: string; toastType: 'success' | 'error' }
  | { type: 'HIDE_TOAST' }
  | { type: 'TOGGLE_FILTER_SHEET' }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'CLOSE_MOBILE_MENU' }
  | { type: 'SET_LANGUAGE'; language: 'en' | 'ar' }
  | { type: 'CLEAR_CART' };

const TAB_SCREENS: Record<string, Screen> = {
  home: 'home',
  stores: 'stores',
  categories: 'categories',
  cart: 'cart',
  profile: 'profile',
};

const initialState: AppState = {
  screen: 'home',
  prevScreen: null,
  activeTab: 'home',
  selectedProductId: null,
  selectedStoreId: null,
  selectedConversationId: null,
  cart: [],
  wishlist: [],
  toast: null,
  showFilterSheet: false,
  showSearch: false,
  showMobileMenu: false,
  language: 'en',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'NAVIGATE': {
      const newState = { ...state, prevScreen: state.screen, screen: action.screen, showMobileMenu: false, showSearch: false };
      const tabKey = Object.entries(TAB_SCREENS).find(([, s]) => s === action.screen)?.[0];
      if (tabKey) newState.activeTab = tabKey;
      return newState;
    }
    case 'GO_BACK': {
      const target = state.prevScreen ?? 'home';
      const tabKey = Object.entries(TAB_SCREENS).find(([, s]) => s === target)?.[0];
      return {
        ...state,
        screen: target,
        activeTab: tabKey ?? state.activeTab,
        prevScreen: null,
        showMobileMenu: false,
      };
    }
    case 'SET_TAB': {
      const screen = TAB_SCREENS[action.tab] ?? 'home';
      return { ...state, prevScreen: state.screen, screen, activeTab: action.tab, showMobileMenu: false, showSearch: false };
    }
    case 'SELECT_PRODUCT':
      return { ...state, prevScreen: state.screen, screen: 'product', selectedProductId: action.id, showMobileMenu: false };
    case 'SELECT_STORE':
      return { ...state, prevScreen: state.screen, screen: 'store', selectedStoreId: action.id, showMobileMenu: false };
    case 'SELECT_CONVERSATION':
      return { ...state, prevScreen: state.screen, screen: 'chat', selectedConversationId: action.id, showMobileMenu: false };
    case 'ADD_TO_CART': {
      const existing = state.cart.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product: action.product, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_CART_QTY':
      if (action.qty <= 0) {
        return { ...state, cart: state.cart.filter((i) => i.product.id !== action.productId) };
      }
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.qty } : i
        ),
      };
    case 'TOGGLE_WISHLIST': {
      const has = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: has ? state.wishlist.filter((id) => id !== action.productId) : [...state.wishlist, action.productId],
      };
    }
    case 'SHOW_TOAST':
      return { ...state, toast: { message: action.message, type: action.toastType } };
    case 'HIDE_TOAST':
      return { ...state, toast: null };
    case 'TOGGLE_FILTER_SHEET':
      return { ...state, showFilterSheet: !state.showFilterSheet };
    case 'TOGGLE_SEARCH':
      return { ...state, showSearch: !state.showSearch };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, showMobileMenu: !state.showMobileMenu };
    case 'CLOSE_MOBILE_MENU':
      return { ...state, showMobileMenu: false };
    case 'SET_LANGUAGE':
      return { ...state, language: action.language };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  setTab: (tab: string) => void;
  selectProduct: (id: string) => void;
  selectStore: (id: string) => void;
  selectConversation: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
  hideToast: () => void;
  toggleFilterSheet: () => void;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setLanguage: (language: 'en' | 'ar') => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigate = useCallback((screen: Screen) => dispatch({ type: 'NAVIGATE', screen }), []);
  const goBack = useCallback(() => dispatch({ type: 'GO_BACK' }), []);
  const setTab = useCallback((tab: string) => dispatch({ type: 'SET_TAB', tab }), []);
  const selectProduct = useCallback((id: string) => dispatch({ type: 'SELECT_PRODUCT', id }), []);
  const selectStore = useCallback((id: string) => dispatch({ type: 'SELECT_STORE', id }), []);
  const selectConversation = useCallback((id: string) => dispatch({ type: 'SELECT_CONVERSATION', id }), []);
  const addToCart = useCallback((product: Product) => dispatch({ type: 'ADD_TO_CART', product }), []);
  const removeFromCart = useCallback((productId: string) => dispatch({ type: 'REMOVE_FROM_CART', productId }), []);
  const updateCartQty = useCallback((productId: string, qty: number) => dispatch({ type: 'UPDATE_CART_QTY', productId, qty }), []);
  const toggleWishlist = useCallback((productId: string) => dispatch({ type: 'TOGGLE_WISHLIST', productId }), []);
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => dispatch({ type: 'SHOW_TOAST', message, toastType: type }), []);
  const hideToast = useCallback(() => dispatch({ type: 'HIDE_TOAST' }), []);
  const toggleFilterSheet = useCallback(() => dispatch({ type: 'TOGGLE_FILTER_SHEET' }), []);
  const toggleSearch = useCallback(() => dispatch({ type: 'TOGGLE_SEARCH' }), []);
  const toggleMobileMenu = useCallback(() => dispatch({ type: 'TOGGLE_MOBILE_MENU' }), []);
  const closeMobileMenu = useCallback(() => dispatch({ type: 'CLOSE_MOBILE_MENU' }), []);
  const setLanguage = useCallback((language: 'en' | 'ar') => dispatch({ type: 'SET_LANGUAGE', language }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        navigate,
        goBack,
        setTab,
        selectProduct,
        selectStore,
        selectConversation,
        addToCart,
        removeFromCart,
        updateCartQty,
        toggleWishlist,
        showToast,
        hideToast,
        toggleFilterSheet,
        toggleSearch,
        toggleMobileMenu,
        closeMobileMenu,
        setLanguage,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
