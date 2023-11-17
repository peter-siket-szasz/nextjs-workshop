import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { getRanking } from '../actions/util';
import { Ranking } from '@/types/Ranking';

type Props = {
  gameId: number;
};

export async function RankingTable({ gameId }: Props) {
  const ranking: Ranking = await getRanking(gameId);

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
          {ranking.slice(0, 10).map((currentElement: any, index: number) => {
            return (
              <Tr key={index}>
                <Td isNumeric>{index + 1}</Td>
                <Td>{currentElement.name}</Td>
                <Td isNumeric>{currentElement.score}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
