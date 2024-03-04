//updated
import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom"
import Home from "../home/Home"
import Study from "../home/Study"
import CreateDeck from "../home/CreateDeck"
import EditCard from "../home/CardFiles/EditCard";
import EditDeck from "../home/EditDeck"
import AddCard from "../home/CardFiles/AddCard"
import Deck from "../home/Deck"
//import { createDeck } from "../utils/api";


function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        {/* Implemented screen starting */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
