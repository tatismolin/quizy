import React, {Component} from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

class Dashboard extends Component{

    state = {
        selectedDashboard: null,
        cards: []
    };

    componentDidMount(){
        const {cards} = this.props.dashboard;
        this.setState({
            cards: cards
        });
    };

    dashboard = () => {
        const {cards} = this.state;
        return cards.map(card => {
            return(
                <Card 
                    card_id={card.id} 
                    card={card} 
                    removeCard={this.removeCard} 
                    // editCard={this.editCard} 
                    // dashboard_id={dashboard.id} 
                />
            );
        });
    };

    addCard = (card) => {
        const {cards} = this.state;
        this.setState({
            cards: [...cards, card]
        });
        
        fetch("http://localhost:3000/cards", {
        // fetch("https://my-quiz-it.herokuapp.com/cards", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({card})
        });
    };

    removeCard = (deletedCard) => {
        const {cards} = this.state;
        const newCardsState = cards.filter(card => {
            return(
                card.id !== deletedCard.card_id
            );
        });
        this.setState({cards: newCardsState});

        fetch(`http://localhost:3000/cards/${deletedCard.card_id}`, {
        // fetch(`https://my-quiz-it.herokuapp.com/${deletedCard.card_id}`, {
          method: "DELETE"
        });
    };

    // editCard = (card) => {
    //     this.setState({
    //         cards: [...this.state.cards, card]
    //     });

    //     fetch(`http://[::1]:3000/cards/${card.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({card})
    //     });
    // };

    handleDelete = (event) => {
        const {removeDashboard, dashboard_id} = this.props;
        removeDashboard({dashboard_id: dashboard_id});
    };

    render(){
        const {selectedDashboard} = this.state;
        const {dashboard} = this.props;
        return(
            <div className="dashboard-container">
                {selectedDashboard
                    ? <span 
                    className="delete-dashboard" 
                    // onClick={this.handleDelete} 
                    onClick={() => { if (window.confirm('Are you sure you wish to delete this Dashboard?')) this.handleDelete() }}
                    role="img" 
                        aria-label="delete button">

                            ❌
                    </span>
                    : null
                }

                <p 
                    onClick={() => this.setState({selectedDashboard: !selectedDashboard})} 
                    className="dashboard-name">{dashboard.name}
                </p>

                {selectedDashboard
                    ? <div className="dashboard">
                            {this.dashboard()}

                            <AddCardForm 
                                addCard={this.addCard} 
                                dashboard_id={dashboard.id} 
                            />
                        </div>
                    : null
                }

            </div>
        );
    };

}

export default Dashboard;