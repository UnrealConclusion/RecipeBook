/**
 * Page allows user to search for recipies by ingredients 
 */
 import{React, Component} from 'react';
 
 class NotFound extends Component{
     constructor(props){
         super(props)
         this.state = {
             queryString: ""
         }
     }
 
     
     render(){
         return (
            <h1>404 Not Found</h1>
         );
 
     }
 }
 
 export default NotFound;