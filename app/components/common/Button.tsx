import React from 'react';
import cx from 'classnames';

type ButtonProps = {
  buttonType: 'primary' | 'secondary' | 'padded' | 'outline' | 'breadcrumb' | 'circle' | 'share' | 'resource' | 'text';
  children: React.ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const buttonStyle = {
  primary: 'bg-shoko-link text-shoko-text-alt hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  secondary: 'bg-shoko-button-alt text-shoko-text-alt hover:bg-shoko-button-alt-hover hover:text-shoko-text-alt',
  padded: 'text-shoko-header-text hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  outline: 'border border-shoko-link text-shoko-text-header hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  breadcrumb: 'py-0 px-2 text-2xl font-medium text-shoko-link-header hover:text-shoko-link-header-hover',
  circle: '!p-3 bg-shoko-bg border border-shoko-border hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  share:
    '!p-3 bg-shoko-bg border border-shoko-border rounded-[50px] hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  resource: 'py-2 bg-shoko-bg-alt text-shoko-text-header hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  text: 'py-0 text-shoko-text-header hover:text-shoko-link',
};

const Button = ({ buttonType, className, id, children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      id={id}
      className={cx(
        'flex items-center gap-x-3 p-4 font-medium transition-colors duration-500 ease-in-out focus:outline-none',
        buttonStyle[buttonType],
        buttonType === 'circle' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
