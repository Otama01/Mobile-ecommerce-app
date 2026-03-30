import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (item: Product) => void;
  isInWishlist: (id: number) => boolean; 
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);


export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = (item: Product) => {
    if (wishlist.find((w) => w.id === item.id)) {
      // remove
      setWishlist(wishlist.filter((w) => w.id !== item.id));
    } else {
      // add
      setWishlist([...wishlist, item]);
    }
  };

  const addToWishlist = (item: Product) => {
    if (!wishlist.find((w) => w.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };
  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
};

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
};