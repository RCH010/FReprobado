import React, { useContext, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
  Select,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  FormHelperText,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  theme,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import routesPaths from '../../router/routes';
import { addEvaluation } from '../../firebase/firestore';
import { AuthContext } from '../../providers/AuthProvider';

const classDepartmentOptions = [
  'EAAD',
  'ECSG',
  'EIC',
  'EN',
  'EMCS',
  'Programa no clasificado',
  'VI',
  'EHE',
];
const currentSemesterOptions = [
  'Primer Semestre',
  'Segundo Semestre',
  'Tercer Semestre',
  'Cuarto Semestre',
  'Quinto Semestre',
  'Faltan Datos',
  'Pendiente de Calcular',
];
const classPeriodOptions = ['1', '2', '3', '1-2', '1-3', '2-3', 'S/D'];

export const EvaluationForm = () => {
  const [isSubmitLoadint, setIsSubmitLoadint] = useState(false);
  const toast = useToast();
  const nvaigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { authContext } = useContext(AuthContext);

  const onSuccess = () => {
    reset();
    toast({
      title: 'Perfecto!',
      description: 'La evaluación se creo con éxito',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    nvaigate(
      routesPaths.AUTHBASE + routesPaths.DASHBOARD
    );
    setIsSubmitLoadint(false);
  };

  const onError = (message) => {
    toast({
      title: 'Ups!',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    setIsSubmitLoadint(false);
  };

  const onSubmit = (values) => {
    console.log(values);
    setIsSubmitLoadint(true);
    const userId = authContext.user.userId;
    addEvaluation(userId, values)
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onError(
          'Tuvimos un problema al crear esta nueva evaliación, por favor intentalo más tarde'
        );
      });
  };

  return (
    <Box  maxW={theme.breakpoints['xl']} w="100%">
      <Breadcrumb spacing="1em" mb="1rem">
        <BreadcrumbItem>
          <BreadcrumbLink
            to={routesPaths.AUTHBASE + routesPaths.DASHBOARD}
            as={Link}
          >
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Nueva evaluación</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack
        align={'center'}
        spacing={8}
        mx={'auto'}
        maxW={'xl'}
        py={12}
        px={6}
      >
        <Heading fontSize={'4xl'}>Evaluación</Heading>
        <Box p={8} minW="sm" rounded={'lg'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="4" isInvalid={Boolean(errors.paa)}>
              <FormLabel htmlFor="paa">Puntaje PAA</FormLabel>
              <NumberInput
                isRequired
                onWheel={(e) => e.target.blur()}
                min={520}
                max={1600}
                keepWithinRange={true}
                clampValueOnBlur={false}
                inputMode="numeric"
              >
                <NumberInputField
                  name="paa"
                  {...register('paa', {
                    required:
                      'Por favor ingresa el resultado de la Prueba de Aptitud Académica',
                    min: {
                      value: 520,
                      message: 'El puntaje debe estar entre 520 y 1600',
                    },
                    max: {
                      value: 1600,
                      message: 'El puntaje debe estar entre 520 y 1600',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                {errors.paa && errors.paa.message}
              </FormErrorMessage>
              <FormHelperText>
                Prueba de Aptitudes Academicas (PAA)
              </FormHelperText>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.lastSemesterGrade)}>
              <FormLabel htmlFor="lastSemesterGrade">
                Promedio del semestre anterior
              </FormLabel>
              <NumberInput
                isRequired
                onWheel={(e) => e.target.blur()}
                min={0}
                max={100}
                keepWithinRange={true}
                clampValueOnBlur={false}
                inputMode="decimal"
              >
                <NumberInputField
                  name="lastSemesterGrade"
                  type="number"
                  {...register('lastSemesterGrade', {
                    required:
                      'Por favor ingresa el promedio del semestre anterior',
                    min: {
                      value: 0.0,
                      message: 'El promedio debe estar entre 0 y 100',
                    },
                    max: {
                      value: 100.0,
                      message: 'El promedio debe estar entre 0 y 100',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                {errors.lastSemesterGrade && errors.lastSemesterGrade.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.accumulatedGrade)}>
              <FormLabel htmlFor="accumulatedGrade">
                Promedio acumulado
              </FormLabel>
              <NumberInput
                isRequired
                onWheel={(e) => e.target.blur()}
                min={0}
                max={100}
                keepWithinRange={true}
                clampValueOnBlur={false}
                inputMode="decimal"
              >
                <NumberInputField
                  name="accumulatedGrade"
                  type="number"
                  {...register('accumulatedGrade', {
                    required: 'Por favor ingresa el promedio acumulado',
                    min: {
                      value: 0.0,
                      message: 'El promedio acumulado debe estar entre 0 y 100',
                    },
                    max: {
                      value: 100.0,
                      message: 'El promedio acumulado debe estar entre 0 y 100',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormErrorMessage>
                {errors.accumulatedGrade && errors.accumulatedGrade.message}
              </FormErrorMessage>
              <FormHelperText>
                El promedio que se tiene de toda la carrera
              </FormHelperText>
            </FormControl>
            <FormControl mb="4" isInvalid={Boolean(errors.enrrolledUnits)}>
              <FormLabel htmlFor="enrrolledUnits">Unidades Inscritas</FormLabel>
              <NumberInput
                isRequired
                onWheel={(e) => e.target.blur()}
                min={0}
                max={100}
                keepWithinRange={true}
                clampValueOnBlur={false}
                inputMode="decimal"
              >
                <NumberInputField
                  name="enrrolledUnits"
                  {...register('enrrolledUnits', {
                    required:
                      'Por favor ingresa las unidades inscritas en este semestre',
                    min: {
                      value: 0.0,
                      message: 'El número de unidades debe ser entre 0 y 100',
                    },
                    max: {
                      value: 100.0,
                      message: 'El número de unidades debe ser entre 0 y 100',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormErrorMessage>
                {errors.enrrolledUnits && errors.enrrolledUnits.message}
              </FormErrorMessage>
              <FormHelperText>
                Cada materia tiene un número de unidades, por lo que aqui va la
                suma de las unidades de todas las materias que se esten
                cursando.
              </FormHelperText>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.classUnits)}>
              <FormLabel htmlFor="classUnits">Unidades de la materia</FormLabel>
              <NumberInput
                isRequired
                onWheel={(e) => e.target.blur()}
                min={1}
                max={20}
                keepWithinRange={true}
                clampValueOnBlur={false}
                inputMode="decimal"
              >
                <NumberInputField
                  name="classUnits"
                  type="number"
                  {...register('classUnits', {
                    required:
                      'Por favor ingresa las unidades que representa la materia',
                    min: {
                      value: 1.0,
                      message:
                        'El número de unidades para una materia debe ser entre 4 y 12',
                    },
                    max: {
                      value: 16.0,
                      message:
                        'El número de unidades para una materia debe ser entre 4 y 12',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormErrorMessage>
                {errors.classUnits && errors.classUnits.message}
              </FormErrorMessage>
              <FormHelperText>
                Las unidades de la materia a evaluar
              </FormHelperText>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.classHours)}>
              <FormLabel htmlFor="classHours">Horas de clase</FormLabel>
              <NumberInput
                isRequired
                onWheel={(e) => e.target.blur()}
                min={1}
                max={20}
                keepWithinRange={true}
                clampValueOnBlur={false}
                inputMode="decimal"
              >
                <NumberInputField
                  name="classHours"
                  type="number"
                  {...register('classHours', {
                    required: 'Por favor ingresa las horas de clase',
                    min: {
                      value: 1,
                      message:
                        'Las horas de una clase deben estar entre 1 y 20',
                    },
                    max: {
                      value: 20.0,
                      message:
                        'Las horas de una clase deben estar entre 1 y 20',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormErrorMessage>
                {errors.classHours && errors.classHours.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.labHours)}>
              <FormLabel htmlFor="labHours">Horas de laboratorio</FormLabel>
              <NumberInput
                isRequired
                onWheel={(e) => e.target.blur()}
                min={1}
                max={12}
                keepWithinRange={true}
                clampValueOnBlur={false}
                inputMode="decimal"
              >
                <NumberInputField
                  name="labHours"
                  type="number"
                  {...register('labHours', {
                    required: 'Por favor ingresa las horas de laboratorio',
                    min: {
                      value: 0.0,
                      message:
                        'Las horas de laboratorio deben estar entre 0 y 12',
                    },
                    max: {
                      value: 12.0,
                      message:
                        'Las horas de laboratorio deben estar entre 0 y 12',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormErrorMessage>
                {errors.labHours && errors.labHours.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.currentSemester)}>
              <FormLabel htmlFor="currentSemester">
                Semestre actual
              </FormLabel>
              <Select
                isRequired
                placeholder="Select option"
                required={true}
                {...register('currentSemester')}
              >
                {currentSemesterOptions.map((el, i) => (
                  <option key={i} id={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.classDepartment)}>
              <FormLabel htmlFor="classDepartment">
                Escuela de la materia
              </FormLabel>
              <Select
                isRequired
                placeholder="Select option"
                required={true}
                {...register('classDepartment')}
              >
                {classDepartmentOptions.sort().map((el, i) => (
                  <option key={i} id={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="4" isInvalid={Boolean(errors.classPeriod)}>
              <FormLabel htmlFor="classPeriod">Periodo de la materia</FormLabel>
              <Select
                isRequired
                placeholder="Select option"
                required={true}
                {...register('classPeriod')}
              >
                {classPeriodOptions.map((el, i) => (
                  <option key={i} id={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Stack my={12} spacing={8}>
              <Button
                isLoading={isSubmitLoadint}
                loadingText="Creando Evaluación"
                type="submit"
              >
                Evaluar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};
