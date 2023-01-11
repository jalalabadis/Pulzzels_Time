import React, { Component } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database';
const db = getDatabase();
export class CatagoryOption extends Component {
    constructor(){
        super();
        this.state = {
            CatagoryData: []
        }}
        componentDidMount(){
        const dbRef = (ref(db, 'Catagory'));
        onValue((dbRef), snapShot=>{
        const records = [];
snapShot.forEach(childSnapshot=>{
    const data = childSnapshot.val();
records.push(data);
});
this.setState({CatagoryData:records});
});
        }
  render() {
    return (
    
this.state.CatagoryData.map((row, index)=>{
return(
   
        <option value={row.Name} key={index}>{row.Name}</option>
    
)
        })
        
    )
  }
}

export default CatagoryOption