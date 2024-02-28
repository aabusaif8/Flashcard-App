import { readCard, readDeck, updateCard } from "../utils/api";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

function EditCard() {
    const history = useHistory()
    const { deckId, cardId } = useParams()
    
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({ front:"", back:""})

    useEffect(() => {
        async function deckReading() {
            try{
                const loadedDeck = await readDeck(deckId)
                const loadedCard = await readCard(cardId)
                setDeck(loadedDeck)
                setCard(loadedCard)
            } catch (error){
                console.error(error)
            }
        }
        deckReading()
    }, [deckId, cardId])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await updateCard({
                ...card, id:cardId,
            })
            history.push(`/decks/${deckId}`)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href={`/decks/${deckId}`}>{deck.name}</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">
                        Front:
                    </label>
                    <textarea
                      name="front"
                      className="form-control"
                      value={card.front}
                      onChange={(e) => setCard({...card, front:e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">
                        Back:
                    </label>
                    <textarea
                      name="back"
                      className="form-control"
                      value={card.back}
                      onChange={(e) => setCard({...card, back:e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
                <button className="btn btn-secondary" onClick={() => {history.push(`/decks/${deckId}`)}}>
                    Cancel
                </button>
            </form>
        </div>
    )
    
}

export default EditCard