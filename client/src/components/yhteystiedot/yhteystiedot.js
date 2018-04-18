import React, { Component } from 'react';

class Yhteystiedot extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {isHidden: true}
  		this.handleSubmit = this.handleSubmit.bind(this);
  	}
    
	handleSubmit(event) {
		event.preventDefault();
		const Data = new FormData(event.target);
		fetch('/api/varaus',{
		method: 'POST',
		body: Data}) 
		this.setState({
			isHidden: !this.state.isHidden
    	})     
  	}
    
  	render() {
    	return(

		<div className="container-fluid">    
			{!this.state.isHidden && <div className="container"><h1>Aika varattu onnistuneesti. Tervetuloa!</h1></div>} 
			{this.state.isHidden && <div className="container">
				<div className="formBox">
					<form onSubmit={this.handleSubmit}>
							<div className="row">
								<div className="col-sm-12">
									<h1>Täytä tiedot</h1> 
								</div>
							</div>

							<div className="row">
								<div className="col-sm-6">
									<div className="inputBox ">
										<input type="text" name="nimi" id="nimi" placeholder="Nimi" className="input" required/>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-6">
									<div className="inputBox">
										<input type="text" name="sahkoposti" id="sahkoposti" placeholder="Sähköposti" className="input" required/>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="inputBox">
										<input type="text" name="puhelinnumero" id="puhelinnumero" placeholder="Puhelinnumero" className="input" required/>
									</div>
								</div>
							</div>

							<input type="hidden" name="tyontekijaID" value={this.props.tyontekijaID}/>
							<input type="hidden" name="hoitoID" value={this.props.hoitoID} />
                            <input type="hidden" name="aika" value={this.props.aika} />
                            
							<div className="row">
								<p className="p">Työntekijä: {this.props.tyontekija} - Hoito: {this.props.hoito} - Varaus päivälle: {this.props.aika}</p> 
								<div className="col-sm-12">
								<input type="submit" className="button" value="Varaa aika"/>
								</div>
							</div>
					</form>
					{this.state.isHidden &&<button className="btn btn-basic" id="takaisin" onClick={this.props.toggleHidden}>Takaisin</button>} 
				</div>
			</div>}
		</div>
	)}
}

export default Yhteystiedot;
