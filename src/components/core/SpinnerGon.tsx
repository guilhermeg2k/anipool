import Image from 'next/image';

const SpinnerGon: React.FC = () => {
  return (
    <div className="w-[50px]">
      <Image
        src="/images/gon-head.png"
        alt="gon head spinning"
        layout="responsive"
        width={643}
        height={630}
        className="animate-spin"
      />
    </div>
  );
};

export default SpinnerGon;
