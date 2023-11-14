'use client';

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRanking } from '../hooks/api/game/ranking';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  gameId: string;
};

export function RankingTable({ gameId }: Props) {
  const { data, isLoading } = useRanking(gameId);

  if (!data || isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textColor="#7928CA">Position</Th>
              <Th textColor="#7928CA">Name</Th>
              <Th textColor="#7928CA">Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((currentElement: any, index: number) => {
              return (
                <Tr key={index}>
                  <Td isNumeric>{index}</Td>
                  <Td>{currentElement.playerName}</Td>
                  <Td isNumeric>{currentElement.score}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
}
