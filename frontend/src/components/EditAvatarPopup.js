import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInputRef = useRef();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // Validación de la URL
    validateUrl(avatarUrl);

    // Verificar si el formulario es válido
    setIsFormValid(isUrlValid);

    // Llamar a la función onUpdateAvatar solo si el formulario es válido
    if (isFormValid) {
      props.onUpdateAvatar({
        avatar: avatarUrl,
      });
    }
  }

  function handleChangeUrl(e) {
    const newUrl = e.target.value;
    setAvatarUrl(newUrl);
    validateUrl(newUrl);
  }

  function validateUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    setIsUrlValid(urlPattern.test(url));
  }

  return (
    <>
      {props.isOpen === "avatar" && (
        <PopupWithForm
          title="Cambiar foto de perfil"
          name="avatar"
          button="Guardar"
          handleClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input
            id="avatar__url"
            className="popup__input"
            name="avatar"
            placeholder="Nuevo avatar"
            type="url"
            ref={avatarInputRef}
            onChange={handleChangeUrl}
            required
          />
          {!isUrlValid && avatarUrl !== "" && (
            <span className="form_errors">
              Por favor, ingresa una URL válida
            </span>
          )}
        </PopupWithForm>
      )}
    </>
  );
}

export default EditAvatarPopup;
