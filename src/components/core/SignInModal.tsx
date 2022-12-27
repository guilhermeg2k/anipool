import AnilistSignInButton from './Button/AnilistSignInButton';
import DiscordSignInButton from './Button/DiscordSignInButton';
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
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-2 w-full lg:w-[80%]">
          <AnilistSignInButton />
          <DiscordSignInButton />
          <TwitterSignInButton />
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
