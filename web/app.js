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
      
      var mymap = L.map('root').setView([51.505, -0.09], 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: 'mapbox/streets-v11',
         accessToken: 'pk.eyJ1IjoibGFjYXJwYSIsImEiOiJjazYwcDlsdGowOW85M2Zwa3hvY2pqYTdqIn0.gH_BOcRoYaTB1Y5CHERLpw'
      }).addTo(mymap);
   }


   render() {
      return (
         <div className="map"></div>
      )
   }
}


