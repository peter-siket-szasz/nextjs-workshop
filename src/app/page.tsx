import { Box, Text } from '@chakra-ui/react';
import CreateGameButton from './components/Buttons/CreateGameButton';
import PageContentWrapper from './components/PageContentWrapper';
import FancyHeading from './components/FancyHeading';
import JoinGameForm from './components/Forms/JoinGameForm';

export default function Home() {
  return (
    <PageContentWrapper>
      <FancyHeading text="Let's play a game" fontSize="150px" />
      <JoinGameForm />
      <Box marginTop="80px" textAlign="center">
        <Text as="i">... or create a new game ...</Text>
        <CreateGameButton />
      </Box>
    </PageContentWrapper>
  );
}
