import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    const newName = e.target.value;
    setName(newName);
    validateName(newName);
  }

  function handleChangeDescription(e) {
    const newDescription = e.target.value;
    setDescription(newDescription);
    validateDescription(newDescription);
  }

  function validateName(name) {
    setIsNameValid(name.length >= 2 && name.length <= 40);
  }

  function validateDescription(description) {
    setIsDescriptionValid(description.length >= 2 && description.length <= 200);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validación del nombre y descripción
    validateName(name);
    validateDescription(description);

    // Verificar si el formulario es válido
    setIsFormValid(isNameValid && isDescriptionValid);

    // Llamar a la función onUpdateUser solo si el formulario es válido
    if (isFormValid) {
      props.onUpdateUser({
        name,
        about: description,
      });
    }
  }

  return (
    <>
      {props.isOpen === "form" && (
        <PopupWithForm
          title="Editar perfil"
          name="form"
          button="Guardar"
          handleClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input
            value={name}
            onChange={handleChangeName}
            id="form__title"
            name="title"
            type="text"
            className="form__container-name popup__input"
            maxLength="40"
            minLength="2"
            required
          />
          {!isNameValid && name !== "" && (
            <span className="form_errors">
              El nombre debe tener entre 2 y 40 caracteres
            </span>
          )}
          <input
            value={description}
            onChange={handleChangeDescription}
            id="form__hobby"
            name="hobby"
            type="text"
            className="form__container-hobby popup__input"
            maxLength="200"
            minLength="2"
            required
          />
          {!isDescriptionValid && description !== "" && (
            <span className="form_errors">
              La descripción debe tener entre 2 y 200 caracteres
            </span>
          )}
        </PopupWithForm>
      )}
    </>
  );
}
