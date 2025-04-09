import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';

interface BasketItem extends Product {
    basket_quantity: number;
}

interface BasketContextType {
    basket: BasketItem[];
    addToBasket: (product: Product, quantity: number) => void;
    removeFromBasket: (productId: number) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
    const [basket, setBasket] = useState<BasketItem[]>([]);
  
    const addToBasket = (product: Product, basket_quantity: number) => {
        setBasket(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                item.id === product.id ? { ...item, basket_quantity: item.basket_quantity + basket_quantity } : item
                );
            }
            return [...prev, { ...product, basket_quantity }];
        });
    };
  
    const removeFromBasket = (item: number) => {
        setBasket(prev => prev.filter(b => b.id !== item));
    };
  
    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
            {children}
        </BasketContext.Provider>
    );
  };
  
  export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error("useBasket must be used within a BasketProvider");
    }
    return context;
  };