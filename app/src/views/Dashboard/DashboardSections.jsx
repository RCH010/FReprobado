import React, { useContext } from 'react';
import { Doughnut } from '@iftek/react-chartjs-3';
import { Container } from '@chakra-ui/react';
import { tabsOptions } from '../../utils/menuItems';
import { DashboardContext } from '../../providers/DashboardProvider';
import { EvaluationForm } from './EvaluationForm';


export const DashboardSections = () => {
  const {currentTab} = useContext(DashboardContext)
  switch (currentTab) {
    case tabsOptions.NEWEVALUATION:
      return (
        <EvaluationForm/>
      )
    case tabsOptions.PASTEVALUATIONS:
      return (
        <h1>ESTA ES LA DE PAST EVALUATIONS</h1>
      )
  
    default:
      return (
        <Container maxW="lg">
          <Doughnut data={{
            labels: ['Aprobado', 'Reprobado',],
            datasets: [{
                label: 'Estudiantes',
                data: [10, 7],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)']
                  }]}}/>
        </Container>
      )
  }
}
