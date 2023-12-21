import closeIcon from "../image/nav/CloseIcon.svg";

export default function ImagePopup(props) {
  return (
    <div className="zoom">
      <button className="zoom__button-closed root__buttom-closed-active" onClick={props.onClose}>
        <img src={closeIcon} alt="ButtonClosed" />
      </button>
      <div className="zoom__content"></div>
      <img className="zoom__img" src={props.card.link} alt={props.card.name} />
      <p className="zoom__text">{props.card.name}</p>
    </div>
  );
}
