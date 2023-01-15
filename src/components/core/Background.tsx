interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  imageURL?: string;
}

const Background = ({
  children,
  imageURL,
  className = 'px-4',
  ...rest
}: PageProps) => {
  return (
    <>
      <div
        className="fixed z-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${imageURL}')` }}
      />
      <div className={`absolute ${className}`} {...rest}>
        {children}
      </div>
    </>
  );
};

export default Background;
