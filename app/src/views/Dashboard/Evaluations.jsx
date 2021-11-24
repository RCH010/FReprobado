import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import routesPaths from '../../router/routes';

export const Evaluations = () => {
  const [tableData, setTableData] = useState({
    columns: [],
    data: [],
  });

  const fetchTableInfo = () => {
    const url = 'https://run.mocky.io/v3/d993342f-6a37-465f-a108-c055efa653b0';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTableData({ columns: data.columns, data: data.data });
      });
  };

  useEffect(() => {
    fetchTableInfo();
  }, []);

  return (
    <>
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
          <BreadcrumbLink>Evaluaciones pasadas</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Table variant="simple">
        <Thead>
          <Tr>
            {tableData.columns.map((el) => (
              <Th key={el}>{el}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.data.map((el) => {
            console.log(el);
            return (
              <Tr>
                {el.map((e) => (
                  <Td>{e}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
