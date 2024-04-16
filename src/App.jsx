import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import DispatchToStore from "./DispatchToStore";
import FakeApi from "./Redux/fakeApi/fakeApi";

import { Counter } from "./Redux/newCounterApp/Counter";
import Appear from "./Redux/newCounterApp/appear";
import DisplayIntoCart from "./Redux/reducers/addToCart/displayIntocart";
import Login from "./Redux/Login/login";
import JustForLoginUser from "./Redux/Login/justForLoginUser";
//import DisplayFromStore from "./displayFromStore";
const App = () => {
  return (
    <>
      <FakeApi />
      <DispatchToStore />
      <Counter />
      <Appear />
      <DisplayIntoCart />
      <Login />
      <JustForLoginUser />
    </>
  );
};
export default App;
