'use client'

import React, { createContext, useContext } from "react";
import  all_product  from '@/assets/all_product'

export const shopContext = createContext(all_product);

export const useShopContext =()=> useContext(shopContext)

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <shopContext.Provider value={all_product}>{children}</shopContext.Provider>
    );
  };

