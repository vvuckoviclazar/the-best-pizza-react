type LabelProps = {
  text: string;
  htmlFor?: string;
  className?: string;
};

export default function Label({ text, htmlFor, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
    </label>
  );
}
