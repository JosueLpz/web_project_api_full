import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import InfoTooltip from "./InfoTooltip.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, Redirect } from "react-router-dom";

import img_done from "../image/Infotooltip/Union_done.png";
import img_fail from "../image/Infotooltip/Union_fail.png";

function App() {
  const history = useHistory();
  // * pupop de los formularios
  const [openPopup, setOpenPopup] = useState(null);
  function handlePopupOpen(popupName) {
    setOpenPopup(popupName);
  }
  function handlePopupClose() {
    setOpenPopup(null);
  }
  // * Solicitudes de apis de profile y sus manejos de cambios de estado
  const [currentUser, SetCurrentUser] = useState([]);
  useEffect(() => {
    api.getInfoServer("users/me").then((data) => {
      SetCurrentUser(data);
    });
  }, []);

  function handleUpdateUser(updatedUserData) {
    api
      .updateUserProfile("users/me", JSON.stringify(updatedUserData))
      .then((data) => {
        SetCurrentUser(data);
        handlePopupClose();
      });
  }

  function handleUpdateAvatar(updatedAvatarData) {
    api
      .updateUserProfile("users/me/avatar", JSON.stringify(updatedAvatarData))
      .then((data) => {
        SetCurrentUser(data);
        handlePopupClose();
      });
  }

  //*Manejo de la lista de cartas

  const [cards, SetCards] = useState([]);

  useEffect(() => {
    api.getInfoServer("cards").then((cards) => {
      SetCards(cards);
    });
  }, []);
  // * api post para crear carta!
  function handleAddPlaceSubmit(updatedCardData) {
    api
      .postCreateCards("cards", JSON.stringify(updatedCardData))
      .then((data) => {
        SetCards([data, ...cards]);
        handlePopupClose();
      });
  }

  //*metodos de cartas borrar y like
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => {
      return like._id === currentUser._id;
    });

    if (!isLiked) {
      api.putLikesCard(`cards/likes/${card._id}`).then((newCard) => {
        SetCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.deleteInfoServer(`cards/likes/${card._id}`).then((newCard) => {
        SetCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteInfoServer(`cards/${card._id}`).then(() => {
      SetCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  // * popup de las cartas
  const [selectedCard, setSelectedCard] = useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [loggedIn, setloggedIn] = useState(false);

  //* Usando el try catch y async y await  para resolver la funcion
  async function handleOnLogin(onLogin) {
    try {
      const res = await auth.authorize(onLogin.email, onLogin.password);

      if (res) {
        setShowInfoTooltipDone(true);

        const timer = setTimeout(() => {
          setloggedIn(true);
          history.push("/main");
          setShowInfoTooltipDone(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setShowInfoTooltipFail(true);
        console.log("No se autorizó correctamente");
      }
    } catch (err) {
      console.error("Error durante la autorización:", err);
    }
  }

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt).then((res) => {
        if (res) {
          setloggedIn(true);
          history.push("/main");
        }
      });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  //* Usando el then  y sentencia if para resolver la funcion. las dos son validas
  function handleOnRegister(onRegister) {
    auth
      .register(onRegister.email, onRegister.password)
      .then((res) => {
        if (res) {
          history.push("/signin");
        } else {
          setShowInfoTooltipFail(true);
          console.log("Algo Fallo");
        }
      })
      .catch((err) => {
        console.log(err);
        console.error(err);
      });
  }

  const [showInfoTooltipDone, setShowInfoTooltipDone] = useState(false);
  const [showInfoTooltipFail, setShowInfoTooltipFail] = useState(false);

  function InfoTooltipButtonClosed() {
    setShowInfoTooltipDone(false);
    setShowInfoTooltipFail(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {showInfoTooltipDone && (
          <InfoTooltip
            text="¡Correcto! Ya estás registrado."
            img={img_done}
            onClose={InfoTooltipButtonClosed}
          />
        )}
        {showInfoTooltipFail && (
          <InfoTooltip
            text="Uy, algo salió mal. Por favor, inténtalo de nuevo."
            img={img_fail}
            onClose={InfoTooltipButtonClosed}
          />
        )}
        <Switch>
          <Route exact path="/signin">
            <Login onLogin={handleOnLogin} to="/signup" />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleOnRegister} to="/signin" />
          </Route>
          <ProtectedRoute path="/main" loggedIn={loggedIn}>
            <Header
              onEditProfileClick={() => handlePopupOpen("form")}
              onAddPlaceClick={() => handlePopupOpen("card")}
              onEditAvatarClick={() => handlePopupOpen("avatar")}
            />
            <Main
              isOpen={openPopup}
              onClose={handlePopupClose}
              onUpdateUser={handleUpdateUser}
              onUpdateAvatar={handleUpdateAvatar}
              onUpdateCard={handleAddPlaceSubmit}
              onCardClick={handleCardClick}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signup" />}
          </Route>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
