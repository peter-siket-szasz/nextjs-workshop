'use client';

import { Box, FormControl, Input } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { joinGame } from '@/app/actions/join';
import { experimental_useFormState as useFormState } from 'react-dom';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import IndexButton from '../Buttons/IndexButton';
import LoadingSpinner from '../LoadingSpinner';

export default function JoinGameForm() {
  const router = useRouter();

  const [joinState, formAction] = useFormState(joinGame, undefined);

  useEffect(() => {
    if (joinState && !('error' in joinState)) {
      if (joinState.nextQuestion) {
        router.push(`/game/${joinState.gameId}/question/${joinState.nextQuestion}`);
      } else {
        router.push(`/game/${joinState.gameId}/ranking`);
      }
    }
  });

  return (
    <form
      action={formAction}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {joinState && 'error' in joinState && (
        <Box as='b' color='brand.coral.800'>
          {joinState.error}
        </Box>
      )}
      <FormControl>
        <InputField id='gameId' placeholder='#gameId' />
        <InputField id='playerName' placeholder='#yourName' />
      </FormControl>
      <JoinGameButton loading={!!joinState} />
    </form>
  );
}

function JoinGameButton({ loading }: { loading: boolean }) {
  const { pending } = useFormStatus();

  return pending || loading ? (
    <LoadingSpinner />
  ) : (
    <IndexButton width='100px' height='50px' label='Join Quiz' type='submit' />
  );
}

function InputField({ id, placeholder }: { id: string; placeholder: string }) {
  return (
    <Input
      id={id}
      name={id}
      width='220px'
      height='50px'
      margin='10px'
      paddingRight='100px'
      variant='filled'
      borderRadius='md'
      background='white'
      textColor='#7928CA'
      type='text'
      _focusVisible={{ borderColor: 'white' }}
      placeholder={placeholder}
      isRequired={true}
    />
  );
}
