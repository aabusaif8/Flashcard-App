import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function CardForm({ handleSubmit, handleChange, newCard, deckId }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="front" className="form-label">
                    Front:
                </label>
                <textarea
                    name="front"
                    className="form-control"
                    onChange={handleChange}
                    value={newCard.front}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="back" className="form-label">
                    Back:
                </label>
                <textarea
                    name="back"
                    className="form-control"
                    onChange={handleChange}
                    value={newCard.back}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Save
            </button>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                Done
            </Link>
        </form>
    );
}