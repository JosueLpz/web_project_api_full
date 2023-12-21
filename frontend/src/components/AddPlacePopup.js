import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChangeTitle(e) {
    const newName = e.target.value;
    setTitle(newName);
    validateName(newName);
  }

  function handleChangeUrl(e) {
    const newUrl = e.target.value;
    setUrl(newUrl);
    validateUrl(newUrl);
  }

  function validateName(name) {
    setIsNameValid(name.length >= 2 && name.length <= 30);
  }

  function validateUrl(url) {
    const urlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    setIsUrlValid(urlPattern.test(url));
  }

  function handleSubmit(e) {
    e.preventDefault();

    validateName(title);

    validateUrl(url);

    setIsFormValid(isNameValid && isUrlValid);

    if (isFormValid) {
      props.onUpdateCard({
        name: title,
        link: url,
      });
    }
  }

  return (
    <>
      {props.isOpen === "card" && (
        <PopupWithForm
          title="Nuevo lugar"
          name="card"
          button="Crear"
          handleClose={props.onClose}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
        >
          <input
            value={title}
            onChange={handleChangeTitle}
            id="card__title"
            name="name"
            placeholder="Titulo"
            type="text"
            className="card__element-name-card popup__input"
            maxLength="30"
            minLength="2"
            required
          />
          {isNameValid || title === "" ? null : (
            <span className="form_errors">
              El nombre debe tener entre 2 y 30 caracteres
            </span>
          )}
          <input
            value={url}
            onChange={handleChangeUrl}
            id="card__url"
            name="link"
            placeholder="Enlace a la imagen"
            type="url"
            className="card__element-link-img popup__input"
            required
          />
          {isUrlValid || url === "" ? null : (
            <span className="form_errors">
              Por favor, ingresa una URL válida
            </span>
          )}
        </PopupWithForm>
      )}
    </>
  );
}

export default AddPlacePopup;
