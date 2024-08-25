import { createContext, useState, ReactNode, useContext } from "react";

const AppContext = createContext(null);

export default function AppWrapper({ children }: { children: ReactNode }) {
  const [state, setState] = useState('Hello');

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}