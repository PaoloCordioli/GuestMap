const { Map: LeafletMap, TileLayer, Marker, Popup } = window.ReactLeaflet

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         message: "null"
      };
      this.click = this.click.bind();
   }

   UNSAFE_componentWillMount = () => {
      console.log("prima fetch", this.state.message)
      fetch("http://localhost:8080/Map/messages").then(r => r.json()).then(m => this.setState({ message: m.message }));
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
               {console.log("Message", this.state.message)}
               <Message message={this.state.message} />
            </LeafletMap>
         </div>
      )
   }
}


