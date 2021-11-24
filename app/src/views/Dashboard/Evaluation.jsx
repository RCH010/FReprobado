import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  useToast,
  theme,
  Skeleton,
  Stack,
  Flex,
  Button,

} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import routesPaths from '../../router/routes';
import { AuthContext } from '../../providers/AuthProvider';
import { doc, onSnapshot } from '@firebase/firestore';
import { APIService } from '../../firebase/firebase';
import { DeleteIcon } from '@chakra-ui/icons';

export const Evaluation = () => {
  const { evaluationID } = useParams()
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(true)
  const [isDelatingEvalution, setIsDelatingEvalution] = useState(false);
  const {authContext} = useContext(AuthContext)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (authContext.user?.userId) {
      return onSnapshot(
        doc(APIService.app().firestore(), 'evaluations', evaluationID),
        (snapshot) => {
          const data = { ...snapshot.data(), id: evaluationID };
          if (data.userId !== authContext.user?.userId) {
              setTimeout(() => {
                navigate(routesPaths.AUTHBASE+routesPaths.DASHBOARD)
              }, 3000);
          }else{
            setCurrentEvaluation(data)
            setIsLoadingEvaluation(false);
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user]);

  const onDeleteEvaluation = () => {
    setIsDelatingEvalution(true)
    APIService.db().doc(`evaluations/${evaluationID}`).delete().then(() => {
      navigate(routesPaths.AUTHBASE+routesPaths.DASHBOARD)
    })
    .catch(err => {
      toast({
        status: 'error',
        title: 'Por el momento no se pudo borrar la evaluación, intente más tarde'
      })
      setIsDelatingEvalution(false)
    })
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Flex maxW={theme.breakpoints['xl']} w="100%" flexDirection="column">
      <Breadcrumb spacing="1em" mb="1rem">
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to={routesPaths.AUTHBASE + routesPaths.DASHBOARD}
          >
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Evaluacion Pasada</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {isLoadingEvaluation? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        currentEvaluation && (
          <Box>
            <Flex my={4} justifyContent="flex-end">
              <Button
                onClick={onDeleteEvaluation}
                colorScheme='red'
                leftIcon={<DeleteIcon />}
                loadingText='Borrando'
                isLoading={isDelatingEvalution}
              >
                Borrar evaluación
              </Button>
            </Flex>
            <Table width='unset' marginX='auto' variant='unstyled'>
                <Tbody>
                  <Tr>
                    <Th>Fecha:</Th>
                    <Td>{new Date(currentEvaluation.createdAt.seconds * 1000).toLocaleDateString("es-MX")}</Td>
                  </Tr>
                  <Tr>
                    <Th>Status:</Th>
                    <Td>{currentEvaluation.status}</Td>
                  </Tr>
                  {currentEvaluation.result?.prediction &&
                    <Tr>
                      <Th>Calificación estimada:</Th>
                      <Td>{currentEvaluation.result.prediction.toFixed(4)}</Td>
                    </Tr>
                  }
                  <Tr>
                    <Th>Puntaje PAA:</Th>
                    <Td>{currentEvaluation.data.paa}</Td>
                  </Tr>
                  <Tr>
                    <Th>Promedio del semestre anterior:</Th>
                    <Td>{currentEvaluation.data.lastSemesterGrade}</Td>
                  </Tr>
                  <Tr>
                    <Th>Promedio acumulado:</Th>
                    <Td>{currentEvaluation.data.accumulatedGrade}</Td>
                  </Tr>
                  <Tr>
                    <Th>Unidades Inscritas:</Th>
                    <Td>{currentEvaluation.data.enrrolledUnits}</Td>
                  </Tr>
                  <Tr>
                    <Th>Unidades de la materia:</Th>
                    <Td>{currentEvaluation.data.classUnits}</Td>
                  </Tr>
                  <Tr>
                    <Th>Horas de clase:</Th>
                    <Td>{currentEvaluation.data.classHours}</Td>
                  </Tr>
                  <Tr>
                    <Th>Horas de laboratorio:</Th>
                    <Td>{currentEvaluation.data.labHours}</Td>
                  </Tr>
                  <Tr>
                    <Th>Horas de laboratorio:</Th>
                    <Td>{currentEvaluation.data.labHours}</Td>
                  </Tr>
                  <Tr>
                    <Th>Semestre actual:</Th>
                    <Td>{currentEvaluation.data.currentSemester}</Td>
                  </Tr>
                  <Tr>
                    <Th>Escuela de la materia:</Th>
                    <Td>{currentEvaluation.data.classDepartment}</Td>
                  </Tr>
                  <Tr>
                    <Th>Periodo de la materia:</Th>
                    <Td>{currentEvaluation.data.classPeriod}</Td>
                  </Tr>
                </Tbody>
            </Table>
          </Box>
        )
      )}
      </Flex>
    </Box>
  );
};
