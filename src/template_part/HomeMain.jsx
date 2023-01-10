import React, { Component } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database';


const db = getDatabase();
export class HomeMain extends Component {
  constructor(){
    super()
    this.state = {
      CatagoryDatas: [],
      GamesDataRendom: [],
      GameDataPopular: [],
      GamesDataselect: []
    }
  }
// Catagory Data lod on Database
    componentDidMount(){
    const dbCatagoryRef = (ref(db, 'Catagory'));
    onValue((dbCatagoryRef), snapshot =>{
      const records = [];
    snapshot.forEach(childSnapshot=>{
    const key = childSnapshot.key;
    const data = childSnapshot.val();
    records.push({"key": key, "data": data});
    });

  const Catagorys_data = [];
  records.map(row=>(
  Catagorys_data.push(row.data)
    ));
  Catagorys_data.sort((a,b)=> a.ID - b.ID);
  this.setState({CatagoryDatas: Catagorys_data.splice(0, 6)});
    });

// Games Data lod  Databse
const dbGameRef = (ref(db, 'Games'));
onValue((dbGameRef), snapshot=>{
const records = [];
snapshot.forEach(childSnapshot=>{
const key = childSnapshot.key;
const data = childSnapshot.val();
records.push({"key": key, "data": data});
});
const Gamedata_rendom = [];
const Gamedata_popular = [];
records.map((row)=>{
  return(
Gamedata_rendom.push(row.data),
Gamedata_popular.push(row.data)
  )
});
Gamedata_rendom.sort(function (a, b) {return Math.random() - 0.5;});
this.setState({GamesDataRendom: Gamedata_rendom.splice(0, 1)});
this.setState({GamesDataselect: Gamedata_rendom.splice(0, 3)});

Gamedata_popular.sort((a,b)=>b.Like-a.Like);
this.setState({GameDataPopular: Gamedata_popular.splice(0, 6)});
});};
  render() {
    return (
      <main className="col-lg-9">
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

{this.state.GamesDataRendom.map((row, index)=>{
return(
<div className="col-lg-6" key={index}>
<div className="card">
<div className="card-hader-lister">
<div className="rendom_card_title">Random JS Puzzle</div>
<button className="play-button-plopp2">PLAY</button>
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

{this.state.GameDataPopular.map((row, index)=>{
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
    <button className="play-button-plopp">PLAY</button>
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

{this.state.GamesDataselect.map((row, index)=>{
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
        <button className="play-button-plopp">PLAY</button>
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
{this.state.CatagoryDatas.map((row, index)=>{
return(
  <div className="col-md-4" key={index}>
<div className="card">
<div className="card-hader-catgoryesds">
<i className="bi bi-grid-1x2-fill"></i>    <p>{row.Name}</p>
</div>
<img className="card-img2" src={row.Thumbnail} alt="succulent"/>
</div>
</div>
)
})}

</div>
</div>
</section>
  </main>
    )
  }
}

export default HomeMain

