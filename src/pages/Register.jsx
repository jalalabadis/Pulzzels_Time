import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../firebase'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { getDatabase, ref, set} from "firebase/database";


function Register() {
const navigate = useNavigate();
const [username, setUsername]= React.useState('');
const [email, setEmail]= React.useState('');
const [password, setPassword]= React.useState('');

//SignUp
const User_signup = async(e) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      const userId = user.uid;
      const db = getDatabase();
      set(ref(db, 'User/'+userId), {
    Username : username,
    Email : user.email,
    Game_Play: 0
      });
      // ...
    })
    .catch((error) => {
      //const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
    }


///User check
React.useEffect(() => {
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        sessionStorage.setItem('accessToken', uid);
        navigate("/");
} else {
    // User is signed out
    sessionStorage.clear();
    // ...
  }
});  
});
  return (
    <section className="loginsections center-block">
    <div className="container">
        <div className="signinsdtext">Sign Up</div>
        <div className="sigmintext2">Have an account? <Link to={'/login'}>Sing In</Link></div>

        <div className="signininputoutput">
            <input 
            type="text"
            value={username} 
            onChange={(e)=>setUsername(e.target.value)} 
            placeholder="enter username"/>
        </div>
        <div className="signininputoutput">
            <input 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="enter email"/>
        </div>
       
        <div className="signininputoutput">
            <input 
            type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="enter password"/>
        </div>

        <div className={ username!=='' && email!=='' && password.length>4?"signinActivebutton": "signinbuttonoutput"}  onClick={User_signup}>Register</div>
    </div>

</section>
  )
}

export default Register