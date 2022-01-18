import spinner from '../../assets/spinner.gif';

function Spinner() {
  return (
    <img
      style={{
        width: '200px',
        margin: '100px auto',
        display: 'block',
      }}
      src={spinner}
      alt="loading-spinner"
    />
  );
}

export default Spinner;
