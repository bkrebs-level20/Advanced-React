// Sqaure bracket name is similar for next S.
// we want it to use a query peram called ID that we canuse to lookup the itme in the db.
// this will be every product with an [id] in it just from naming conventions in NextJS.
import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
