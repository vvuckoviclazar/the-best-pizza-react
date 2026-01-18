import React from "react";

type InputProps = {
  value?: any;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  checked?: boolean;
};

export default function Input({
  value,
  placeholder,
  onChange,
  type = "text",
  className,
  checked,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      checked={checked}
    />
  );
}
