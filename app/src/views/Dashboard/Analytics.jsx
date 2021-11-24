import React, { useEffect, useState } from 'react';
import {
  Doughnut,
  Bar
} from '@iftek/react-chartjs-3';
import {
  Button,
  Flex,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  theme,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { allowedColors } from '../../utils/utils';

export const Analytics = () => {
  const containerDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const doughnutWidth = useBreakpointValue({ base: '90%', md: '40%' });
  const barsWidth = useBreakpointValue({ base: '90%', md: '60%' });
  const [approved, setApproved]  = useState(0)
  const [failed, setFailed] = useState(0)
  const [features, setFeatures] = useState({
    'featuresLabels': [],
    'featuresValues': [],
    'featuresColors': [],
    'featuresBorder': []
  })
  const [tableData, setTableData] = useState({
    'columns': [],
    'data': []
  })

  const fetchGraphsInfo = () => {
    const url = 'https://run.mocky.io/v3/95189440-f602-4703-83e2-335039ca4e12'
    fetch(url)
    .then(res => res.json())
    .then(data => {
      const featuresLabels = []
      const featuresValues = []
      const featuresColors = []
      const featuresBorder = []
      for(const key in data['featuresAvg']) {
        featuresLabels.push(key)
        featuresValues.push(data['featuresAvg'][key])
      }
      for(let i = 0; i < Object.keys(data['featuresAvg']).length; i++) {
        const [color, border] = allowedColors[i]
        featuresColors.push(color)
        featuresBorder.push(border)
      }
      setApproved(data['approved'])
      setFailed(data['failed'])
      setFeatures({featuresLabels, featuresValues, featuresColors, featuresBorder})
    })
  }

  const fetchTableInfo = () => {
    const url = 'https://run.mocky.io/v3/d993342f-6a37-465f-a108-c055efa653b0';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setTableData({columns: data.columns, data: data.data})
    })
  }

  useEffect(() =>{
    fetchGraphsInfo()
    fetchTableInfo()
  }, [])

  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Flex maxW={theme.breakpoints['xl']} w='100%' flexDirection='column'>
        <Breadcrumb spacing='1em' mb='1rem'>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Inicio</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='flex-end'>
          <Button leftIcon={<AddIcon/>} >Nueva evaluación</Button>
        </Flex>
        <Flex justifyContent='space-between' alignItems='center' flexDirection={containerDirection} >
            <Container alignItems='center' justifyContent='center' display='flex' maxWidth={doughnutWidth} mr='0' ml='0'>
              <Doughnut
                data={{
                labels: ['Aprobado', 'Reprobado'],
                datasets: [{
                    label: 'Estudiantes',
                    data: [approved, failed],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                      ]
                }],
                }}/>
            </Container>
            <Container maxWidth={barsWidth} mr='0' ml='0'>
              <Bar
                options={{
                  indexAxis: 'y',
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
                data={{
                  labels: features.featuresLabels,
                  datasets:[{
                    data: features.featuresValues,
                    backgroundColor: features.featuresColors,
                    borderColor: features.featuresBorder,
                    borderWidth: 1
                  }]
                }}
              />
            </Container>
        </Flex>
        <br/>
        <Table my={12} variant='simple'>
          <Thead>
            <Tr>
              {tableData.columns.map(el => (<Th key={el}>{el}</Th>))}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data.map(el => {
              console.log(el)
              return <Tr>{el.map(e => (<Td>{e}</Td>))}</Tr>
            })}
          </Tbody>
        </Table>
      </Flex>
    </Box>
  )
}