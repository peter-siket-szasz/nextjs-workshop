import Link from 'next/link';
import { ComponentProps } from 'react';

export default function ButtonLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  return (
    <Link {...props} className='inline-block px-3 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded shadow-md' />
  );
}
