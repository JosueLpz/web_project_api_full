import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Card from "./Card.js";

function Main(props) {
  const userData = useContext(CurrentUserContext);

  return (
    <>
      <EditProfilePopup isOpen={props.isOpen} onClose={props.onClose} onUpdateUser={props.onUpdateUser} />
      <EditAvatarPopup isOpen={props.isOpen} onClose={props.onClose} onUpdateAvatar={props.onUpdateAvatar} />
      <AddPlacePopup isOpen={props.isOpen} onClose={props.onClose} onUpdateCard={props.onUpdateCard} />
      {props.selectedCard !== null && <ImagePopup card={props.selectedCard} onClose={() => props.setSelectedCard(null)} />}
      <main className="element">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            userData={userData}
          />
        ))}
      </main>
    </>
  );
}

export default Main;
