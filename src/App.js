import React, { Component } from 'react';
import './App.css';
import { Button, IconButton, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import wasteData from './data.json';

const greenStar = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill = "green">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const grayStar = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill = "gray">
  < path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const searchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill = "white">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

class App extends Component {
  state = {
    data: wasteData.map(item => {
      item.fav = false;
      return item;
    }),
    filter: "",
    display: "",
    rows: null,
    favourites: wasteData.filter(item => item.keywords.search("bread bag") >= 0),
  }
  
  handleChange = event => {
    this.setState({
      filter: event.target.value,
      rows: event.target.value === "" ? null : this.state.rows,
    });
  } 

  handleFavourite(obj){
    const { data, rows } = this.state;
    let iD = data.findIndex((item) => item.title === obj.title);
    let iR = rows.findIndex((item) => item.title === obj.title);
    console.log(iR);
    
    this.setState(prevState => ({
      data: [
        ...prevState.data.slice(0,iD),
        {
            ...data[iD],
            fav: !obj.fav,
        },
        ...prevState.data.slice(iD+1),
      ],
      rows: iR >= 0 ? [
        ...prevState.rows.slice(0,iR),
        {
            ...rows[iR],
            fav: !obj.fav,
        },
        ...prevState.rows.slice(iR+1),
      ] 
      :this.state.rows,
    }));

  //  console.log(data);
    console.log(rows[0].title);
  }

  handleSearch = () => {
    this.setState({
      display: this.state.filter,
      rows: this.state.filter === "" 
        ? null 
        : this.state.data.filter(item => item.keywords.search(this.state.filter) >= 0 || item.category.search(this.state.filter) >= 0),
    });
    
    console.log(this.state.rows);
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {
    let renderFavs = this.state.data.map((row, index) => (
      row.fav ?(
      <TableRow className='Table_Row' key={index}>
        <IconButton onClick={()=> {console.log(row.title); this.handleFavourite(row)}}>
        {row.fav ? greenStar : grayStar}
      </IconButton>
        <TableCell>{row.title}</TableCell>
        <TableCell>
          <div dangerouslySetInnerHTML= {{__html: this.htmlDecode(row.body)}}/>
        </TableCell>
      </TableRow>)
      : null
    ))

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Toronto Waste Lookup
          </p>
        </header>
        <div style= {{margin:30, 'flexDirection': 'column'}}>
          <div className="Row">            
            <TextField id="searchField" type="text" onChange={this.handleChange} variant="outlined" />
            <Button id="search" variant="contained" onClick = {this.handleSearch} style={{marginLeft: 20}}>
              {searchIcon}
            </Button>
          </div>
          <Table className='Table'>
            <TableBody >
              {this.state.rows && 
                this.state.rows.map((row, index) => (
                  <TableRow className='Table_Row' key={index}>
                    <IconButton onClick={()=> {console.log(row.title); this.handleFavourite(row)}}>
                      {row.fav ? greenStar : grayStar}
                    </IconButton>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      <div dangerouslySetInnerHTML= {{__html: this.htmlDecode(row.body)}}/>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div style={{'backgroundColor': '#f7fefa', 'alignItems': 'flex-start', 'justifyContent': 'flex-start','color' : '#23995c'}}>
            Favourites
            <Table>
              <TableBody >
                { this.state.favourites &&  renderFavs }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
