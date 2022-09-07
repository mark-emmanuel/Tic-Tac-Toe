// All the imports needed for react to work
import React from 'react';
import ReactDOM from 'react-dom/client';
// This makes the layout work by importing the CSS file
import './index.css';

// class Square extends React.Component {
//     render() { // render() method displays things onto the screen
//         return (
//             //This makes the buttons clickable and prints a "click" in the console
//             <button
//                 className="square"
//                 //This sets a click as a X on the grid
//                 onClick={() => this.props.onClick()} >
//                 {this.props.value} {/*This fills in each sqaure with a value */}
//             </button>
//         );
//     }
// }

// function components are much shorter and less tedious to write instead of classes
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        ); //This passes values from parent to child class "square"
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                {/*This is the top row of the grid*/}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                {/*This is the middle row of the grid*/}
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                {/*This is the bottom row of the grid*/}
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        // These are all the winning combinations on the grid
        [0, 1, 2],// All top row
        [3, 4, 5],// " middle "
        [6, 7, 8],// " bottom "
        [0, 3, 6],// All first column
        [1, 4, 7],// " second "
        [2, 5, 8],// " third "
        [0, 4, 8],// diagonal from top left
        [2, 4, 6],// "        "    top right
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
