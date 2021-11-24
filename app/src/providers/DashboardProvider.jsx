import React, { useState, createContext } from 'react';
import { tabsOptions } from '../utils/menuItems';


const defaultContextValues = {
  currentUser: tabsOptions.NEWEVALUATION,
  setCurrentUser: () => {},
  isLoadingCurrentUsers: true,
  setIsLoadingCurrentUsers: () => {},
  evaluations: [],
  setEvaluations: () => {},

  isLoadingEvaluations: true,
  setIsLoadingEvaluations: () => {},

  selectedEvaluation: null,
  setSelectedEvaluation: () => {},
}

// Context
export const DashboardContext = createContext(defaultContextValues);

// Provider
export const DashboardProvider = ({ children }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [isLoadingEvaluations, setIsLoadingEvaluations] = useState(true);
  const [isLoadingCurrentUsers, setIsLoadingCurrentUsers] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <DashboardContext.Provider value={{ 
      evaluations,
      setEvaluations,

      isLoadingEvaluations,
      setIsLoadingEvaluations,

      currentUser,
      setCurrentUser,
      isLoadingCurrentUsers,
      setIsLoadingCurrentUsers,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}
