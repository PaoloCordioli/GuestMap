const { Map: LeafletMap, TileLayer, Marker, Popup } = window.ReactLeaflet

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         message: [],
         id: 0
      };
      this.createMessage = this.createMessage.bind(this);
   }

   UNSAFE_componentWillMount = async () => {
      let obj = await fetch("http://localhost:8080/Map/messages").then(r => r.json());
      await this.setState({ message: obj.message });
      let lenght = this.state.message[this.state.message.length - 1].id
      this.setState({ id: lenght })
   }

   createMessage = (e) => {
      this.setState({ id: this.state.id + 1 })

      let newMessage = {
         id : this.state.id,
         content : "Spagna" ,
         lat : e.latlng.lat,
         lon: e.latlng.lng
      };

      this.setState((prevState) => {
         return { message : prevState.message.concat(newMessage) };
      });

      fetch("http://localhost:8080/Map/messages", {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newMessage)
      }).then((res) => res.json())
   }


   render() {
      const position = [45.51, 10.2]
      return (
         <div className="map">
            <LeafletMap center={position} zoom={5} onClick={this.createMessage}>
               <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Message message={this.state.message} />
            </LeafletMap>
         </div>
      )
   }
}


