import UpdateProduct from '../components/UpdateProduct';

export default function SellPage({ query }) {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
