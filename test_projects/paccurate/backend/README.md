# Paccurate api Backend app

This is a app made in node.js and express.js. It makes requests to the paccurate api for different packaging and stores the data in a database to provide some analytics.

## Pre-requisites

- Node v16.0.0
- MongoDB

## Setup

After cloning the repo type these commands in the terminal
```bash
cd backend
npm install
```
add a `.env` file with paccurate_api_key="<your paccurate apikey>"

run ```node src/index.js``` This will start your server at port 8000.

goto [http://localhost:8000](http://localhost:8000).
