import React from 'react'
import { Link } from 'react-router-dom'
import {getStorage, ref as ref_storage, uploadBytes, getDownloadURL} from  "firebase/storage";
import { getDatabase, ref as ref_database, set } from 'firebase/database';


function Create() {
const [catagoryImg, setCatagoryImg] = React.useState();
const [catagoryName, setCatagoryName] = React.useState('');
const [catagoryButton, setcatagoryButton] = React.useState(false);

const [gameImg, setGameImg] = React.useState();
const [gameName, setGameName] = React.useState('');
const [gameDescription, setGameDescriptio] = React.useState('');
const [gameButton, setgameButton] = React.useState(false);


const storage = getStorage();
const db = getDatabase();
const Ms = Date.now();
////Submit Catagory
const submit_Catagory = async (e) =>{
    setcatagoryButton(true);
    const storageRef = ref_storage(storage, 'Img/Catagory/'+catagoryImg.name);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, catagoryImg).then((snapshot) => {
      console.log(snapshot);

    getDownloadURL(storageRef).then((url) => {
    set(ref_database(db, 'Catagory/'+Ms), {
    Name: catagoryName,
    Thumbnail: url,
    ID: Ms,
    Game: 0
    },
    setcatagoryButton(false),
    setCatagoryImg(),
    setCatagoryName('')
    );
  console.log(url);
      });
    });
}

const Submit_games = async (e) =>{
setgameButton(true);

const storageRef = ref_storage(storage, 'Img/Game/'+gameImg.name);
uploadBytes(storageRef, gameImg).then(snapshot=>{
getDownloadURL(storageRef).then(url =>{
set(ref_database(db, 'Games/'+Ms), {
Name: gameName,
Description: gameDescription,
Thumbnail: url,
ID: Ms,
Play: 0,
Like: 0
},
setGameImg(),
setgameButton(false),
setGameName(''),
setGameDescriptio('')
);
});
});

}
  return (
    <div className='container'>
        <h2> <Link to={'/'}><i className="bi bi-arrow-left"></i></Link>  Simple Create page</h2>
    <div className="row">
        <div className="col-md-6">
        <p>Create A Category</p>
       
        <span className="form-label">Select Catagory thumbnail</span>
        <input 
        className="form-control form-control-sm" 
        type="file" 
        onChange={(e)=> setCatagoryImg(e.target.files[0])}
        accept="image/*" /><br />
        <input 
        className='form-control'
        type="text"
        value={catagoryName} 
        onChange={(e)=> setCatagoryName(e.target.value)}
        placeholder='Category name' /><br />
        <button className={catagoryButton===true? "btn btn-primary disabled" :catagoryImg!==undefined&& catagoryName!==''? "btn btn-primary" : "btn btn-primary  disabled"} onClick={submit_Catagory}>{catagoryButton!==false? <i className='bi bi-arrow-repeat'>Submited</i>  :  'Submit'}</button>
        </div>

<div className="col-md-6">
    <p>Create A Gmae Post</p>

    <span className="form-label">Select Game thumbnail</span>
        <input 
        className="form-control form-control-sm"
        type="file" 
        onChange={(e)=> setGameImg(e.target.files[0])}
        accept="image/*" /><br />
        <input 
        className='form-control' 
        type="text"
        value={gameName}
        onChange={(e)=> setGameName(e.target.value)}
        placeholder='Game name' /><br />
        <textarea 
        className='form-control'
        value={gameDescription} 
        onChange={e=> setGameDescriptio(e.target.value)}
        cols="30" rows="10" 
        placeholder='Description'></textarea> <br />
        <button className={gameButton===true? 'btn btn-primary disabled' : gameImg!==undefined&&gameName!==''&&gameDescription!=='' ?'btn btn-primary' : 'btn btn-primary disabled' } onClick={Submit_games}>{gameButton===true?<i className='bi bi-arrow-repeat'>Submited</i> : 'Submit'}</button>

</div>

        </div>
    </div>
  )
}

export default Create