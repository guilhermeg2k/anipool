import Button from './Button';

const AnilistIcon = () => (
  <svg
    fill="white"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.361 2.943 0 21.056h4.942l1.077-3.133H11.4l1.052 3.133H22.9c.71 0 1.1-.392 1.1-1.101V17.53c0-.71-.39-1.101-1.1-1.101h-6.483V4.045c0-.71-.392-1.102-1.101-1.102h-2.422c-.71 0-1.101.392-1.101 1.102v1.064l-.758-2.166zm2.324 5.948 1.688 5.018H7.144z" />
  </svg>
);

const AnilistSignInButton = () => {
  const openAnilistAuthPage = () => {
    window.open('/auth/sign-in/by/anilist', '_blank');
  };

  return (
    <Button
      className="bg-[#1f3c5e] hover:bg-[#254870] active:bg-[#1f3c5e] w-full"
      size="large"
      name="Sign in with anilist"
      onClick={openAnilistAuthPage}
    >
      Sign in with anilist
      <AnilistIcon />
    </Button>
  );
};

export default AnilistSignInButton;
