# TaskFlow-Cloudflare-Workers-Task-Manager
TaskFlow is a full-stack serverless task manager built using Cloudflare Workers and D1.

## Tech Stack
- Cloudflare Workers
- Cloudflare D1
- TypeScript
- Vanilla JavaScript
- HTML / CSS

## Features
- Full CRUD API
- Persistent storage using D1
- Lightweight frontend
- Deployed on Cloudflare

## Setup Instructions

### Clone
git clone https://github.com/YOUR_USERNAME/taskflow-cloudflare.git
cd taskflow-cloudflare

### Install
npm install

### Create D1
npx wrangler d1 create task_db

### Create tables
npx wrangler d1 execute task_db --file schema.sql

### Run locally
npm run dev

### Deploy
npm run deploy

## Frontend
Open FRONTEND/index.html using Live Server.

## API Endpoints
GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id
