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
  }
  
  handleChange = event => {
    this.setState({
      filter: event.target.value,
      rows: event.target.value === "" ? null : this.state.rows,
    });
  } 

  handleFavourite(item){
    const { data, rows } = this.state;
    
    let iD = data.findIndex(obj => obj.title === item.title);
    let iR = rows.findIndex(obj => obj.title === item.title);

    this.setState(prevState => ({
      data: iR >= 0 
        ? [
        ...prevState.data.slice(0,iD),
        {
            ...data[iD],
            fav: !item.fav,
        },
        ...prevState.data.slice(iD+1),
      ]
      : this.state.data,
      rows: iR >= 0 
        ? [
          ...prevState.rows.slice(0,iR),
          {
              ...rows[iR],
              fav: !item.fav,
          },
          ...prevState.rows.slice(iR+1),
        ] 
        : this.state.rows,
    }));
  }

  handleEnter(event){
    if(event.key === 'Enter') {
      console.log(event.key);
      return(this.handleSearch);
    }
  }

  handleSearch = () => {
    console.log("search");
    this.setState({
      display: this.state.filter,
      rows: this.state.filter === "" 
        ? null 
        : this.state.data.filter(item => item.keywords.search(this.state.filter) >= 0 || item.category.search(this.state.filter) >= 0),
    });
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  renderRows(list){
    return(
      list.map((row, index) => (
        <TableRow className='Table_Row' key={index}>
           <TableCell>
            <IconButton onClick={()=> {console.log(row.title); this.handleFavourite(row)}}>
            {row.fav ? greenStar : grayStar}
            </IconButton>
          </TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell>
            <div dangerouslySetInnerHTML= {{__html: this.htmlDecode(row.body)}}/>
          </TableCell>
        </TableRow>
      ))
    )
  }

  render() {
    let favs = this.state.data.filter(item => item.fav === true);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Toronto Waste Lookup
          </p>
        </header>
        <div style= {{margin:30, 'flexDirection': 'column'}}>
          <div className="Row">            
            <TextField id="searchField" type="text" onChange={this.handleChange} onKeyPress ={this.handleEnter} variant="outlined" />
            <Button id="search" variant="contained" onClick = {this.handleSearch} style={{marginLeft: 20}}>
              {searchIcon}
            </Button>
          </div>
          <Table className='Table'>
            <TableBody >
              {this.state.rows && 
                this.renderRows(this.state.rows)}
            </TableBody>
          </Table>
          {favs.length > 0 ? <div style={{backgroundColor: '#f7fefa', alignItems: 'flex-start', justifyContent: 'flex-start', color : '#23995c'}}>
            Favourites
            <Table>
              <TableBody >
                { this.renderRows(favs) }
              </TableBody>
            </Table>
          </div>
          : null }          
        </div>
      </div>
    );
  }
}

export default App;
