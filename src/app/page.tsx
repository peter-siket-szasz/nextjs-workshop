import PageContentWrapper from './components/PageContentWrapper';
import FancyHeading from './components/FancyHeading';
import JoinGameForm from './components/Forms/JoinGameForm';

export default function Home() {
  return (
    <PageContentWrapper>
      <FancyHeading text="Let's play a game" fontSize='150px' />
      <JoinGameForm />
    </PageContentWrapper>
  );
}
