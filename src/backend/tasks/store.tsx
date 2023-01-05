/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch } from "react";
import { createContext, useState, useContext } from "react";

export const StoreContext = createContext<any>({});

export const useStore = () => {
  return useContext(StoreContext);
};

interface iSetStore {
  storeSpread: object;
  newValue: any;
}

export const StoreProvider = ({ children }: any) => {
  const [store, setStore]: [store: object, setStore: Dispatch<iSetStore>] =
    useState({});

  const value = [store, setStore];

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
