import { useState } from 'react';

function useFieldValues(initialFieldValues) {
  const [fieldValues, setFieldValues] = useState(initialFieldValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [name]: value,
    }));
  };

  const clearFieldValues = () => setFieldValues(initialFieldValues);
  return [fieldValues, handleChange, clearFieldValues];
}

export default useFieldValues;
