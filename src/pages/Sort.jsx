import { getDatabase, ref, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../template_part/Footer';
import Hader from '../template_part/Hader';
import { Link } from 'react-router-dom';

function Sort() {
  const navigate = useNavigate();
    const {id} = useParams();
    const [search, setSearch] = useState('');
    const [sortname, setShortName] = useState('');
    const [CatagoryData, setCatagoryData] = useState({CatagoryData:[]});
    const [GameData, setGameData] = useState({GameData:[]});
    const [ratingcolps, setRatingcolps] = useState('show');
    const [catagorycolps, setCatagorycolps] = useState('show');

useEffect(()=>{
const dbCatagoryRef = (ref(getDatabase(), 'Catagory'));
onValue(dbCatagoryRef, snapshot=>{
  const records = [];
snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
});
setCatagoryData({CatagoryData:records});
});

////Game Data Import
const dbGameRef = (ref(getDatabase(), 'Games'));
onValue(dbGameRef, snapshot=>{
const records =[];
snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
});

if(id==='newest-puzzles'){
  records.sort((a,b)=>a.ID-b.ID);
  setShortName('Newest Puzzles');
}
else if(id==='oldest-puzzles'){
  records.sort((a,b)=>b.ID-a.ID);
  setShortName('Oldest Puzzles');
}
else if(id==='raiting'){
  records.sort((a,b)=>b.Like-a.Like);
  setShortName('Photos Highest Raiting');
}
else if(id==='most-Raited'){
  records.sort((a,b)=>b.Play-a.Play);
  setShortName('Most People Raited');
}
setGameData({GameData:records});
});

    },[id]);


  return (
    <div>
      <Hader/>
      <main className="sitemaincontent">
<div className="container">
<section className="section-content py-3">
<div className="row">

{/* ================ SideBar================ */}
<aside className="col-lg-3"> 
    <nav className="sidebar card py-2 mb-4">
    <ul className="nav flex-column" id="nav_accordion">
        <li className="nav-item">
            <div className="search_backgrounds">
                <img src="/assest/img/search_ico.svg" alt=""/>  
                  <input 
                  type="text" 
                  value={search}
                  onChange={e=>setSearch(e.target.value)}
                  placeholder="Search..."/>
                </div>
        </li>
        <br/>
        <li className="nav-item has-submenu">
            <Link className="nav-link" onClick={e=> ratingcolps!==''? setRatingcolps(''): setRatingcolps('show')}><i className="bi bi-star-fill"></i> 
            <span className="sidebar-sec-rop"> Rating</span> 
            <i className="bi bi-chevron-down"></i>
         </Link>
            <ul className={"submenu  collapse "+ratingcolps}>
                <li><Link className="nav-link" to={'/sort/newest-puzzles'}>Newest Puzzles</Link></li>
                <li><Link className="nav-link" to={'/sort/oldest-puzzles'}>Oldest Puzzles </Link></li>
                <li><Link className="nav-link" to={'/sort/raiting'}>Photos Highest Raiting </Link> </li>
                <li><Link className="nav-link" to={'/sort/most-Raited'}>Most People Raited </Link></li>
                <li><Link className="nav-link" to={'/sort/most-Raited'}>Least People Raited </Link></li>
                <li><Link className="nav-link" to={'/sort/solved-most-times'}>Solved Most Times </Link> </li>
            </ul>
        </li>
        <li className="nav-item has-submenu">
            <Link className="nav-link" onClick={e=> catagorycolps!==''? setCatagorycolps('') : setCatagorycolps('show') }>
                <i className="bi bi-grid-1x2-fill"></i> 
         <span className="sidebar-sec-rop"> Category</span> 
         <i className="bi bi-chevron-down"></i> </Link>
         <ul className={"submenu collapse "+catagorycolps} >
         {CatagoryData.CatagoryData.map((row, index)=>{
            return(
             
                <li key={index}><Link className="nav-link" to={'/category/'+row.ID}>{row.Name}</Link></li>
                
            
            )

         })}
         </ul>   
        </li>
    </ul>
    </nav>
    
            </aside>

{/* ===================Sort Result======================== */}


      <main className="col-lg-9 sitemaincontent">
<div className="container">

<section className="section-home-category-page">
<div className="container">
    <div className="titleCatagory">
        <center><h4>{sortname} Puzzles</h4></center>
    </div>
    
    <div className="row ">
    {GameData.GameData.filter(data=>data.Category.toLowerCase().includes(search) || data.Name.toLowerCase().includes(search)|| data.Description.toLowerCase().includes(search)).map((row, index)=>{
          return(
    <div className="col-md-4" key={index}>
          <div className="card">
            <img className="card-img" src={row.Thumbnail} alt="succulent"/>
            <div className="card-img-overlay text-white">
              <div className="float-righttexfg"><img src="/assest/img/star.svg" alt=""/>{row.Like}</div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{row.Name}</h5>
            </div>
            <div className="card-footer-lister">
              <button className="play-button-plopp" onClick={e=> navigate('/games/'+row.ID)}>PLAY</button>
  <div className="play-card-footer-rightrs">
              <img src="/assest/img/playpeepole.svg" alt=""/><p>{row.Play}</p>
          </div>
          </div>
          </div>
        </div>
          )})}
      </div></div></section></div></main>

</div></section></div></main>

      <Footer/>
    </div>
  )
}

export default Sort