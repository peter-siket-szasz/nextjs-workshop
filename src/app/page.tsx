import { Box } from '@chakra-ui/react';
import JoinGameButton from './components/Buttons/JoinGameButton';
import CreateGameButton from './components/Buttons/CreateGameButton';
import PageContentWrapper from './components/PageContentWrapper';
import FancyHeading from './components/FancyHeading';

export default function Home() {
  return (
    <PageContentWrapper>
      <FancyHeading text="Let's play a game" fontSize="150px" />
      <Box
        width="50%"
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="row"
      >
        <CreateGameButton />
        <JoinGameButton />
      </Box>
    </PageContentWrapper>
  );
}
