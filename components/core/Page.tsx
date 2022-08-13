interface PageProps {
  children: React.ReactNode;
  bgImage?: string;
  className?: string;
}

const Page = ({ children, bgImage, className = '' }: PageProps) => {
  return (
    <>
      <div
        className="fixed z-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className={`absolute h-full w-full px-4 ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Page;
