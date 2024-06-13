import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/recipes'); 
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div id="error-page" style={{height: '100vh'}}
         className={"flex flex-row justify-center items-center gap-4"}>
      <img className={"rounded"} width={"15%"} alt={"travolta huh ?"} src={'https://media1.tenor.com/m/_BiwWBWhYucAAAAd/what-huh.gif'}/>
      <div className={"flex flex-col"}>
        <h1>Mauvaise page!</h1>
        <p>Hop là ! Il semblerait que vous ayez atterri sur une page qui n'existe pas</p>
        <p>Erreur: <i>Erreur 404 Page introuvable</i></p>
        <p>Vous serez redirigé vers la page principale dans quelques secondes...</p>
      </div>
    </div>
  );
}
