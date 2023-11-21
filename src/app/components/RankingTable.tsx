'use client';

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useRanking } from '../hooks/api/game/ranking';
import LoadingSpinner from './LoadingSpinner';
import { RankingEntry } from '../api/game/ranking/[gameId]/route';

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
          {data.slice(0, 10).map((currentElement: RankingEntry, index: number) => {
            // TODO: Fix implementation with variable interpolation
            return (
              <Tr key={index}>
                <Td isNumeric>Player index</Td>
                <Td>Player name</Td>
                <Td isNumeric>Score</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
