import { getDatabase, onValue, ref } from 'firebase/database';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Hader from './../template_part/Hader';
import Footer from './../template_part/Footer';

function Category() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [categoryName, setcatagoryName] = React.useState('')
  const [DataBase, setgameData] = React.useState({gameData:[]});
  
     
     



React.useEffect(()=>{
  ///Catagory Name detect
  const dbcatagoryRef= (ref(getDatabase(), 'Catagory/'+id));
  onValue(dbcatagoryRef, snapshot=>{
    setcatagoryName(snapshot.val().Name)
  });

/////Game Tata Lod
const dbGameRef = (ref(getDatabase(), 'Games'));
onValue(dbGameRef, snapshot=>{
  const records = [];
  snapshot.forEach(childSnapshot=>{
records.push(childSnapshot.val());
  });
//records.sort((a,b)=>b.ID-a.ID);
setgameData((DataBase)=>({DataBase, gameData:records}))
});
  },[id]);

return (
    <div>
      <Hader/>
      <main className="sitemaincontent">
<div className="container">

<section className="section-home-category-page">
<div className="container">
    <div className="titleCatagory">
        <center><h4>{categoryName} Puzzles</h4></center>
    </div>
    
    <div className="row ">
    {DataBase.gameData.filter(data=>data.Category.includes(categoryName)).map((row, index)=>{
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
        

        <Footer/>
        </div>
  )
}

export default Category