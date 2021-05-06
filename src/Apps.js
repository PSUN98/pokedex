import React, { Component } from 'react';
import App from './App';

var battle = [];


class Apps extends Component {
    state = {
        player1win: false,
        player2win: false,
        apps: [
            { id: 1 },
            { id: 2 }
        ]
    }



    handleStart = (data) => {
        if (battle.length < 2) {
            battle.push(data.id)
        }
        console.log(battle)



    }

    handleGame = () => {

        if (battle[0] > battle[1]) {
            this.setState({ player1win: true })
        } else {
            this.setState({ player2win: true })
        }
    }





    render() {
        return (
            <div>



                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    //backgroundColor: 'lightGrey'
                }}>

                    {this.state.apps.map(app =>
                        <App key={app.id}
                            app={app}
                            onStart={data => this.handleStart(data)}//tranfer data from child to parent


                        >
                            <h4>Player #{app.id}</h4>

                        </App>
                        //attribute: onStart,app that is set here is passed to component <App/> using a single js object called props
                        //special prop: children is used when we want to pass content in between opening and closing tag of an element 
                    )}
                </div>
                <button className="btn btn-primary m-2" onClick={this.handleGame} >Start Game</button>
                {this.state.player1win && this.state.player2win ? <h1>draw</h1> :
                    this.state.player1win && !this.state.player2win ? <h1>player 1 win</h1> : !this.state.player1win && this.state.player2win ?
                        <h1>player 2 win</h1> : <h1>start game</h1>}






            </div>

        );
    }
}

export default Apps;