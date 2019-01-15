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
            <TableBody>
              {this.state.rows.map((row, index) => (
                <TableRow className='Table_Row' key={index}>
                  <TableCell>{row.body}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
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
