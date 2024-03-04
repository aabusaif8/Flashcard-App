import { readCard, readDeck, updateCard } from "../../utils/api";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import CardForm from "../CardForm"
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

    const handleChange = (e) =>{
        setNewCard({
            ...newCard,
            [e.target.name]:e.target.value}
        )
    }
    
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
            <CardForm handleSubmit={handleSubmit} handleChange={handleChange} newCard={card} deckId={deckId} />
        </div>
    )
    
}

export default EditCard