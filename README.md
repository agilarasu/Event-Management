# Deployment Guide
## Backend
1. Backend is in `/backend`
2. install dependencies `npm install`
3. set .env (PORT=443,MONGO_URI, and JWT_SECRET)
4. Run `nodemon server.js`

## Frontend
1. frontend is in `/frontend`
2. install dependencies `npm install` and `npm install -g serve`
3. set .env (VITE_API_URL=backend_base_url)
4. Build : `npm run build`
5. Run : `serve -s dist`
