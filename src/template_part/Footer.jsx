import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
        <div className="footerareasdf-gh">
        <div className="container text-center text-md-start mt-5 ">
       
            <div className="row mt-3">
              
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
               
                <div className="footertexr-pp1">
                    JS Puzzles
                </div>
                </div>
    
    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        
        <p>
            <Link to={""} className="text-reset">About JSPuzzles</Link>
          </p>
        <p>
            <Link to={""} className="text-reset">Contact Us</Link>
          </p>
        </div>
       
    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        
        <p>
            <Link to={""} className="text-reset">Help and Support</Link>
          </p>
        <p>
            <Link to={""} className="text-reset">Links</Link>
          </p>
        </div>
    
       
    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
       
        <p>
            <Link to={""} className="text-reset">Jigsaw Puzzle Maker</Link>
          </p>
        <p>
            <Link to={""} className="text-reset">JSPuzzles Guestbook</Link>
          </p>
          <p>
            <Link to={""} className="text-reset">Play Solitare</Link>
          </p>
        </div>
    
                </div>
            
    
    <div className="row mt-3 justify-content-center">
        <div className="col-md-4 mx-auto">© 2007-2022 All right received</div>
        <div className="col-md-4 mx-auto">
            <center>
            <p className="footer-last-center">
                <Link to={""} className="text-reset">Privacy Policy</Link>
              </p><p className="footer-last-center">
                <Link to={""} className="text-reset">Terms of Use Policy</Link>
              </p></center>
        </div>
        <div className="col-md-4 mx-auto">
            <div className="socials-icolisty">
           <Link to={""}><img src="assest/img/fb.svg" alt=''/></Link > 
          <Link to={""}><img src="assest/img/twitter.svg" alt=''/></Link >  
           <Link to={""}><img src="assest/img/wats.svg" alt=''/></Link > 
           <Link to={""}><img src="assest/img/printest.svg" alt=''/></Link > 
           <Link to={""}><img src="assest/img/emails.svg" alt=''/></Link > 
            
            </div>
        </div>
    </div>
    
            </div>
            </div>
    </footer>
  )
}

export default Footer