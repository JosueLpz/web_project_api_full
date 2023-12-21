import React, { useState } from "react";
import NoLogin from "./NoLogin";
import Nav from "./Nav";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({
      email,
      password,
    });
  }

  return (
    <section>
      <Nav title="Inicia sesión" to={props.to} />
      <NoLogin
        title="Regístrate"
        button="Regístrate"
        link="¿Ya eres miembro? Inicia sesión aquí"
        onSubmit={handleSubmit}
      >
        <input
          value={email}
          onChange={handleChangeEmail}
          // id="form__title"
          // name="title"
          type="email"
          placeholder="Correo electrónico"
          className="nologin__input"
          maxLength="40"
          minLength="2"
          required
        />
        <input
          value={password}
          onChange={handleChangePassword}
          // id="form__title"
          // name="title"
          type="password"
          placeholder="Contraseña"
          className="nologin__input"
          maxLength="40"
          minLength="2"
          required
        />
      </NoLogin>
    </section>
  );
}

export default Register;
