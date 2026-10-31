import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/healthz")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_crud_notes():
    payload = {"title": "hello", "content": "world"}
    r = client.post("/notes", json=payload)
    assert r.status_code == 201
    created = r.json()
    note_id = created["id"]

    r = client.get("/notes")
    assert r.status_code == 200
    assert any(n["id"] == note_id for n in r.json())

    r = client.get(f"/notes/{note_id}")
    assert r.status_code == 200
    assert r.json()["title"] == "hello"

    r = client.put(f"/notes/{note_id}", json={"content": "world!!"})
    assert r.status_code == 200
    assert r.json()["content"] == "world!!"

    r = client.delete(f"/notes/{note_id}")
    assert r.status_code == 204

    r = client.get(f"/notes/{note_id}")
    assert r.status_code == 404

def test_validation():
    r = client.post("/notes", json={"title": "", "content": ""})
    assert r.status_code == 422
