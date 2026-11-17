import { useState } from 'react';

export default function useValidatedForm(validate) {
  const [errors, setErrors] = useState({});

  const getValidData = (form) => {
    const data = Object.fromEntries(new FormData(form));
    const nextErrors = validate(data);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.elements[firstError]?.focus();
      return null;
    }
    return data;
  };

  const clearFieldError = ({ target }) => {
    if (!target.name || !errors[target.name]) return;
    const currentData = Object.fromEntries(new FormData(target.form));
    if (!validate(currentData)[target.name]) {
      setErrors((current) => ({ ...current, [target.name]: undefined }));
    }
  };

  const errorFor = (name) => errors[name]
    ? <small className="error" id={`${name}-error`} role="alert">{errors[name]}</small>
    : null;

  const a11yFor = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const resetErrors = () => setErrors({});

  return { getValidData, clearFieldError, errorFor, a11yFor, resetErrors };
}
