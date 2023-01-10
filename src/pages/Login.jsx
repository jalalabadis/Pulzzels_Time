import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../firebase'
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // User SignIn
    const User_signin = async (e)=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          sessionStorage.setItem('accessToken', user.uid);
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
        <div className="signinsdtext">Sign In</div>
        <div className="sigmintext2">New user? <Link to={'/register'}>Sing Up</Link></div>

        <div className="signininputoutput">
            <input 
            type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="enter email"/>
        </div>
       
        <div className="signininputoutput">
            <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="enter password"/>
        </div>

        <div className={email!=="" && password.length>4? "signinActivebutton" : "signinbuttonoutput"} onClick={User_signin}>Login</div>
    </div>
</section>
 
  )
}

export default Login