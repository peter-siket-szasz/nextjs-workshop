'use client';

import { FormControl, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import JoinGameButton from '../Buttons/JoinGameButton';
import { useGameJoin } from '../../hooks/api/game/join';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function JoinGameForm() {
  const router = useRouter();

  const { data: gameData, trigger, isMutating, error } = useGameJoin();

  const { handleSubmit, register } = useForm();

  const [gameId, setGameId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (gameData) {
      gameData.nextQuestion
        ? router.push(`/game/${gameId}/question/${gameData.nextQuestion}`)
        : router.push(`/game/${gameId}/ranking`);
    }
  });

  const onSubmit = async (formData: FieldValues) => {
    trigger({ gameId: formData.gameId, playerName: formData.name });
    setGameId(formData.gameId);
  };

  if (isMutating) {
    return <LoadingSpinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {error && (
        <Text as='b' color='brand.coral.800'>
          {error}
        </Text>
      )}
      <FormControl>
        <InputField id='gameId' placeholder='#gameId' register={register} />
        <InputField id='name' placeholder='#yourName' register={register} />
      </FormControl>
      <JoinGameButton />
    </form>
  );
}

const InputField = ({ id, placeholder, register }: { id: string; placeholder: string; register: any }) => {
  return (
    <Input
      width='220px'
      height='50px'
      margin='10px'
      paddingRight='100px'
      variant='filled'
      borderRadius='md'
      background='white'
      textColor='brand.lilac.800'
      type='text'
      _focusVisible={{ borderColor: 'white' }}
      placeholder={placeholder}
      {...register(id)}
      isRequired={true}
    />
  );
};
