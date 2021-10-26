.DEFAULT_GOAL := help

run:
	@make build
	@make start-front

install:
	@echo "Installation"
	@pip3 install flask
	@npm install
	@make build
	@echo "Installation complete"

start-api:
	@echo "Start API"
	@python3 API/flask_boat_api.py

build:
	@npm run build

start-front:
	@cd dist/boat-app && python3 -m webbrowser "http://localhost:8000" && python3 -m http.server
