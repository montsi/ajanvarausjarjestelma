import React, { Component } from 'react';
import './App.css';
import Yhteystiedot from './components/yhteystiedot/yhteystiedot';
import Hoidot from './components/hoidot/hoidot';
import Tyontekijat from './components/tyontekijat/tyontekijat';
import Ajanvalinta from './components/ajanvalinta/ajanvalinta';

/* Kaikki tarpeellinen tieto komponenttien välillä säilötään tänne */  
class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        isHidden: true,
        tyontekijat: [],
        hoito: '',
        tyontekija: '',
        kesto:30,
        hoitoID: '',
        aika:'',
        tyontekijaID:''
    } 
  }
    
  onTyontekijat(tyontekijat,hoito,kesto,hoitoID){  /* Ottaa vastaan hoito komponentilta tulevat tiedot */  
    console.log(tyontekijat,hoito,kesto,hoitoID);
    this.setState({tyontekijat:tyontekijat, hoito:hoito , kesto:kesto, hoitoID:hoitoID})}
  
  onTyontekija(nimi,tyontekijaID){this.setState({tyontekija:nimi,tyontekijaID:tyontekijaID})}   /* Ottaa vastaan tyontekija komponentilta valitun työntekijän */  
    
  onAika(date) {this.setState({aika:date}) }  /* Ottaa vastaan varaukset komponentilta valitun ajan */  
    
  toggleHidden () { /* Komponenttien näkyvyydet */  
    const hoito = this.state.hoito;
    const tyontekija = this.state.tyontekija;
    const aika = this.state.aika;
         
    if (hoito !== ''&&tyontekija !==''&&aika !==''){
      this.setState({
        isHidden: !this.state.isHidden
      })
    }
    else {alert("Valitse hoito, työntekijä ja aika!")}
  }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ajanvaraus</h1>
        </header>
        <div className="container">
          {this.state.isHidden && <Hoidot HoitoTyontekijat={this.onTyontekijat.bind(this)}/>}
          <br/>
          {this.state.isHidden && <Tyontekijat tyontekijat={this.state.tyontekijat} TyontekijaNimi={this.onTyontekija.bind(this)}/>}
          <br/>
          {this.state.isHidden && <Ajanvalinta kesto={this.state.kesto} VarattavaAika={this.onAika.bind(this)}/> }
          <br/> 
          {this.state.isHidden &&<button className="btn btn-primary" onClick={this.toggleHidden.bind(this)} >Jatka varaukseen</button>}
          {!this.state.isHidden && <Yhteystiedot tyontekija={this.state.tyontekija} hoito={this.state.hoito} aika={this.state.aika}
                    hoitoID={this.state.hoitoID} tyontekijaID={this.state.tyontekijaID} toggleHidden={this.toggleHidden.bind(this)}/>} 
        </div>
      </div>
    );
  }
}

export default App;
