import { Link } from "react-router-dom";
import '../styles/style.css'
const SessionEnd = () => {
  return (
    <div className="box session-end">
      <h1>Session Has Ended</h1>

      <p className="thank-you">
        Thank you for using digibooth by @barisdua
      </p>

      <p className="homepage-link">
        <Link to="/">Back to homepage</Link>
      </p>
    </div>
  );
};

export default SessionEnd;
