import useForm from '../lib/useForm';

// there are libaries you can use for forms if they get really messy.  What libaries does level 20 uyese?
export default function CreateProduct() {
  // const [name, setName] = useState('Wes'); removing the use state because were replacing it with use Form
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice Shoes',
    price: 34234,
    description: 'these are the best shoes',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          // Because we are destructing the inputs and replacing the setname state, and instead usin
          // our helper method, we're going to just call the handle change, and it will handle the inputs
          // and state for us...
          //
          //   onChange={(e) => {
          //     console.log(e.target.value, e.target.name);
          //     setName(e.target.value);
          //   }}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number" // note: even when you do this, the thing about HTML inptus they always give you a string.
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}
