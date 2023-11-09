'use client';

import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import IndexButton from './IndexButton';
import { useRouter } from 'next/navigation';

export default function JoinGameButton() {
  const router = useRouter();

  const [value, setValue] = useState('');
  const handleChange = (event: any) => setValue(event.target.value);
  return (
    <InputGroup
      size="md"
      width="220px"
      height="50px"
      alignItems="center"
      justifyContent="center"
    >
      <Input
        width="220px"
        height="50px"
        margin="10px"
        paddingRight="130px"
        variant="filled"
        value={value}
        onChange={handleChange}
        placeholder="#gameId"
        borderColor="white"
        borderRadius="md"
        background="white"
        textColor="#7928CA"
        _focusVisible={{ borderColor: '#FF0080' }}
      />
      <InputRightElement width="110px" height="50px">
        <Box marginRight="10px">
          <IndexButton
            width="100px"
            height="50px"
            label="Join Quiz"
            onClick={() => router.push('/quiz/1')}
          ></IndexButton>
        </Box>
      </InputRightElement>
    </InputGroup>
  );
}
