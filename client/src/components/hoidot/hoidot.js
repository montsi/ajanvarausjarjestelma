import React, { Component } from 'react';

class Hoidot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoidot: []
    }
    this.onChange = this.handleChange.bind(this);  
  }
 
  componentDidMount() {
    fetch('/api/hoidot')
      .then(res => res.json())
      .then(hoidot => this.setState({hoidot}, () => console.log('Hoidot haettu..', hoidot)));
  }
 
  handleChange=(e)=>{ /* Aina selectia vaihtaesssa tapahtuu */
    e.preventDefault();
    const hoito = this.selectVal.value.slice(5);
    const kesto = this.selectVal.value[0]+this.selectVal.value[1]; 
    const hoitoID = this.selectVal.value[3];
    /* Hoidon mukaan haetaan mahd. tyontekijat */
   
    fetch('/api/tyontekijat',{  
      method: 'POST',
      body: JSON.stringify({ 
      hoito: hoito
        }),
      headers: {"Content-Type": "application/json"}
    })             
    .then(res => res.json())
    .then(tyontekijat => this.props.HoitoTyontekijat(tyontekijat,hoito,kesto,hoitoID));    /* Hoito, hoitoID, hoidon kesto ja mahd. tyontekijat siirretään app.js propseihin */                            
  }
    
  render() {
    return (
      <div className="container-fluid">
        <h2>Valitse hoito</h2>
        <div className="input-group" onChange={this.handleChange}>
          <select className="custom-select form-control" ref={(input) => this.selectVal = input}>
            <option defaultValue>Valitse hoito...</option>
              {this.state.hoidot.map(hoito =>
                <option key={hoito.hoitoID} value={[hoito.hoidon_kesto,hoito.hoitoID,hoito.hoidon_nimi]} >  {hoito.hoidon_nimi} - {hoito.hoidon_kuvaus} - {hoito.hoidon_kesto} min </option>
              )}
          </select>
        </div>  
      </div>
    );
  } 
}
export default Hoidot;



