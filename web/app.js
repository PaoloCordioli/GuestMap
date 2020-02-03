const { Map: LeafletMap, TileLayer, Marker, Popup } = window.ReactLeaflet

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         message: []
      };
   }

   componentDidMount33 = async () => {
      let obj = await fetch("http://localhost:8080/Map/messages").then(r => r.json());
      this.setState({ message: obj.message })
      console.log(this.state.message)
   }

   click = (e) => {
      console.log(e.latlng.lat + " " + e.latlng.lng)
   }

   render() {
      const position = [45.51, 10.2]

      return (
         <div className="map">
            <LeafletMap center={position} zoom={5} onClick={this.click}>
               <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={position}>
                  <Popup>
                     <span>
                        A pretty CSS3 popup. <br /> Easily customizable.
              </span>
                  </Popup>
               </Marker>
            </LeafletMap>
         </div>
      )
   }
}


