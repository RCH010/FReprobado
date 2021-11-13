import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Heading,
  Select,
  Flex
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BaseContainer } from '../../components/BaseContainer';

export const EvaluationForm = () => {
  const { register, formState: { errors }, handleSubmit, _ } = useForm();
  const classDepartmentOptions = [
    'EAAD', 'ECSG', 'EIC', 'EN', 'EMCS',
    'Programa no clasificado', 'VI', 'EHE'
  ]
  const currentSemesterOptions = [
    'Primer Semestre', 'Segundo Semestre', 'Tercer Semestre', 
    'Cuarto Semestre', 'Quinto Semestre', 'Faltan Datos',
    'Pendiente de Calcular'
  ]
  const classPeriodOptions =[
    '1', '2', '3', '1-2', '1-3', '2-3', 'S/D'
  ]

  const onSubmit = (values) => {
    console.log(values);
  }

  return (
    <BaseContainer>
      <Stack
        align={'center'}
        spacing={8}
        mx={'auto'}
        maxW={'xl'}
        py={12} px={6}>
        <Heading fontSize={'4xl'}>Evaluación</Heading>
        <Box
          p={8}
          minW='sm'
          rounded={'lg'}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              mb='4'
              isInvalid={Boolean(errors.paa)}>
              <FormLabel htmlFor="paa">Puntaje PAA</FormLabel>
              <Input
                onWheel={(e) => e.target.blur()}
                name="paa"
                type="number"
                {...register('paa', {
                  required: 'Por favor ingresa el resultado de la Prueba de Aptitud Académica',
                  min: 520,
                  max: 1600
                })}
              />
              <FormErrorMessage>
                {errors.paa && errors.paa.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.lastSemesterGrade)}>
              <FormLabel htmlFor="lastSemesterGrade">Promedio del semestre anterior</FormLabel>
              <Input
                onWheel={(e) => e.target.blur()}
                name="lastSemesterGrade"
                type="number"
                {...register('lastSemesterGrade', {
                  required: 'Por favor ingresa el promedio del semestre anterior',
                  min: 0.0,
                  max: 100.0
                })}
              />
              <FormErrorMessage>
                {errors.lastSemesterGrade && errors.lastSemesterGrade.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.accumulatedGrade)}>
              <FormLabel htmlFor="accumulatedGrade">Promedio acumulado</FormLabel>
              <Input
                onWheel={(e) => e.target.blur()}
                name="accumulatedGrade"
                type="number"
                {...register('accumulatedGrade', {
                  required: 'Por favor ingresa el promedio acumulado',
                  min: 0.0,
                  max: 100.0
                })}
              />
              <FormErrorMessage>
                {errors.accumulatedGrade && errors.accumulatedGrade.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.enrrolledUnits)}>
              <FormLabel htmlFor="enrrolledUnits">Unidades Inscritas</FormLabel>
              <Input
                onWheel={(e) => e.target.blur()}
                name="enrrolledUnits"
                type="number"
                {...register('enrrolledUnits', {
                  required: 'Por favor ingresa las unidades inscritas en este semestre',
                  min: 0.0,
                  max: 100.0
                })}
              />
              <FormErrorMessage>
                {errors.enrrolledUnits && errors.enrrolledUnits.message}
              </FormErrorMessage>
            </FormControl>
            
            <FormControl
              mb='4'
              isInvalid={Boolean(errors.classUnits)}>
              <FormLabel htmlFor="classUnits">Unidades de la materia</FormLabel>
              <Input
                onWheel={(e) => e.target.blur()}
                name="classUnits"
                type="number"
                {...register('classUnits', {
                  required: 'Por favor ingresa las unidades que representa la materia',
                  min: 4,
                  max: 12
                })}
              />
              <FormErrorMessage>
                {errors.classUnits && errors.classUnits.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.classHours)}>
              <FormLabel htmlFor="classHours">Horas de clase</FormLabel>
              <Input
                onWheel={(e) => e.target.blur()}
                name="classHours"
                type="number"
                {...register('classHours', {
                  required: 'Por favor ingresa las horas de clase',
                  min: 1.5,
                  max: 6
                })}
              />
              <FormErrorMessage>
                {errors.classHours && errors.classHours.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.labHours)}>
              <FormLabel htmlFor="labHours">Horas de laboratorio</FormLabel>
              <Input
                onWheel={(e) => e.target.blur()}
                name="labHours"
                type="number"
                {...register('labHours', {
                  required: 'Por favor ingresa las horas de laboratorio',
                  min: 0,
                  max: 6
                })}
              />
              <FormErrorMessage>
                {errors.labHours && errors.labHours.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.currentSemester)}>
              <FormLabel htmlFor="currentSemester">Semestre del alumno</FormLabel>
              <Select
                placeholder="Select option"
                required={true}
                {...register('currentSemester')}>
                {currentSemesterOptions.map((el, i) => (
                  <option id={i} value={el}>{el}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.classDepartment)}>
              <FormLabel htmlFor="classDepartment">Escuela de la materia</FormLabel>
              <Select
                placeholder="Select option"
                required={true}
                {...register('classDepartment')}>
                {classDepartmentOptions.sort().map((el, i) => (
                  <option id={i} value={el}>{el}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.classPeriod)}>
              <FormLabel htmlFor="classPeriod">Periodo de la materia</FormLabel>
              <Select
                placeholder="Select option"
                required={true}
                {...register('classPeriod')}>
                {classPeriodOptions.map((el, i) => (
                  <option id={i} value={el}>{el}</option>
                ))}
              </Select>
            </FormControl>

            <Stack spacing={8}>
              <Button type="submit">Evaluar</Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </BaseContainer>
  )
}

