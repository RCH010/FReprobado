import React, { useContext } from 'react';
import { tabsOptions } from '../../utils/menuItems';
import { DashboardContext } from '../../providers/DashboardProvider';
import { EvaluationForm } from './EvaluationForm';

export const DashboardSections = () => {
  const {currentTab} = useContext(DashboardContext)
  switch (currentTab) {
    case tabsOptions.NEWEVALUATION:
      return (
        EvaluationForm()
      )
    case tabsOptions.PASTEVALUATIONS:
      return (
        <h1>ESTA ES LA DE PAST EVALUATIONS</h1>
      )
  
    default:
      return <></>
  }
}
