import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productFakeAPI";
import { addToCart } from "../reducers/addToCart/cartSlice";
import { selectProducts } from "../reduxSelector";
function FakeApi() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector(selectProducts); // Assuming selectProducts returns an object with data, loading, and error
  useEffect(() => {
    //dispatch an action to getProduct
    dispatch(getProducts());
  }, [dispatch]); // Added dispatch as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an error fetching products
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const cards = products.map((product) => (
    <div key={product.id} className='col-md-3 py-2'>
      <Card style={{ width: "18rem" }}>
        <div className='text-center'>
          <Card.Img
            variant='top'
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <div className='text-center'>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.price}</Card.Text>
          </div>
          <div className='text-center'>
            <Button
              variant='primary'
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    price: product.price,
                  })
                );
              }}>
              Add to cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <div className='row py-5'>
      {products.length === 0 ? (
        <div>You have Connection problem. Please try again later.</div>
      ) : (
        cards
      )}
    </div>
  );
}

export default FakeApi;
