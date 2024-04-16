import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, resetCart } from "./cartSlice";

function DisplayIntoCart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const cart = products.map((product) => (
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
                dispatch(removeFromCart({ id: product.id }));
              }}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <>
      <div>
        <Button
          variant='primary'
          onClick={() => {
            dispatch(resetCart());
          }}>
          reset
        </Button>
      </div>
      <div className='row py-5'>{products ? cart : "card is empty"}</div>;
    </>
  );
}
export default DisplayIntoCart;
