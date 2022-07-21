import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

// make this a flexibile mutation, so we can pass variables.
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #which variables are getting passed in? and what types are they.
    # this is graphql notation, so don't use javascript
    # keep it a clean graph ql mutation.
    #for Photo we're going to do a nested create, and keystone and other CMS's support it.
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

// there are libaries you can use for forms if they get really messy.  What libaries does level 20 uyese?
export default function CreateProduct() {
  // const [name, setName] = useState('Wes'); removing the use state because were replacing it with use Form
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice Shoes',
    price: 34234,
    description: 'these are the best shoes',
  });
  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // submit the inputfields to the backend:
        const res = await createProduct();
        clearForm();
        // Go to that product's page - Imperitive Programming
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
          // checkout the next js docs for more push items... parameters can do it.
          // the product is part of the URL here.
        });
      }}
    >
      <DisplayError />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            type="file" // note: even when you do this, the thing about HTML inptus they always give you a string.
            id="image"
            name="image"
            placeholder="image"
            // value={inputs.image} no value because hof how react works with image updload
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            required
            // Field set is a great way to disable a bunch of inputs at once.
            //
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
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="string"
            id="description"
            name="description"
            placeholder="Price"
            value={inputs.description}
            onChange={handleChange}
            required
          />
        </label>
        {/* <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button> */}
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
