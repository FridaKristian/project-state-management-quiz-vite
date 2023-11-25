import { Link } from "react-router-dom";
import "./pagenotfound.css";

export const PageNotFound = () => {
  return (
    // This page is displayed if a link is incorrect
    <div className="page-not-found">
      <h1 className="not-found-title">
        Oops, that page doesn&apos;t exist.💀
      </h1>

      {/* This is a link that leads the user back to the main page */}
      <Link to="/">
        {/* Button uses an arrow symbol imported from the font-awesome library */}
        <button className="go-back-link fa fa-chevron-circle-left">
          <p>Go back</p>
        </button>
      </Link>
    </div>
  );
};
