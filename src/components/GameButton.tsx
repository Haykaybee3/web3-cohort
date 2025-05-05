import React from 'react';

// Extend the props interface to include standard button attributes
interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const GameButton: React.FC<GameButtonProps> = ({
  onClick,
  disabled = false,
  variant = 'primary',
  className, 
  children,
  ...props 
}) => {
  // Logging to validate props
  console.log('[GameButton] Rendering with props:', {
    variant,
    disabled,
    className,
    hasOnClick: !!onClick,
    additionalProps: props
  });

  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variantStyles = variant === 'primary'
    ? 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100';
  // Combine base, variant, and passed className
  const finalClassName = `${baseStyles} ${variantStyles} ${className || ''}`.trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={finalClassName} // Use the combined className
      {...props} // Apply other button attributes like type
    >
      {children}
    </button>
  );
};