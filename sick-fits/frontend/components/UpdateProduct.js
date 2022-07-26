import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_ID($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. we need to get the existing product (this is the ID.)
  // Remember control + space is auto import.
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  // 2. we need to get the mutation to update the product.
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // 2.5 Create some state for the form inputs:
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
  console.log(inputs);
  if (loading) return <p>loading...</p>;
  // 3. we need the form to handle the updates.
  // We're going to copy/paste from CreateProduct as it's very similar.

  // Very similar to CREATE component.
  // TODO: Handle Submit
  // onSubmit={async (e) => {
  //   e.preventDefault();
  //   console.log(inputs);
  //   // submit the inputfields to the backend:
  //   const res = await createProduct();
  //   clearForm();
  //   // Go to that product's page - Imperitive Programming
  //   Router.push({
  //     pathname: `/product/${res.data.createProduct.id}`,
  //     // checkout the next js docs for more push items... parameters can do it.
  //     // the product is part of the URL here.
  //   });
  // }}
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log(res);
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
