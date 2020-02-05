const { Marker, Popup } = window.ReactLeaflet

class Message extends React.Component {

    delete = (id) => { // funzione che richiama la funzione deleteMessage della classe app.js
        this.props.delete(id)
    }

    createMarker = (mes) => { // funzione che permette di creare un marker con un messaggio per ogni messaggio nello state
        return <Marker key={mes.id} position={[mes.lat, mes.lon]}><Popup><span>{mes.content}</span><span>
            <button type="button" className=" delete border border-light " onClick={()=> this.delete(mes.id)} > <img src='./icons/trash.svg' alt="" width="20" height="20"></img>
            </button></span></Popup></Marker>
    }

    createListMessages = () => { // funzione che crea la lista di messaggi e marker
        if (this.props.message === []) {
            return <div></div>
        } else {
            return this.props.message.map(this.createMarker)
        }
    }

    render() {
        return (
            this.createListMessages()
        )
    }
}