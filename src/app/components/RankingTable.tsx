'use client';

import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRanking } from '../hooks/api/game/ranking';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  gameId: string;
};

export function RankingTable({ gameId }: Props) {
  const { data, isLoading } = useRanking(gameId);

  if (!data || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr textColor='brand.lilac.800'>
            <Th textColor='inherit'>Position</Th>
            <Th textColor='inherit'>Name</Th>
            <Th textColor='inherit'>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* TODO: Fix implementation with variable interpolation */}
          {/* Transform `data` into JSX elements with <Tr> and <Td> */}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
