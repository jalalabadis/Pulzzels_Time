import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Hader from '../template_part/Hader';
import Footer from '../template_part/Footer'
import { ref, getDatabase, onValue, update } from 'firebase/database';

function Games() {
 let { id } = useParams();
 const navigate = useNavigate();
 const [gameImg, setGameImg] = useState();
 const [gameName, setGameName] = useState();
 const[gameDescription, setgameDescription] = useState();
 const [gameLike, setGameLike] = useState();
 const [gamePlay, setgamePlay] = useState();
 const [gameLikecount, setgameLikecount] = useState(false);
 const accessToken = sessionStorage.getItem('accessToken');

 const [GameData, setgameData] = useState({GameData:[]});
 
 useEffect(()=>{
const dbSingegameRef = (ref(getDatabase(), 'Games/'+id));
onValue(dbSingegameRef, snapshot=>{
setGameImg(snapshot.val().Thumbnail);
setGameName(snapshot.val().Name);
setgameDescription(snapshot.val().Description);
setGameLike(snapshot.val().Like);
setgamePlay(snapshot.val().Play);
});

////Game like Data import
if(accessToken!==null){
const dbLikeRef = (ref(getDatabase(), 'Games/'+id+'/LikeData/'+accessToken));
onValue(dbLikeRef, snapshot=>{
  if (snapshot.exists()) {
    setgameLikecount(true);
  } else {
    console.log("No data available");
  }
});
};

////Game Data import
const dbGameRef = (ref(getDatabase(), 'Games'));
onValue(dbGameRef, snapshot=>{
  const records = [];
  snapshot.forEach(childsnapshot=>{
 records.push(childsnapshot.val());
  });
  records.sort(function(a,b) {return Math.random() - 0.5;});
  setgameData({GameData:records.splice(0,4)});
});
 },[id, accessToken]);

////Game Count Check
const [gamecountck, setGamecountck] = useState('');
const handelGameCount = () => {
if(gamecountck!=='Yes'){
const dbRef = (ref(getDatabase(), 'Games/'+id));
update(dbRef, {
Play: +gamePlay+1
});
setGamecountck('Yes');
  }
else{
  console.log('game alredy count')
}
};

///Like Count Check 
const handellikecount =(e) =>{
  if(accessToken!==null){
    const dbLikeRef = (ref(getDatabase(), 'Games/'+id+'/LikeData/'+accessToken));
    update(dbLikeRef, {
ID: accessToken
    });
  const dbgameRef = (ref(getDatabase(), 'Games/'+id));
  update(dbgameRef, {
Like: +gameLike+1
  });
  }
  else{
    navigate('/login')
  }
  
}
return (
<div> 
<Hader/>
<section className="gamebodysplayes">
    {/* -- puzzele game -- */}
    <div className="container">
        <img className="gamebodysplayes-img" src={gameImg} alt="" onClick={handelGameCount}/>
<div className="row gamebaroptionnervsdf">
    <div className="col-10">
       
               <img className="imggamelistoption" src="/assest/img/image-regular.svg" alt=''/>
               <img className="imggamelistoption" src="/assest/img/circle-pause-regular.svg" alt=''/>
               <img className="imggamelistoption" src="/assest/img/rotate-right-solid.svg" alt=''/>
               <img className="imggamelistoption" src="/assest/img/volume-high-solid.svg" alt=''/>
               <img className="imggamelistoption" src="/assest/img/gear-solid.svg" alt=''/>
               {gameLikecount===false?
               <img className="imggamelistoption" src="/assest/img/heart-regular.svg" alt='' onClick={handellikecount}/>
               :
               <img className="imggamelistoption" src="/assest/img/heart-count.svg" alt=''/>
             
}
               <img className="imggamelistoption" src="/assest/img/share.svg" alt=''/>
      
    </div>
    <div className="col-2"> 
        <div className="rightside-floatmd">
        <img  src="/assest/img/fullscreen.svg" alt=''/>
    </div>
 </div>
</div>
    </div>
{/* -- puzzele Detialles -- */}
<div className="container">
    <div className="game-detailesdfgt">
    <div className="row">
        <div className="col-6">
           <div className="pxctitlegamesd">
           <h4>{gameName}</h4>
            <img src="/assest/img/star.svg" alt=''/>
            <img src="/assest/img/star.svg" alt=''/>
            <img src="/assest/img/star.svg" alt=''/>
            <img src="/assest/img/star.svg" alt=''/>
            <img src="/assest/img/star-haf.svg" alt=''/>

          <p>{gameLike}</p>
           </div>
        </div>
        <div className="col-6">
            <div className="float-righttextop">
            #puzzle #playgame #lightbackground
        </div>
        </div>
    </div>

    <div className="discriptionsdf-puzz" dangerouslySetInnerHTML={{__html: gameDescription}}>
    
    </div>
    </div>
</div>

{/* - Similar puzzels - */}

<div className="similer-puzzelesarea">
    <div className="container">
  <h4>Simiar Puzzles</h4>

  
    <div className="row ">


    {GameData.GameData.map((row, index) =>{
        return(

          <div className="col-md-3" key={index}>
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
        )
      })}
 

    </div>
  </div>

</div>
</section>

<Footer/>
    </div>
  )
}

export default Games