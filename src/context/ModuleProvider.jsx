import React, { createContext, useContext, useState } from 'react';

const ModuleContext = createContext();

export const useModule = () => {
  return useContext(ModuleContext);
};

export const ModuleProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <ModuleContext.Provider value={{ selectedModule, setSelectedModule }}>
      {children}
    </ModuleContext.Provider>
  );
};
