/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         message: []
      };
   }

   componentDidMount = async () => {
      let obj = await fetch("http://localhost:8080/Map/messages").then(r => r.json());
      this.setState({ message: obj.message })

   }

   createTr = (e) => {
      return <tr><td>{e.content}</td><td>{e.lat}</td><td>{e.lon}</td></tr>
   }


   render() {
      let listMessage = this.state.message.map(this.createTr)
      return (
         <div>
            <h1 className="title">List of Messages</h1>
            <div className="main"><table className="table table-sm table-bordered">
               <thead>
                  <tr className="header">
                     <td>Message</td>
                     <td>Lat</td>
                     <td>Lon</td>
                  </tr>
               </thead>
               <tbody>{listMessage}</tbody>
            </table></div>
         </div>
      )
   }
}


