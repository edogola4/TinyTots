import { useState, useCallback } from 'react';

/**
 * Custom hook for handling form state and validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function (values) => ({ field: 'error' })
 * @param {Function} onSubmit - Submit handler (values, { setSubmitting, resetForm })
 * @returns {Object} Form helpers and state
 */
const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }, [errors]);

  // Handle blur event
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Run validation on blur if validate function is provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(prev => ({
        ...prev,
        [name]: validationErrors[name]
      }));
    }
  }, [validate, values]);

  // Set field value manually
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Set field touched state manually
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({
      ...prev,
      [name]: isTouched
    }));
  }, []);

  // Set field error manually
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    setSubmitCount(prev => prev + 1);
    
    // Run validation if validate function is provided
    let validationErrors = {};
    if (validate) {
      validationErrors = validate(values) || {};
      setErrors(validationErrors);
    }
    
    // If no validation errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        await onSubmit(values, {
          setSubmitting: setIsSubmitting,
          resetForm,
          setErrors,
          setValues
        });
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors(prev => ({
          ...prev,
          _error: error.message || 'An error occurred during submission'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [onSubmit, validate, values, resetForm]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0 || 
    Object.values(errors).every(error => error === undefined || error === '');

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitCount,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    resetForm,
    setValues,
    setErrors,
    setTouched
  };
};

export default useForm;
