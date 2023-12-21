import closeIcon from "../image/nav/CloseIcon.svg";

function InfoTooltip(props) {
  return (
    <section className="Infotooltip">
      <button
        className="Infotooltip__button root__buttom-closed-active"
        onClick={props.onClose}
      >
        <img src={closeIcon} alt="buttonclosed" />
      </button>
      <img src={props.img} className="Infotooltip_img" />
      <h2 className="Infotooltip_text">{props.text}</h2>
    </section>
  );
}

export default InfoTooltip;
