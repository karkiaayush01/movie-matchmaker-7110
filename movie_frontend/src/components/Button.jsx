import React from "react";
import PropTypes from "prop-types";

/**
 * Button component for application UI.
 *
 * @param {Object} props
 * @param {string} props.label - Text to display on the button.
 * @param {function} props.onClick - Click handler function.
 * @param {'primary'|'secondary'|'success'|'error'|'ghost'} [props.variant='primary'] - Style variant.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size.
 * @param {boolean} [props.disabled=false] - Sets button disabled state.
 * @param {string} [props.className] - Additional className for custom styling.
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button type attribute.
 */
 // PUBLIC_INTERFACE
const Button = ({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  ...rest
}) => {
  // Simple maps for styles per variant and size
  const variantStyles = {
    primary: {
      background: "#3b82f6",
      color: "#fff",
      border: "none",
    },
    secondary: {
      background: "#64748b",
      color: "#fff",
      border: "none",
    },
    success: {
      background: "#06b6d4",
      color: "#fff",
      border: "none",
    },
    error: {
      background: "#EF4444",
      color: "#fff",
      border: "none",
    },
    ghost: {
      background: "transparent",
      color: "#3b82f6",
      border: "1px solid #3b82f6",
    },
  };

  const sizeStyles = {
    sm: {
      fontSize: "0.875rem",
      padding: "0.25rem 0.75rem",
    },
    md: {
      fontSize: "1rem",
      padding: "0.5rem 1.25rem",
    },
    lg: {
      fontSize: "1.125rem",
      padding: "0.75rem 1.5rem",
    },
  };

  // Compose style object
  const baseStyle = {
    borderRadius: "0.375rem",
    fontWeight: 600,
    outline: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background 0.15s",
    userSelect: "none",
    ...variantStyles[variant] || variantStyles.primary,
    ...sizeStyles[size] || sizeStyles.md,
  };

  // Create hover style for focus/hover effect, inline since no CSS file
  const handleMouseOver = (e) => {
    if (!disabled) {
      const btn = e.currentTarget;
      btn.style.filter = "brightness(0.92)";
    }
  };
  const handleMouseOut = (e) => {
    if (!disabled) {
      const btn = e.currentTarget;
      btn.style.filter = "";
    }
  };

  // Compose accessible attributes
  const btnProps = {
    type,
    disabled,
    "aria-disabled": disabled ? true : undefined,
    tabIndex: disabled ? -1 : 0,
    className,
    style: baseStyle,
    onClick: disabled
      ? (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      : onClick,
    onMouseOver: handleMouseOver,
    onFocus: handleMouseOver,
    onMouseOut: handleMouseOut,
    onBlur: handleMouseOut,
    ...rest,
  };

  return <button {...btnProps}>{label}</button>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "ghost",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;

/**
 * Usage example:
 *
 * import Button from "./Button";
 *
 * <Button
 *   label="Save"
 *   onClick={() => alert('Saved!')}
 *   variant="primary"
 *   size="md"
 * />
 */
