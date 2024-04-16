import { useSelector } from "react-redux";

function Appear() {
  const valueState = useSelector((state) => state.counter.valueState);
  return <div>{valueState && <h1>modal appear </h1>}</div>;
}

export default Appear;
