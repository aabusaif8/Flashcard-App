import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const [newDeck, setNewDeck] = useState(
        {
            name:"",
            description:""
        }
    )
    const [error, setError] = useState("")
    const history = useHistory()

    const handleChange = (e) => {
        setNewDeck({
            ...newDeck,
            [e.target.name]: e.target.value,
        })
    } 
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const createdDeck = await createDeck(newDeck)
            history.push(`/decks/${createdDeck.id}`)
        }catch(error){
            setError(error.message)
        }
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"> Home  </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Deck name:
                    </label>
                    <input 
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    value={newDeck.name} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Deck description:
                    </label>
                    <textarea
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                    value={newDeck.description}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/" className="btn btn-secondary">
                    Cancel
                </Link>
            </form>
        </div>
    )
}
export default CreateDeck