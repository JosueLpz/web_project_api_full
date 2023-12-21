import header__logo from "../image/header/header__logo.svg";
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <section className="nav">
      <div className="nav__header">
        <img className="header__logo" src={header__logo} alt="logo header" />
        <Link className="nav__title" to={props.to}>
          {props.title}
        </Link>
      </div>
      <div className="header__line"></div>
    </section>
  );
}

export default Nav;
