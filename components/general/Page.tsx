interface PageProps {
  children: React.ReactNode;
  bgImage: string;
}

const Page = ({ children, bgImage }: PageProps) => {
  return (
    <>
      <div
        className="absolute h-full w-full bg-cover bg-no-repeat bg-center z-0"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute p-4">{children}</div>
    </>
  );
};

export default Page;
