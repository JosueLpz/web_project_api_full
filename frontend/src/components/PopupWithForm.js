import closeIcon from "../image/nav/CloseIcon.svg";

export default function PopupWithForm(props) {
  return (
    <>
      <fieldset className={`popup ${props.name}`}>
        <form
          className={`form__container popup__${props.name}`}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <button
            onClick={props.handleClose}
            className="form__container-closed root__buttom-closed-active popup__closed"
          >
            <img src={closeIcon} alt="ButtonClosed" />
          </button>
          <h2 className="form__container-title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className="form__container-button root__button-hover-active popup__button"
          >
            {props.button}
          </button>
        </form>
      </fieldset>
    </>
  );
}
