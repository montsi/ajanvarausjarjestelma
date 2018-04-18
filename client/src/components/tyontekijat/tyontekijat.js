import React, { Component } from 'react';

class Tyontekijat extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.handleChange.bind(this);  
  }

  handleChange=(e)=>{ /* Valitun tyontekijan mukaan haetaan ajat tietokannasta */                        
    const tyontekijaID = this.selectVal.value[0];
    const nimi = this.selectVal.value.slice(2);
      
    this.props.TyontekijaNimi(nimi,tyontekijaID);             
  }  

  render() {
    return (
      <div className="container-fluid">
        <h2>Valitse työntekijä</h2>
          <div className="input-group" onChange={this.handleChange}>
            <select className="custom-select form-control" ref={(input) => this.selectVal = input}>
              <option defaultValue>Valitse työntekijä...</option>
              {this.props.tyontekijat.map(Tyontekija =>
              <option key={Tyontekija.tyontekijaID} value={[Tyontekija.tyontekijaID,Tyontekija.nimi]}>  {Tyontekija.nimi} </option>
              )}
            </select>
          </div>
      </div>
    );
  }
} 

export default Tyontekijat;