import React from 'react'
import Footer from '../template_part/Footer';
import Hader from '../template_part/Hader';
import HomeTemplate from '../template_part/HomeTemplate';

class Home extends React.Component {
  render(){
  return (
    <div>
        <Hader/>

<HomeTemplate/>

        <Footer/>
    </div>
  )
}}

export default Home