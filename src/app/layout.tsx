import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Background from './components/Background';
import Navbar from './components/Navbar';
import { Flex } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const playerId = document.cookie.split(';').find((cookie) => cookie.startsWith('playerId='));
            if (!playerId) {
              const randomId = Math.floor(Math.random() * 1000000);
              document.cookie = 'playerId=' + randomId + ';';
            }
          `,
          }}
        />
      </head>
      <body className={`${inter.className} `}>
        <Providers>
          <Background>
            <Flex h='100%' minH='100vh' flexDir='column'>
              <Navbar />
              <Flex flex='auto' width='100%' alignItems='center' justifyContent='space-evenly' flexDir='column'>
                {children}
              </Flex>
            </Flex>
          </Background>
        </Providers>
      </body>
    </html>
  );
}
