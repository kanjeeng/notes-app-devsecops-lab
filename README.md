# Notes App (FastAPI) – DevSecOps Demo

## Run locally
```
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt -r dev-requirements.txt
uvicorn app.main:app --reload
```

## Test
```
pytest -q
```
If not works, you can use also this command : 
```
PYTHONPATH=. pytest -q
```

## Docker
```
docker build -t notes-app:dev .
docker run -p 8000:8000 notes-app:dev
```

You can access FastApi dashboard trough this endpoint : `{{URL-API}}/docs`

## Audit
```
pip-audit -r requirements.txt
pip-audit -r dev-requirements.txt
```

## Endpoints
- GET /healthz
- POST /notes {title, content}
- GET /notes
- GET /notes/{id}
- PUT /notes/{id} {title?, content?}
- DELETE /notes/{id}
