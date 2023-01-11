import React, { useState, useEffect} from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';

function NotFound() {
const [gameData, setGameData] = useState({dataBaser: []});

useEffect(()=>{
  const db = getDatabase();
  const dbRef = (ref(db, 'Games'));
onValue((dbRef), snapshot=>{
  const records = [];
snapshot.forEach(childSnapshot=>{
const data = childSnapshot.val();
records.push(data);
});

setGameData((gameData)=>({gameData, dataBaser: records.splice(0, 3)}));

  });

},[]); 
 
  return (
    <div>


 { gameData.dataBaser.map((row, index)=>{
      return(
        <h1 key={index}>{row.Name}</h1>
      )}
    )}     
      </div>
  )
}

export default NotFound