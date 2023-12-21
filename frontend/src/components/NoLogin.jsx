import { Link } from "react-router-dom";

export default function NoLogin(props) {
  return (
    <>
      <fieldset className={`nologin ${props.name}`}>
        <form className={`nologin__form ${props.name}`} name={props.name} noValidate onSubmit={props.onSubmit}>
          <h1 className="nologin__title">{props.title}</h1>
          {props.children}
          <button type="submit" className="nologin__button">
            {props.button}
          </button>
          <Link className="nologin__link" to="/register">
            {props.link}
          </Link>
        </form>
      </fieldset>
    </>
  );
}
