export default function Error({ error }) {
  let listOfErrors = [];
  if (Array.isArray(error)) {
    listOfErrors = error;
  } else {
    listOfErrors.push({ msg: error });
  }

  const errors = listOfErrors.map((err, index) => (
    <li key={index}>{err.msg}</li>
  ));

  return errors;
}
