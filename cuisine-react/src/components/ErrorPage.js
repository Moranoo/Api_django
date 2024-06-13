import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Redirect user after a set time (e.g., 5000 milliseconds = 5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Assuming '/' is the path to your list page
    }, 5000); // Adjust the time as needed

    // Cleanup function to clear the timer if the component unmounts before the timer fires
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
