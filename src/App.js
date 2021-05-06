//import logo from './logo.svg';
//import './App.css';
import React, { Component } from 'react';



class App extends Component {
  //constructor(props) {
  //  super(props);
  //  this.state = {
  //    default: true,
  //    loading: true,
  //    pokemon: null,
  //    url: 'https://pokeapi.co/api/v2/',
  //    type: 'pokemon',
  //    name: '',
  //    exist: true
  //  };
  //}

  state = {
    default: true,
    loading: true,
    pokemon: this.props.pokemon,//rename this to this.props.pokemon
    url: 'https://pokeapi.co/api/v2/',
    type: 'pokemon',
    name: '',
    exist: true

  }



  async fetchData() {//fetch api
    let pokemonName = this.state.name;

    if (this.state.default === true || this.state.name === '') {
      pokemonName = 'pikachu';
    }



    const apiUrl = this.state.url + this.state.type + '/' + pokemonName;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({
        exist: true,
        pokemon: data,//this.state.pokemon consist of the entire json data object
        loading: false,
        name: data.name//extract name from data oject
      });
    }
    catch (e) {
      this.setState({

        loading: false,
        exist: false
      });
      //console.log(this.state.exist);

    }
    //const response = await fetch(apiUrl);

    //console.log(data.abilities[0].ability.name);
    //console.log(data.abilities.length);
    //console.log(data.sprites.front_default);


  }



  async componentDidMount() {//run once automatically when app is mounted
    this.fetchData()
  }

  listAbilities = () => {//form an array of pokemon's abilities
    let abilities = [];
    var i;
    for (i = 0; i < this.state.pokemon.abilities.length; i++) {
      abilities.push(this.state.pokemon.abilities[i].ability.name);
    }
    return abilities;
  }

  listTypes = () => {//form an array of pokemon's types
    let types = [];
    var i;
    for (i = 0; i < this.state.pokemon.types.length; i++) {
      types.push(this.state.pokemon.types[i].type.name);
    }
    return types;
  }



  handleChange(event) {
    //While user input in text, set this.state.default as false and set this.state.name as user input
    //user input can also be pokemon id as text form/ string. 
    //'id' will be concat to url during fetchData() onSubmit
    //and this.state.name will be subsequently replaced by actual pokemon name from json data object
    this.setState({
      default: false,
      name: event.target.value.toLowerCase()//conver user input to lower case
    });
    console.log(this.state.name);
  }

  async handleSubmit(event) {//When user press submit button, run events in fetchData
    event.preventDefault();//prevent refreshing of console onSubmit
    console.log(this.state.name);

    this.fetchData();

  }

  async handleRandom(event) {
    let num;
    num = Math.floor((Math.random() * 898) + 1);//generate random number between 1 to 898
    //console.log(num.toString());
    this.setState({
      default: false,
      name: num.toString()//convert random number to string
    });
    console.log(this.state.name);
    this.fetchData()


  }

  handleBattle = () => {
    let pokemonData = this.state.pokemon;
    this.props.onStart(pokemonData);//tranfer data from child to parent


  }




  render() {
    console.log(this.props)


    return (
      //render this.props.children

      <div className="App">

        {this.props.children}

        <h1>Enter Pokemon</h1>


        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Pokemon:
          <input type="text" onChange={event => this.handleChange(event)} />
          </label>
          <input className="btn btn-sm btn-primary m-2" type="submit" value="Submit" />
          <button className="btn btn-sm btn-primary m-2" onClick={this.handleRandom.bind(this)}>Random</button>
        </form>


        {
          this.state.loading || !this.state.pokemon ?
            <div>loading...</div> :

            this.state.exist === false ?
              <div style={{ color: 'red' }}>ERROR: the pokemon you entered does not exist!</div> :

              <div>
                <h2 className="name">{this.state.pokemon.name}</h2>

                <img src={this.state.pokemon.sprites.front_default} alt={this.state.pokemon.name} />

                <div className="details">
                  <div>Height: {this.state.pokemon.height} </div>
                  <div>Weight: {this.state.pokemon.weight} </div>
                  <div>Abilities: {this.listAbilities().map(ability => <li key={ability}>{ability}</li>)}</div>
                  <div>Types: {this.listTypes().map(type => <li key={type}>{type}</li>)}</div>
                </div>

              </div>

        }

        <button className="btn btn-primary m-2" onClick={this.handleBattle.bind(this)}>Enter battle</button>

      </div>
    );
  }


}


export default App;


