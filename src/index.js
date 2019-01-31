import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';
library.add(faHandRock, faHandPaper, faHandScissors);

class Scoreboard extends Component {
  render() {
    return React.createElement("div", {
      className: "scoreboard"
    }, React.createElement("div", {
      className: "scoreboard__score"
    }, React.createElement("div", {
      className: "scoreboard__user-score",
      id: "user-score"
    }, React.createElement("div", null, this.props.scoreData.userScore), React.createElement("div", {
      className: "scoreboard__label"
    }, "User")), React.createElement("div", {
      className: "scoreboard__delimiter"
    }, " : "), React.createElement("div", {
      className: "scoreboard__bot-score",
      id: "bot-score"
    }, React.createElement("div", null, this.props.scoreData.botScore), React.createElement("div", {
      className: "scoreboard__label"
    }, "Bot"))), React.createElement("div", {
      className: "scoreboard__alert"
    }, this.props.scoreData.message));
  }

}

class RPSButtons extends Component {
  render() {
    return React.createElement("div", {
      className: "RPS_Buttons"
    }, React.createElement("div", {
      className: "RPS_Button",
      userinput: "Rock",
      onClick: this.props.handleUserClick
    }, React.createElement(FontAwesomeIcon, {
      icon: "hand-rock",
      className: "RPS_Button__Icon"
    })), React.createElement("div", {
      className: "RPS_Button",
      userinput: "Paper",
      onClick: this.props.handleUserClick
    }, React.createElement(FontAwesomeIcon, {
      icon: "hand-paper",
      className: "RPS_Button__Icon"
    })), React.createElement("div", {
      className: "RPS_Button",
      userinput: "Scissors",
      onClick: this.props.handleUserClick
    }, React.createElement(FontAwesomeIcon, {
      icon: "hand-scissors",
      className: "RPS_Button__Icon"
    })));
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.getBotRPS = this.getBotRPS.bind(this);
    this.state = {
      userScore: 0,
      botScore: 0,
      message: 'Time to play the game!'
    };
  }

  getBotRPS() {
    const botRPS = ['Rock', 'Paper', 'Sciccors'];
    return botRPS[Math.floor(Math.random() * 3)];
  }

  highlightWinner(winner) {
    const winnerId = winner === 'user' ? 'user-score' : 'bot-score';
    const winnerStyleList = document.getElementById(winnerId).classList;
    const wStyle = 'scoreboard__winner-glow';
    winnerStyleList.add(wStyle);
    setTimeout(() => winnerStyleList.remove(wStyle), 200);
  }

  highlightPick(pick, result) {
    const styling = 'RPS_Button__' + (result === 'won' ? 'winner-highlight' : result === 'lost' ? 'loser-highlight' : 'draw-highlight');
    pick.classList.add(styling);
    setTimeout(() => pick.classList.remove(styling), 150);
  }

  handleUserClick(event) {
    const usrChoice = event.target.getAttribute('userinput');
    const botChoice = this.getBotRPS();

    switch (usrChoice[0] + botChoice[0]) {
      case 'RS':
      case 'PR':
      case 'SP':
        this.setState({
          userScore: this.state.userScore + 1,
          message: `${usrChoice} beats ${botChoice}. User wins!`
        });
        this.highlightWinner('user');
        this.highlightPick(event.target, 'won');
        break;

      case 'SR':
      case 'RP':
      case 'PS':
        this.setState({
          botScore: this.state.botScore + 1,
          message: `${usrChoice} loses to ${botChoice}. Bot wins!`
        });
        this.highlightWinner('bot');
        this.highlightPick(event.target, 'lost');
        break;

      case 'RR':
      case 'PP':
      case 'SS':
        this.setState({
          message: `${usrChoice} can't beat ${botChoice}. It's a draw`
        });
        this.highlightPick(event.target, 'draw');
        break;

      default:
        alert('Something went very very wrong');
        break;
    }
  }

  render() {
    return React.createElement("div", {
      className: "App"
    }, React.createElement("header", {
      className: "App-header"
    }, React.createElement("h1", null, "React-powered Rock-Paper-Scissors game")), React.createElement(Scoreboard, {
      scoreData: this.state
    }), React.createElement(RPSButtons, {
      handleUserClick: this.handleUserClick
    }));
  }

}

ReactDOM.render(React.createElement(App, null), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
