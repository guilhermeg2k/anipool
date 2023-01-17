import AnilistSignInButton from './Button/AnilistSignInButton';
import DiscordSignInButton from './Button/DiscordSignInButton';
import MyAnimeListSignInButton from './Button/MyAnimeListSignInButton';
import TwitterSignInButton from './Button/TwitterSignINButton';
import Modal from './Modal';

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

const SignInModal = ({ open, onClose }: SignInModalProps) => {
  return (
    <Modal
      open={open}
      title="Sign in to be able to vote"
      disableBackdropClick
      onClose={onClose}
    >
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col gap-2 lg:w-[80%]">
          <AnilistSignInButton />
          <MyAnimeListSignInButton />
          <DiscordSignInButton />
          <TwitterSignInButton />
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
