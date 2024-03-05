import { listDecks, deleteDeck } from "../utils/api";
import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";


function Home() {
    const [decks, setDecks] = useState([])
    const history = useHistory()


    useEffect(() => {
        async function fetchDecks() {
            try{
                const allDecks = await listDecks()
                setDecks(allDecks)
            }catch (error) {
                console.error(error)
            }
        }
        
        fetchDecks()
    },[setDecks])

    const handleDeleteDeck = async (deck) => {
        console.log(deck)
        if (window.confirm("Are you sure you want to delete this deck?")) {
            const abortController = new AbortController();
            try{
                history.go(0)
                return await deleteDeck(deck, abortController.signal)
            } catch(error){
                console.error(error)
            }
            return abortController.abort 
        }
    }

    const deckDisplay = decks.map((deck) => {
        return(
            <div key={deck.id}>
            <label htmlFor={`deck-display-${deck.id}`}>{deck.name}</label>
            <div>{deck.cards.length} cards</div>
            <Link to={`/decks/${deck.id}/study`}>
                <button>
                    study
                </button>
            </Link>
            <Link to={`/decks/${deck.id}`}>
                <button>
                    view
                </button>
            </Link>
            <button onClick={() => handleDeleteDeck(deck)}>Delete</button>
        </div>
        )
    })
    return (
        <div>
            <h2>Decks</h2>
            {deckDisplay}
            <Link to={`/decks/new`}>
                <button>Create Deck</button>
            </Link>
        </div>
    )
}
export default Home