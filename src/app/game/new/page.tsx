import FancyHeading from '@/app/components/FancyHeading';
import NewGameForm from '@/app/components/Forms/NewGameForm';
import { Box } from '@chakra-ui/react';

export default function NewGamePage() {
  return (
    <>
      <FancyHeading text='New game' fontSize='100px' />
      <Box marginTop='80px' textAlign='center'>
        <NewGameForm />
      </Box>
    </>
  );
}
