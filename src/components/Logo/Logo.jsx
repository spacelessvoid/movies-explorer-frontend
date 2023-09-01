import { Link } from "react-router-dom";
import "./Logo.css";
import logo from "../../images/header-logo.svg";

function Logo({ isPositionHeader }) {
  return (
    <Link to="/" className="logo">
      <img
        src={logo}
        alt="Лого"
        isPositionHeader={isPositionHeader}
        className={`logo__image ${
          isPositionHeader
            ? "logo__image_type_header"
            : "logo__image_type_welcome"
        }`}
      />
    </Link>
  );
}

export default Logo;
