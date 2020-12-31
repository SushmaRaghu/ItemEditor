import React ,{useState} from 'react';
import FormPage from './FormPage';

const ItemsList = (props) => {
  const {  rows, callBack, defaultItem,useItem,name } = props;
  const [ formElements, setFormElements] = useState(null);
  const [ selectedItemID, setSelectedItemID]=useState(null);
  const [ currentItem, setCurrentItem] = useState(null);
  
  function callHandleClick(clickedId){
	  
	  
	fetch('../itemEditorSrc.json')
  .then((res) => res.json())
  .then((data) => {
	  data.items.forEach((entry)=>{
    if(clickedId === entry.id){
		setFormElements(entry.fields);
		setCurrentItem(entry);
		setSelectedItemID(entry.id);
		let obj={};
		obj['type']='item';
		obj['id']=entry.id;
		
		callBack(obj);
	}
	  });
  }).catch(err=>{
  console.log(err)
})

  }
  
  function buildRow(row) {
    return (
         <tr onClick={()=>callHandleClick(row.id)} key={row.id}>
               <td style={{width:'50%',height:'50px',border:'1px solid black'}} key={row.id}>{row.name}</td>
           
         </tr>
     )
  };

  return(
  <div>
  <div style={{float:'left'}}>
    <table style={{borderCollapse:'separate',borderSpacing:'0 0em', border:'1px solid black'}}>
	<tbody>
                {  rows && rows.map((value) => {
              return buildRow(value);
          })}
		  </tbody>
    </table>
	</div>
	<div style={{width:'50%',marginLeft:'500px'}}> 
	<FormPage selectedItem={selectedItemID} formElements={formElements} name={name} callBack={callBack} defaultItem={defaultItem} useItem={useItem}/>
	</div>
	</div>
  );
}

export default ItemsList;