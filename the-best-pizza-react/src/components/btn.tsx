type ButtonProps = {
  children: any;
  onClick?: () => void;
  className?: string;
  type?: any;
};

export default function Btn({
  children,
  onClick,
  className,
  type,
}: ButtonProps) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
}
