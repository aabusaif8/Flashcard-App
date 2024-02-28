import { readDeck, updateDeck } from "../utils/api";
import React, {useState, useEffect} from "react";
import { useHistory, Link, useParams } from "react-router-dom/cjs/react-router-dom";

function EditDeck() {
    const [deck, setDeck] = useState({name: "", description: ""})
    const history = useHistory()
    const { deckId } = useParams()

    useEffect(() => {
        async function retrieval() {
            try{
                const loadedDeck = await readDeck(deckId)
                setDeck(loadedDeck)
            }catch(error) {
                console.error(error)
            }
        }
        retrieval()
    }, [deckId])


    const handleChange = (e) => {
        setDeck({
            ...deck,
            [e.target.name]: e.target.value
        }) 
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            await updateDeck(deck)
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
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breacrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <h2>Edit Deck: {deck.name} </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                value={deck.name}
                />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <textarea
                name="description"
                className="form-control"
                onChange={handleChange}
                value={deck.description}
                />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                    Cancel
                </Link>
            </form>
        </div>
    )
}

export default EditDeck