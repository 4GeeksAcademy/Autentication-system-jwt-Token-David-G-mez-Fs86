import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



export const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const actualizador = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/registro`,{
        method: 'POST', 
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
      if (response.ok){
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return  (
    <section className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={actualizador}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={actualizador}
          required
        />
        {/* {error && <p className="error">{error}</p>} */}
        <button className="button1" type="submit">
          Registrarse
        </button>
      </form>
    </section>
  );
};
