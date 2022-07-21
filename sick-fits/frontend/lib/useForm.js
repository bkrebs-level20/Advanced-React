import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs(fields)
  const [inputs, setInputs] = useState(initial);

  // Visualization of what our sate will be in the handle change function:
  /* {
     name: 'wes',
     description: 'nice shoes',
     price: 1000,
   }
  */

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // Return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}