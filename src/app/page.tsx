import FancyHeading from './components/FancyHeading';
import JoinGameForm from './components/Forms/JoinGameForm';

export default function Home() {
  return (
    <>
      <FancyHeading text="Let's play a game" fontSize={{ base: '8xl', xl: '9xl' }} />
      <JoinGameForm />
    </>
  );
}
