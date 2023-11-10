'use client';

import { FormControl, Input } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import JoinGameButton from '../Buttons/JoinGameButton';

export default function JoinGameForm() {
  const router = useRouter();

  const { handleSubmit, register } = useForm();

  const id = 1;
  const questionId = 27;

  function onSubmit(data: any) {
    handleSubmit((data) => console.log(data));
    router.push(`/game/${id}/question/${questionId}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormControl>
        <InputField id="game" placeholder="#gameId" register={register} />
        <InputField id="name" placeholder="#yourName" register={register} />
      </FormControl>
      <JoinGameButton />
    </form>
  );
}

const InputField = ({
  id,
  placeholder,
  register,
}: {
  id: string;
  placeholder: string;
  register: any;
}) => {
  return (
    <Input
      width="220px"
      height="50px"
      margin="10px"
      paddingRight="100px"
      variant="filled"
      borderRadius="md"
      background="white"
      textColor="#7928CA"
      type="text"
      _focusVisible={{ borderColor: 'white' }}
      placeholder={placeholder}
      {...register(id)}
      isRequired={true}
    />
  );
};
