import { Link } from 'react-router-dom';
function Header() {
  return (
    <header>
      <div className="container">
        <Link style={{ textDecoration: 'none' }} to="/">
          <h2>Feedback UI</h2>
        </Link>
      </div>
    </header>
  );
}

export default Header;
