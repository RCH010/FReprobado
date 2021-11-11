import React, { useState, createContext } from 'react';
import { tabsOptions } from '../utils/menuItems';


const defaultContextValues = {
  currentTab: tabsOptions.NEWEVALUATION,
  setCurrentTab: () => {},

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
  const [currentTab, setCurrentTab] = useState(tabsOptions.NEWEVALUATION);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoadingEvaluations, setIsLoadingEvaluations] = useState(true);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  return (
    <DashboardContext.Provider value={{ 
      currentTab,
      setCurrentTab,

      evaluations,
      setEvaluations,

      isLoadingEvaluations,
      setIsLoadingEvaluations,

      selectedEvaluation,
      setSelectedEvaluation,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}
