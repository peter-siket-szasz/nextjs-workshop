import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export function RankingTable() {
  const result = [
    {
      position: 1,
      name: 'Player One',
      points: 100,
    },
    {
      position: 2,
      name: 'Player Two',
      points: 90,
    },
    {
      position: 3,
      name: 'Player Three',
      points: 80,
    },
  ];

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textColor="#7928CA">Position</Th>
            <Th textColor="#7928CA">Name</Th>
            <Th textColor="#7928CA">Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {result.map((e) => {
            return (
              <Tr key={e.position}>
                <Td isNumeric>{e.position}</Td>
                <Td>{e.name}</Td>
                <Td isNumeric>{e.points}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
