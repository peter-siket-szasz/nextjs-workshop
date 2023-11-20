'use client';

import { Link } from '@chakra-ui/react';
import IndexButton from './IndexButton';
import NextLink from 'next/link';

type Props = {
  label: string;
  isDisabled: boolean;
  href: string;
};
export function NextButton({ label, isDisabled, href }: Props) {
  return (
    <Link as={NextLink} href={href} pointerEvents={isDisabled ? 'none' : 'auto'}>
      <IndexButton width='100px' height='50px' label={label} isDisabled={isDisabled} />
    </Link>
  );
}
