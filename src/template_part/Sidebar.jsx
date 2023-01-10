import React from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Link } from 'react-router-dom'

const db = getDatabase();
class Sidebar extends React.Component {
    constructor(){
        super();
        this.state = {
            catagoryData: []
        }}
componentDidMount(){
const dbRef = (ref(db, 'Catagory'));

onValue((dbRef), snapshot=>{
const records = [];
snapshot.forEach(childSnapshot=>{
const key = childSnapshot.key;
const data = childSnapshot.val();
records.push({"key": key, "data": data})
});
const Catagory_data = [];
records.map(row=>(
Catagory_data.push(row.data)
));
//Catagory_data.sort((a,b)=> a.Name-b.Name);
this.setState({catagoryData: Catagory_data});
});
};
render(){
  return (
    <aside className="col-lg-3"> 
    
    <nav className="sidebar card py-2 mb-4">
    <ul className="nav flex-column" id="nav_accordion">
        <li className="nav-item">
            <div className="search_backgrounds">
                <img src="assest/img/search_ico.svg" alt=""/>    <input type="text" placeholder="Search..."/>
                </div>
        </li>
        <br/>
        <li className="nav-item has-submenu">
            <Link className="nav-link" to={''}><i className="bi bi-star-fill"></i> 
            <span className="sidebar-sec-rop"> Rating</span> 
            <i className="bi bi-chevron-down"></i>
         </Link>
            <ul className="submenu  collapse show">
                <li><Link className="nav-link" to={''}>Newest Puzzles</Link></li>
                <li><Link className="nav-link" to={''}>Oldest Puzzles </Link></li>
                <li><Link className="nav-link" to={''}>Photos Highest Raiting </Link> </li>
                <li><Link className="nav-link" to={''}>Most People Raited </Link></li>
                <li><Link className="nav-link" to={''}>Least People Raited </Link></li>
                <li><Link className="nav-link" to={''}>Solved Most Times </Link> </li>
            </ul>
        </li>
        <li className="nav-item has-submenu">
            <Link className="nav-link" to={''}>
                <i className="bi bi-grid-1x2-fill"></i> 
         <span className="sidebar-sec-rop"> Category</span> 
         <i className="bi bi-chevron-down"></i> </Link>
         {this.state.catagoryData.map((row, index)=>{
            return(
                <ul className="submenu collapse show" key={index}>
                <li><Link className="nav-link" to={''}>{row.Name}</Link></li>
                
            </ul>
            )

         })}
            
        </li>
    </ul>
    </nav>
    
            </aside>
)}
}

export default Sidebar