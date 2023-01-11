import React from 'react'
import Hader from './../template_part/Hader';
import Footer from './../template_part/Footer';

function NotFound() {


  return (
    <div>
      <Hader/>
<div className="container">
  <div className="error-template">
  <h4>404 Not Found</h4>
  </div>

</div>

 <Footer/>
      </div>
  )
}

export default NotFound