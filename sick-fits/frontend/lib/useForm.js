import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs(fields)
  const [inputs, setInputs] = useState(initial);

  // So for update, this doesn't work great, because the iniital load happens on the server waiting on the data.
  // but on the client, we have the loading state... it loads for a quick sec then runs it.

  // We are going to do useEffect - to moniotr the variables and when they changa run some code.
  // Like if we're subscribing to a DB or API and need to send something with data is changed.
  // useState will actually create an infinite loop because it keeps replacing the data.
  // So we need something to watch that can trigger the change.  Watch values on object from nothing to something.
  const initialValues = Object.values(initial).join(''); // values would be the object, and the join would do a string.

  useEffect(() => {
    // this function runs when the things we are watching change.
    setInputs(initial);
  }, [initialValues]);

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
