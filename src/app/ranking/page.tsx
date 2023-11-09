import { Box } from '@chakra-ui/react';
import FancyHeading from '../components/FancyHeading';
import PageContentWrapper from '../components/PageContentWrapper';
import { RankingTable } from '../components/RankingTable';

export default function RankingPage() {
  return (
    <PageContentWrapper>
      <Box marginBottom="10px">
        <FancyHeading text="And the winner is ..." fontSize="80px" />
      </Box>
      <RankingTable />
    </PageContentWrapper>
  );
}
