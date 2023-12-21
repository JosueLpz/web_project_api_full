import { useContext } from "react";
import buttonDelete from "../image/element/ButtonDelete.svg";
import buttonLike from "../image/element/ButonLike.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // recuerda enviar los datos a otro componente atraves de una funcion y su parametro!
  function handleZoomClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  // forma 1, con un objeto, para desplegar el dysplay
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonStyle = {
    display: isOwn ? "block" : "none",
  };

  // forma 2 con clases para modificar el elemento
  const isLiked = props.card.likes.some((like) => {
    return like._id === currentUser._id;
  });
  const cardLikeButtonStyle = `element__article_row_like root__button-hover-active ${
    isLiked ? "element__article_row_like_active" : "element__article_row_like"
  }`;

  return (
    <article className="element__article" key={props.card._id}>
      <button type="button" className="element__article_delete root__button-hover-active" style={cardDeleteButtonStyle} onClick={handleDeleteClick}>
        <img src={buttonDelete} alt="buttondelete" />
      </button>
      <button type="button" className="element__article_img_button" onClick={handleZoomClick}>
        <img className="element__article_img" alt={props.card.name} src={props.card.link} />
      </button>
      <div className="element__article_row">
        <h2 className="element__article_row_title">{props.card.name}</h2>
        <button type="button" className={cardLikeButtonStyle} onClick={handleLikeClick}>
          <img src={buttonLike} alt="buttonlike" />
        </button>
        <p className="element__article_row_like_counter">{props.card.likes.length}</p>
      </div>
    </article>
  );
}
