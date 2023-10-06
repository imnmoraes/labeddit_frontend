import axios from "axios";
import React, { useContext, useState } from "react";
import { UserData } from "../../Global/GlobalState";
import { useNavigate } from "react-router-dom";
import "./SigninPage.css";

export default function SigninPage() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [token, setToken] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.post(
        "https://labeddit-backend-kcw3.onrender.com/users/signup",
        formData
      );

      const { token } = response.data;

      setToken(token);
      setUserData({ connected: true, jwt: token });
      navigate("/posts");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div></div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9983 15.2387C14.9983 19.0351 13.5222 22.676 10.8949 25.3605C8.26756 28.0449 4.70412 29.553 0.988495 29.553V15.2387H14.9983Z"
            fill="#F9B24E"
          />
          <path
            d="M29.0115 15.2387C29.0115 17.1185 28.6491 18.9799 27.9451 20.7166C27.241 22.4533 26.209 24.0313 24.9081 25.3605C23.6072 26.6897 22.0627 27.7441 20.363 28.4634C18.6633 29.1828 16.8415 29.553 15.0017 29.553V15.2387H29.0115Z"
            fill="#A8BBC6"
          />
          <path
            d="M14.9983 15.2281C14.9978 13.3479 15.36 11.486 16.0641 9.7489C16.7682 8.01177 17.8005 6.43343 19.1018 5.10408C20.4032 3.77474 21.9482 2.72044 23.6486 2.00145C25.3489 1.28246 27.1713 0.912864 29.0115 0.91379V15.2281H14.9983Z"
            fill="#45525B"
          />
          <path
            d="M0.988495 15.2281C0.988042 13.3482 1.35009 11.4866 2.05399 9.74971C2.75789 8.01281 3.78982 6.43462 5.09084 5.10532C6.39186 3.77602 7.93647 2.72166 9.63642 2.00246C11.3364 1.28326 13.1583 0.913326 14.9983 0.913788V15.2281H0.988495Z"
            fill="#FE7E02"
          />
        </svg>
        <button className="link" onClick={()=>{
          navigate("/")
        }}>
          Entrar
        </button>
      </div>
      <div className="logoLabedit">Olá, boas vindas ao LabEddit ;)</div>
      <form className="loginFormInput" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Apelido"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="E-mail"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Senha"
        />

        <div className="loginFormButtons">
          <p>
            Ao continuar, você concorda com o nosso <a href="#" onClick={()=>{alert("Contrato de usuário:   Eu concordo em só postar coisas legais! 😁")}}>Contrato de usuário</a> e nossa <a href="#" onClick={()=>{alert("🙄")}}>Política de Privacidade</a>
          </p>
          <div>
            <input type="checkbox"></input>
            <label>
              Eu concordo em receber emails sobre coisas legais no Labeddit
            </label>
          </div>
          <button className="button1" type="submit">
            Cadastrar
          </button>
        </div>
      </form>
      {token && <p>JWT Token: {token}</p>}
    </div>
  );
}
