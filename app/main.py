from fastapi import FastAPI, HTTPException
from typing import List, Dict
from uuid import UUID
from .models import Note, NoteCreate, NoteUpdate

app = FastAPI(title="Notes App (In-Memory)")

NOTES: Dict[UUID, Note] = {}

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.post("/notes", response_model=Note, status_code=201)
def create_note(payload: NoteCreate):
    note = Note.new(payload.title, payload.content)
    NOTES[note.id] = note
    return note

@app.get("/notes", response_model=List[Note])
def list_notes():
    return list(NOTES.values())

@app.get("/notes/{note_id}", response_model=Note)
def get_note(note_id: UUID):
    note = NOTES.get(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.put("/notes/{note_id}", response_model=Note)
def update_note(note_id: UUID, payload: NoteUpdate):
    note = NOTES.get(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    from datetime import datetime
    updated = note.copy(update={
        "title": payload.title if payload.title is not None else note.title,
        "content": payload.content if payload.content is not None else note.content,
        "updated_at": datetime.utcnow(),
    })
    NOTES[note_id] = updated
    return updated

@app.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: UUID):
    if note_id not in NOTES:
        raise HTTPException(status_code=404, detail="Note not found")
    del NOTES[note_id]
    return None
