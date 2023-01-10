import React from 'react'
import { Link } from 'react-router-dom'
import {auth} from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';
function Hader() {
  // UserCheck
onAuthStateChanged(auth, (user) => {
  if (user) {
const uid = user.uid;
sessionStorage.setItem('accessToken', uid);
    // ...
  } else {
    // User is signed out
    sessionStorage.clear();
    // ...
  }
});
  const accessToken = sessionStorage.getItem('accessToken');
  return (
    <nav  className="navbar navbar-expand-lg navbarcustompuzz">
        <div className="container">
        <Link to={"/"}>
            <img className="d-inline-block align-top mx-auto" src="/assest/img/logo.png" alt=""/> Create
        </Link>
<div className="siteditaillessrt">Fun Time Puzzles</div>

<div className="navrightsidertsd">
     
        {accessToken?
        
        <div className="userlogintexo">
        <i className="bi bi-plus-square-dotted"></i>
        <Link to={"/create"}>Create</Link> 
        </div>
        :

   <div className="userlogintexo">
   <i className="bi bi-person-circle"></i>
   <Link to={"/login"}>Log in</Link> 
   </div>
}

        <div className="userlogintexo2">EN <i className="bi bi-chevron-down"></i></div>
    </div>
    </div>
    </nav>
  )
}

export default Hader