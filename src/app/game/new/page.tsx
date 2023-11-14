import FancyHeading from '@/app/components/FancyHeading';
import NewGameForm from '@/app/components/Forms/NewGameForm';
import PageContentWrapper from '@/app/components/PageContentWrapper';
import { Box } from '@chakra-ui/react';

export default function NewGamePage() {
  return (
    <PageContentWrapper>
      <FancyHeading text="New game" fontSize="100px" />
      <Box marginTop="80px" textAlign="center">
        <NewGameForm />
      </Box>
    </PageContentWrapper>
  );
}
