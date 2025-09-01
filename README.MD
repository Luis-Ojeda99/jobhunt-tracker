# Job Hunt Tracker
A web application for keeping track of job applications. It uses Node.js, Express, and PostgreSQL to provide a simple interface for logging applications, updating statuses, and managing progress throughout the job search process.

## Features
- Add new job applications with company, position, and status
- Update or remove entries
- Track progress (Applied, Interview, Offer, Rejected)
- Full CRUD functionality with PostgreSQL

## Tech Stack
- Backend: Node.js + Express
- Database: PostgreSQL

## Setup
###Prerequisites
- Node.js
- PostgreSQL
### Installation
1. Clone the repository
```git clone https://github.com/Luis-Ojeda99/jobhunt-tracker.git
cd jobhunt-tracker ```

2. Install dependecies:
```npm install ```

3. Create the database:
```createdb jobhunt_tracker ```  

4. Run schema: 
```psql -d jobhunt_tracker -f db/schema.sql ```
5. Add your database password to a .env file (example):
```DB_PASSWORD=your_postgres_password ```

6. Start the development server:
```npm run dev ```

7.Open your browser at http://localhost:3000 to see the app
