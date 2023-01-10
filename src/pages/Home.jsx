import React from 'react'
import Footer from '../template_part/Footer';
import Hader from '../template_part/Hader';
import Sidebar from '../template_part/Sidebar';
import HomeMain from '../template_part/HomeMain';

class Home extends React.Component {
  render(){
  return (
    <div>
        <Hader/>

<main className="sitemaincontent">
<div className="container">
<section className="section-content py-3">
<div className="row">
<Sidebar/>
<HomeMain/>
</div>
</section>
</div>
</main>

        <Footer/>
    </div>
  )
}}

export default Home