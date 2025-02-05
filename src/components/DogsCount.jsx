import { useDogs } from "../context/DogsContext";

function DogsCount({ count }) {
  return (
    <>
      <h2>{count} dog(s) found!</h2>
    </>
  );
}

export default DogsCount;
