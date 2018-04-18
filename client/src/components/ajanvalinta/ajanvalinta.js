import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/fi'; 
import 'react-datepicker/dist/react-datepicker.css';
moment.locale('fi');

class Varaukset extends Component {
  constructor() {
    super();
    this.state = {
      startDate:moment()
    }
    this.handleChange = this.handleChange.bind(this);
  }

 handleChange(date) {
    this.setState({
      startDate: date
    });
     
    console.log(date);
    this.props.VarattavaAika(date.format("dddd, MMMM Do YYYY, HH:mm"));
  } 

  render() {
    const moment = require('moment');
    //const thisWeek = moment().isoWeek();

    return (
      <div className="container-fluid">
        <h2>Valitse aika</h2>
        <DatePicker
          inline
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={this.props.kesto}
          dateFormat="DD/MM/YYYY"
          timeCaption="Aika"
          minTime={moment().hours(8).minutes(0)}
          maxTime={moment().hours(17).minutes(0)}
          minDate={moment()}
          maxDate={moment().add(14, "days")}  
          showWeekNumbers
        />
      </div> 
    );
  }
}

export default Varaukset;





// YKSI AIKAISEMMISTA VERSIOISTA
/*  
  import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const moment = require('moment');
const thisWeek = moment().isoWeek();

class Varaukset extends Component {
  constructor() {
    super();
    this.state = {
      //varaukset: [],
      viikko: thisWeek
    }
  }

 
  componentDidMount() {
    fetch('/api/varaukset')
      .then(res => res.json())
      .then(varaukset => this.setState({varaukset}, () => console.log('Varaukset haettu..', varaukset)));
  } 


 previousWeekUpdate() {
  this.setState({
    viikko: this.state.viikko - 1
  });  
}

nextWeekUpdate() {
  this.setState({
    viikko: this.state.viikko + 1
  });    
}
render() {
  const maa = moment().day(1).week(this.state.viikko);
  const ma = moment(maa).format('ll');
  const tii = moment().day(2).week(this.state.viikko);
  const ti = moment(tii).format('ll');
  const kes = moment().day(3).week(this.state.viikko);
  const ke = moment(kes).format('ll');
  const tor = moment().day(4).week(this.state.viikko);
  const to = moment(tor).format('ll');
  const per = moment().day(5).week(this.state.viikko);
  const pe = moment(per).format('ll');

  const data = [{
    yy: '8:00',
    kaa: '8:00',
    koo: '8:00',
    nee: '8:00',
    vii: '8:00',}]
  
  const columns = [{
    Header: props =><span>{ma}</span>,
    accessor: 'yy'}, {
    Header: props =><span>{ti}</span>,
    accessor: 'kaa'}, {
    Header: props =><span>{ke}</span>,
    accessor: 'koo'}, {
    Header: props =><span>{to}</span>,
    accessor: 'nee'}, {
    Header: props =><span>{pe}</span>,
    accessor: 'vii'}]  
  
  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        console.log('A Td Element was clicked!')
        console.log('it produced this event:', e)
        console.log('It was in this column:', column)
        console.log('It was in this row:', rowInfo)
        console.log('It was in this table instance:', instance)
      }
    }
  }

  return (
    <div>
      <h2>Valitse aika</h2>
      <hr></hr>
      <button type="button" onClick={this.previousWeekUpdate.bind(this)} className="btn btn-primary btn-sm">Edellinen</button> Viikko {this.state.viikko} <button type="button" onClick={this.nextWeekUpdate.bind(this)} className="btn btn-primary btn-sm">Seuraava </button> 
      <br></br>        

      <ReactTable
        data={data}
        columns={columns}
        getTdProps={onRowClick}
        defaultPageSize={1}
        minRows={10}
        showPaginationBottom={false}
        showPageSizeOptions={false}
      />

    </div>
  );
}
}

export default Varaukset;
  */

  
/*
  class TestApp extends React.Component {
   getComponent(e, index) {
       $(e.target).css({
           'background-color': '#ccc'
       });
   }
   render() {
       return (
           <div>
             <ul>
               <li onClick={(e) => this.getComponent(e, 1)}>Component 1</li>
               <li onClick={(e) => this.getComponent(e, 2)}>Component 2</li>
               <li onClick={(e) => this.getComponent(e, 3)}>Component 3</li>
             </ul>
           </div>
       );
   }
});
  */