class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         message: [],
      };
   }

   componentDidMount = async () => {
      let obj = await fetch("http://localhost:8080/Map/messages").then(r => r.json());
      this.setState({ message: obj.message })

      let myMap = L.map('root').setView([41.53, 12.30], 5)

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: 'mapbox/streets-v11',
         accessToken: 'pk.eyJ1IjoibGFjYXJwYSIsImEiOiJjazYwcDlsdGowOW85M2Zwa3hvY2pqYTdqIn0.gH_BOcRoYaTB1Y5CHERLpw'
      }).addTo(myMap);


      this.state.message.forEach(mes => {
         let marker = L.marker([mes.lat, mes.lon]).addTo(myMap)
         marker.bindPopup(mes.content)
      })


      myMap.on('click',(e) =>{
         let marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(myMap)
         marker.bindPopup("ssa").openPopup();
         });
   }

   render() {
      return (
         <div className="map">
         </div>
      )
   }
}


