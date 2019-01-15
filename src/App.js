import React, { Component } from 'react';
import './App.css';
import { Button, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import data from './data.json';

class App extends Component {
  state = {
    filter: "",
    display: "",
    rows: null,
    favourites: data.filter(item => item.keywords.search("bread bag") >= 0),
  }
  
  handleChange = event => {
    this.setState({
      filter: event.target.value,
      rows: event.target.value == "" ? null : this.state.rows,
    });
  } 

  handleSearch = () => {
    console.log(data[0].keywords);
    this.setState({
      display: this.state.filter,
      rows: this.state.filter == "" 
        ? null 
        : data.filter(item => item.keywords.search(this.state.filter) >= 0 || item.category.search(this.state.filter) >= 0),
    });
  }

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
        <div style= {{margin:30, 'flex-direction': 'column'}}>
          <div className="Row">            
            <TextField id="searchField" type="text" onChange={this.handleChange} variant="outlined" />
            <Button id="search" variant="contained" onClick = {this.handleSearch} style={{marginLeft: 20}}>
              HMm
            </Button>
          </div>
          <Table className='Table'>
            <TableBody >
              {this.state.rows && 
                this.state.rows.map((row, index) => (
                  <TableRow className='Table_Row' key={index}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      <div dangerouslySetInnerHTML= {{__html: this.htmlDecode(row.body)}}/>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div style={{'background-color': '#f7fefa', 'align-items': 'flex-start', 'justify-content': 'flex-start','color' : '#23995c'}}>
            <p>Favourites</p>
              
            <Table>
              <TableBody >
                {this.state.favourites && 
                  this.state.favourites.map((row, index) => (
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
      </div>
    );
  }
}

export default App;
