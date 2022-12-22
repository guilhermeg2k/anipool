interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="font-roboto text-base font-semibold text-indigo-800 md:text-xl">
      {children}
    </h1>
  );
};

export default Title;
