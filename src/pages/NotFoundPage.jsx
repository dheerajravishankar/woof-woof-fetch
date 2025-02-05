import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
