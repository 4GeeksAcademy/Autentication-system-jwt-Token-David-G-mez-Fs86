import { useState, useEffect } from 'react';
import React from 'react'
import "../../index.css"
import { useNavigate } from 'react-router-dom';

export const Perfil = () => {

  const navigate = useNavigate();

  const eliminarToken = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      console.log('Token eliminado');
      navigate('/login');
      alert('Has cerrado sesión correctamente');
        
    } else {
        console.log('No hay token almacenado');
        alert('Primero inicia sesión');
    }
}


  return (
    <>
      <div className="card">
        <img className="img-about-us" src="https://lh3.googleusercontent.com/a/ACg8ocI-F3f3OTHSvD4Xcdv2qZvoHWFueAzxeALwAe3Aj7EdAaUfoVpj=s288-c-no" />
        <div className="content-about-us">
          <h3 className="title-name-about-us">David G.</h3>
          <p className="department">Software Developer</p>
          <p className="description-about-us">
            "A veces la persona más puntual del mundo, y otras veces el rey del "llego en 5 minutos!"
          </p>
          <a href="https://www.linkedin.com/in//">
          </a>
        </div>
        <button className='btn btn-primary mb-4' onClick={eliminarToken} >Cerrar Sesión</button>
      </div>
    </>
  )
};