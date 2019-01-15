import React, { Component } from 'react';
import './App.css';
import { Button, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import data from './data.json';

class App extends Component {
  state = {
    filter: "",
    display: "",
    rows: data,
  }
  

  handleChange = event => {
    this.setState({
      filter: event.target.value,
    });
  } 

  handleSearch = () => {
    console.log(data[0].keywords);
    this.setState({
      display: this.state.filter,
    });
  }

  rowData = 
    <ul> <li>This item is&nbsp;<a href="https://www.toronto.ca/services-payments/recycling-organics-garbage/household-hazardous-waste/" target="_self">Household Hazardous Waste (HHW)</a>&nbsp;and MUST NOT be placed in your Garbage Bin, Blue Bin, Green Bin or put down the drain/toilet/sewer.</li> <li>Please take this item to one of the City&#x27;s&nbsp;<a href="http://www.toronto.ca/garbage/depots.htm" target="_blank" rel="noopener">Drop-Off Depots</a>&nbsp;or&nbsp;<a href="http://www.toronto.ca/environment_days/index.htm" target="_blank" rel="noopener">Community Environment Days</a>.</li> <li>For HHW between 10 to 50 litres/kilograms, residents can also request a free Toxic Taxi pick-up&nbsp;<a href="https://secure.toronto.ca/webwizard/html/household_hazardous_waste.htm">online</a>&nbsp;or by calling 311. Residents can also check the&nbsp;<a href="http://www.makethedrop.ca." target="_blank" rel="noopener">Orange Drop Program</a>.</li> </ul>   

    htmlDecode(input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
   

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Toronto Waste Lookup
          </p>
        </header>
        <div style= {{margin:30}}>
          <div className="Row">            
            <TextField id="searchField" type="text" onChange={this.handleChange} variant="outlined" />
            <Button id="search" variant="contained" onClick = {this.handleSearch} style={{marginLeft: 20}}>
              HMm
            </Button>
          </div>
          <p>{this.state.display}</p>
          <Table className='Table'>
            <TableBody >
              {this.state.rows.map((row, index) => (
                <TableRow className='Table_Row' key={index}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    <div dangerouslySetInnerHTML= {{__html: this.htmlDecode(row.body)}}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
