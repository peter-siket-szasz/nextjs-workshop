'use client';

import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

export default function JoinGame() {
  const [value, setValue] = useState('');
  const handleChange = (event: any) => setValue(event.target.value);
  return (
    <InputGroup size="md" width="200px" margin="20px">
      <Input
        pr="4.5rem"
        variant="filled"
        value={value}
        onChange={handleChange}
        placeholder="#gameId"
        borderColor="white"
        borderRadius="md"
        background="white"
        textColor="#7928CA"
        _focusVisible={{ borderColor: '#7928CA' }}
      />
      <InputRightElement width="110px">
        <Box
          as="button"
          height="30px"
          width="100px"
          borderColor="#7928CA"
          textColor="F#7928CA"
          rounded="lg"
          _hover={{
            background: '#FF0080',
            textColor: 'white',
            borderColor: 'white',
          }}
        >
          Join Quiz
        </Box>
      </InputRightElement>
    </InputGroup>
  );
}
