import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import type { Cart, CartItem, Product, CartContextType } from '../types';

interface CartState {
  cart: Cart | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const initialState: CartState = {
  cart: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        cart: action.payload,
      };

    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      
      if (!state.cart) {
        // Create new cart
        const newCartItem: CartItem = {
          id: uuidv4(),
          productId: product.id,
          product,
          quantity,
          price: product.price,
          totalPrice: product.price * quantity,
        };

        const newCart: Cart = {
          id: uuidv4(),
          items: [newCartItem],
          totalItems: quantity,
          totalPrice: newCartItem.totalPrice,
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        };

        return { cart: newCart };
      }

      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.productId === product.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...state.cart.items];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: existingItem.price * newQuantity,
        };

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

        return {
          cart: {
            ...state.cart,
            items: updatedItems,
            totalItems,
            totalPrice,
            updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          },
        };
      } else {
        // Add new item
        const newCartItem: CartItem = {
          id: uuidv4(),
          productId: product.id,
          product,
          quantity,
          price: product.price,
          totalPrice: product.price * quantity,
        };

        const updatedItems = [...state.cart.items, newCartItem];
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

        return {
          cart: {
            ...state.cart,
            items: updatedItems,
            totalItems,
            totalPrice,
            updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          },
        };
      }
    }

    case 'REMOVE_ITEM': {
      if (!state.cart) return state;

      const updatedItems = state.cart.items.filter((item) => item.id !== action.payload.itemId);
      
      if (updatedItems.length === 0) {
        return { cart: null };
      }

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        cart: {
          ...state.cart,
          items: updatedItems,
          totalItems,
          totalPrice,
          updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        },
      };
    }

    case 'UPDATE_QUANTITY': {
      if (!state.cart) return state;

      const { itemId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } });
      }

      const updatedItems = state.cart.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              totalPrice: item.price * quantity,
            }
          : item
      );

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        cart: {
          ...state.cart,
          items: updatedItems,
          totalItems,
          totalPrice,
          updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        },
      };
    }

    case 'CLEAR_CART':
      return { cart: null };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('ecommerce-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (state.cart) {
      localStorage.setItem('ecommerce-cart', JSON.stringify(state.cart));
    } else {
      localStorage.removeItem('ecommerce-cart');
    }
  }, [state.cart]);

  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId: number): number => {
    if (!state.cart) return 0;
    const item = state.cart.items.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cart: state.cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    totalItems: state.cart?.totalItems || 0,
    totalPrice: state.cart?.totalPrice || 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
