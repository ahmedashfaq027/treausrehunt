import React, { useEffect, useRef, useState } from "react";
import "../App.scss";

function Notes() {
    const [addNote, setAddNote] = useState(false);
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState("");
    const inpRef = useRef();

    const addNoteHandler = (e) => {
        e.preventDefault();

        let tmp = input.trim();
        if (tmp) {
            setNotes((prev) => [...prev, tmp]);
        }

        setAddNote(!addNote);
        setInput("");
    };

    useEffect(() => {
        if (addNote) {
            inpRef.current.focus();
        }
    }, [addNote]);

    const buttonClick = (e) => {
        setAddNote(!addNote);
    };

    const removeNote = async (idx, e) => {
        setNotes((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="notes">
            <div className="notes__list">
                {notes.map((note, index) => (
                    <div
                        key={`note__${index}`}
                        className={`note note__${index}`}
                    >
                        <p>{note}</p>
                        <span onClick={(e) => removeNote(index, e)}>x</span>
                    </div>
                ))}
            </div>
            {!addNote && (
                <div className="notes__add" onClick={(e) => buttonClick(e)}>
                    <h3 className="add__icon">➕ </h3>
                    <p>Add note</p>
                </div>
            )}
            <form
                style={{ display: addNote ? "flex" : "none" }}
                className="edit__note"
                onSubmit={(e) => addNoteHandler(e)}
            >
                <input
                    type="text"
                    ref={inpRef}
                    value={input}
                    tabIndex="0"
                    onBlur={(e) => addNoteHandler(e)}
                    onChange={(e) => setInput(e.target.value)}
                    className="note__text"
                />
            </form>
        </div>
    );
}

export default Notes;
