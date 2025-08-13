# zarciologia

Aplikacja do ogarniania żarcia 🍽️ — backend w Node.js/Express, frontend w Vue (CDN), baza w PostgreSQL + Adminer do zarządzania.

---

## Linki w dev

- **Frontend (Vue + API w jednym)**: [http://localhost:3000](http://localhost:3000)  
- **API endpoint testowy**: [http://localhost:3000/api/hello](http://localhost:3000/api/hello)  
- **Adminer (GUI do bazy)**: [http://localhost:8080](http://localhost:8080)  

---

## Dane logowania do Adminera

- **System**: PostgreSQL  
- **Server**:  
```
db
```
- **User**:  
```
app
```
- **Password**:  
```
app
```
- **Database**:  
```
app
```

---

## Setup projektu

### 1. Wymagania
- Docker + Docker Compose V2 (`docker compose version` musi działać)
- Porty 3000 i 8080 wolne

### 2. Klonowanie repo
```bash
git clone git@github.com:zniszcz/zarciologia.git
cd zarciologia
```

### 3. (Pierwszy raz) Inicjalizacja Node.js
```bash
npm init -y
npm install express
```

### 4. Start usług
```bash
docker compose up -d --build
```

### 5. Logi aplikacji
```bash
docker compose logs -f app
```

### 6. Zatrzymanie wszystkiego
```bash
docker compose down
```

---

## Struktura projektu
```
zarciologia/
├─ public/           # statyczne pliki frontendu (Vue z CDN)
├─ server.js         # Express API + serwowanie frontu
├─ package.json
├─ Dockerfile
├─ docker-compose.yml
└─ .dockerignore
```
