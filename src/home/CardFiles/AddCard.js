import { readDeck } from "../../utils/api";
import React, {useState, useEffect} from "react";
import { useHistory, Link, useParams } from "react-router-dom/cjs/react-router-dom";
import { createCard } from "../../utils/api";
import CardForm from '../CardForm'
function AddCard() {
    const {deckId} = useParams()
    console.log(deckId)
    console.log(deckId)
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const [newCard, setNewCard] = useState({
        id:"",
        front:"",
        back:"",
        deckId: deckId
    })

    useEffect(() =>{
        async function fetchData() {
            try{
                const loadedDeck = await readDeck(deckId)
                setDeck(loadedDeck)
            }catch(error){
              throw(error)
            }
        }
        fetchData()
    }, [deckId])

    const handleChange = (e) =>{
        setNewCard({
            ...newCard,
            [e.target.name]:e.target.value}
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await createCard(deckId, newCard)
            history.push(`/decks/${deckId}`)
        }catch(error){
            console.error(error)
        }
    }
    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <CardForm handleSubmit={handleSubmit} handleChange={handleChange} newCard={newCard} deckId={deckId} />
        </div>
    )
}
export default AddCard