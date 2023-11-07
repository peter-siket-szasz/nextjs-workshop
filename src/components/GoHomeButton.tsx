import ButtonLink from './ButtonLink';

export default function GoHomeButton() {
  return (
    <ButtonLink href="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 60 60"
      >
        <polyline
          points="35,15 20,30 35,45"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </ButtonLink>
  );
}
