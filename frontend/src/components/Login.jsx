import React, { useState } from "react";
import NoLogin from "./NoLogin";
import Nav from "./Nav";

function Login(props) {
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
    props.onLogin({
      email,
      password,
    });
  }

  return (
    <section>
      <Nav title="Regístrate" to={props.to} />
      <NoLogin
        title="Inicia sesión"
        button="Inicia sesión"
        link="¿Aún no eres miembro? Regístrate aquíí"
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

export default Login;
