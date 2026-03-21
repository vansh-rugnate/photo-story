install:
	cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt
	cd frontend && npm install

dev:
	cd backend && source venv/bin/activate && uvicorn main:app --reload & \
	cd frontend && npm run dev
