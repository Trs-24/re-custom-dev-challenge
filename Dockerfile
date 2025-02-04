FROM node:22 as build-frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:22 as backend
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install
COPY backend/ ./backend
COPY --from=build-frontend /app/frontend/dist ./backend/public
WORKDIR /app/backend
ENTRYPOINT ["sh", "-c", "npm run migration:run && npm run start"]
