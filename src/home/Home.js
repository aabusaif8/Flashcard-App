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

    const handleDeleteDeck = async (deckId) => {
        if (window.confirm("Are you sure you want to delete this deck?")) {
            try{
                await deleteDeck(deckId)
                setDecks(decks.filter((deck) => deck.id !== deckId))
                history.push("/")
            } catch(error){
                console.error(error)
            }
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
            <button onClick={() => handleDeleteDeck(deck.id)}>Delete</button>
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