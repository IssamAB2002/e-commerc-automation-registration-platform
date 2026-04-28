import { T } from "../../../design/pages/auth/designTokens.js";

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  ...props
}) {
  return (
    <div className="auth-form-group">
      {label && (
        <label className="auth-label">
          {label}
          {required && <span style={{ color: T.orange }}>*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`auth-input ${error ? "error" : ""}`}
        {...props}
      />
      {error && (
        <div className="auth-error">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="7"
              y1="3.5"
              x2="7"
              y2="8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
