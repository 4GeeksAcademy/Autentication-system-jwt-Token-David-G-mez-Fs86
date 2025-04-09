import React, { useState, useContext, useEffect } from "react";
import { useNavigate  } from "react-router-dom";

export const LogIn = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/login`,{
        method: 'POST', 
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
      if (response.ok){
        localStorage.setItem('token', data.token)
        navigate('/perfil')
      }
    } catch (error) {
      console.log(error)
    }
  };

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate('/perfil')
    } else {
      navigate('/login')
    }
  };

  useEffect(() => {
    fetchProfileData()
}, [])

  return (
    <>
      <section className="container">
        <h1>Log in</h1>
        <form
          className="formulario"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={email}
            placeholder="Correo electrónico"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Contraseña"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="button1" type="submit"> Entrar </button>
        </form>
      </section>
    </>
  )
}