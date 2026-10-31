from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime

class NoteCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1)

class NoteUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    content: Optional[str] = Field(None, min_length=1)

class Note(BaseModel):
    id: UUID
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

    @staticmethod
    def new(title: str, content: str) -> "Note":
        now = datetime.utcnow()
        return Note(
            id=uuid4(),
            title=title,
            content=content,
            created_at=now,
            updated_at=now,
        )
