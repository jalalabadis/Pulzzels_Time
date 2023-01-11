import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref } from 'firebase/database';


function HomeTemplate() {
const [CatagoryDataBase, setCatagoryDataBase] = useState({CategoryData: [], CatagoryDataFooter:[]});
const [GameDataBase, setGameDataBase] = useState({
    GameDataRendom:[],
    GameDataPopular:[],
    GameDataForyou:[],
    GameDataSearch:[]
    });

useEffect(()=>{
/////Catacory Data Import
const dbCatagoryRef = (ref(getDatabase(), 'Catagory'));
onValue(dbCatagoryRef, snapshot=>{
const records = [];
const records2 = [];
snapshot.forEach(childSnapshot=>{
records.push(childSnapshot.val());
records2.push(childSnapshot.val());
});
setCatagoryDataBase({CategoryData: records, CatagoryDataFooter:records2.splice(0,6)});
});

/////Games Data Import
const dbGameRef = (ref(getDatabase(), 'Games'));
onValue(dbGameRef, snapshot=>{
const Rendomrecords = [];
const Popularrecords = [];
const Foryourecords = [];
const Searchrecords = [];
snapshot.forEach(childSnapshot=>{
Rendomrecords.push(childSnapshot.val());
Popularrecords.push(childSnapshot.val());
Foryourecords.push(childSnapshot.val());
Searchrecords.push(childSnapshot.val());
});
Rendomrecords.sort(function (a, b) {return Math.random() - 0.5;});
Popularrecords.sort((a,b)=>b.Like-a.Like);
Foryourecords.sort(function (a, b) {return Math.random() - 0.5;});
setGameDataBase({
    GameDataRendom: Rendomrecords.splice(0,1),
    GameDataPopular:Popularrecords.splice(0,6),
    GameDataForyou: Foryourecords.splice(0,3),
    GameDataSearch: Searchrecords
});
});

},[]);

///==========Search Sidebar colleps================
const [search, setSearch] = useState('');
const [ratingcolps, setRatingcolps] = useState('show');
const [catagorycolps, setCatagorycolps] = useState('show');
const navigate = useNavigate();
  return (
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
                <img src="assest/img/search_ico.svg" alt=""/>  
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
         <ul className={"submenu collapse "+catagorycolps}>
         {CatagoryDataBase.CategoryData.map((row, index)=>{
            return(
                
                <li key={index}><Link className="nav-link" to={'/category/'+row.ID}>{row.Name}</Link></li>
                
            )

         })}
          </ul>  
        </li>
    </ul>
    </nav>
    
            </aside>


            {/* ========================Search Pages========================= */}
<main className={search!==''?"col-lg-9 sitemaincontent" : "col-lg-9 sitemaincontent deactiveContainer"}>
<div className="container">

<section className="section-home-category-page">
<div className="container">
    <div className="titleCatagory">
        <center><h4>{search} Puzzles</h4></center>
    </div>
    
    <div className="row ">
    {GameDataBase.GameDataSearch.filter(data=>data.Category.toLowerCase().includes(search) || data.Name.toLowerCase().includes(search)|| data.Description.toLowerCase().includes(search)).map((row, index)=>{
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

            {/*=================== Homepage Main ==================*/}

<main className={search!==''? "col-lg-9 deactiveContainer" : "col-lg-9"}>
{/* Daily and Random Puzzel  */}
<section className="section-home-random">
<div className="container">
<div className="row">
<div className="col-lg-6">
<div className="card">
<div className="card-hader-lister">
<div className="rendom_card_title">Daily JS Puzzle</div>
<button className="play-button-plopp2">PLAY</button>
</div>
<img className="card-img2" src="assest/img/dailypp.png" alt="succulent"/>
</div>
</div>

{GameDataBase.GameDataRendom.map((row, index)=>{
return(
<div className="col-lg-6" key={index}>
<div className="card">
<div className="card-hader-lister">
<div className="rendom_card_title">Random JS Puzzle</div>
<button className="play-button-plopp2" onClick={e=> navigate('/games/'+row.ID)}>PLAY</button>
</div>
<img className="card-img2" src={row.Thumbnail} alt="succulent"/>
</div>
</div>
)
})}
</div>
</div>
</section>
 {/* Most Popular  */}
<section className="section-home-mostpopular">
<div className="container">
<h4>Most Popular</h4>
<div className="row ">

{GameDataBase.GameDataPopular.map((row, index)=>{
  return(
<div className="col-md-4" key={index}>
<div className="card">
  <img className="card-img" src={row.Thumbnail} alt="succulent"/>
  <div className="card-img-overlay text-white">
    <div className="float-righttexfg"><img src="assest/img/star.svg" alt=""/> {row.Like}</div>
  </div>
  <div className="card-body">
    <h5 className="card-title">{row.Name}</h5>
  </div>
  <div className="card-footer-lister">
    <button className="play-button-plopp" onClick={e=> navigate('/games/'+row.ID)}>PLAY</button>
<div className="play-card-footer-rightrs">
    <img src="assest/img/playpeepole.svg" alt=""/><p>{row.Play}</p>
</div>
</div>
</div>
</div>
  )
})}

</div>
</div>
</section>

 {/* Selec For You  */}
<section className="section-home-Selected">
<div className="container">
<h4>Selected for you</h4>
<div className="row ">

{GameDataBase.GameDataForyou.map((row, index)=>{
  return(
    <div className="col-md-4" key={index}>
    <div className="card">
      <img className="card-img" src={row.Thumbnail} alt="succulent"/>
      <div className="card-img-overlay text-white">
        <div className="float-righttexfg"><img src="assest/img/star.svg" alt=""/>{row.Like} </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{row.Name} </h5>
      </div>
      <div className="card-footer-lister">
        <button className="play-button-plopp" onClick={e=> navigate('/games/'+row.ID)}>PLAY</button>
<div className="play-card-footer-rightrs">
        <img src="assest/img/playpeepole.svg" alt=""/><p>{row.Play}</p>
    </div>
    </div>
    </div>
  </div>
  )
})}

</div>
</div>
</section>

 {/* By Category */}
<section className="section-home-Category">
<div className="container">
<h4>By Category</h4>
<div className="row">
{CatagoryDataBase.CatagoryDataFooter.map((row, index)=>{
return(
  <div className="col-md-4" key={index}>
    <Link to={'/category/'+row.ID}>
<div className="card">
<div className="card-hader-catgoryesds">
<i className="bi bi-grid-1x2-fill"></i>    <p>{row.Name}</p>
</div>
<img className="card-img2" src={row.Thumbnail} alt="succulent"/>
</div>
</Link>
</div>
)
})}

</div>
</div>
</section>
  </main>         

</div>
</section>
</div>
</main>
  )
}

export default HomeTemplate