import React from 'react'

function Footer(props) {
  //object or props  destructuring 
  const {handleToggleModal,data} = props

     return (
       <footer>
         <div className="bgGradient"></div>

         <div>
           <h1>APOD PROJECT</h1>
           <h2>{data.title}</h2>
           
         </div>
         <button onClick={handleToggleModal}>
           <i className="fa-solid fa-circle-info"></i>
         </button>
       </footer>
     );
}  
 

export default Footer


