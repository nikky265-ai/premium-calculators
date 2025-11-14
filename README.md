
# Premium Calculator UI (Angular 17)

## 📘 Overview
This Angular app provides the UI for the Premium Calculator API.

Features:
- Reactive form  
- Auto-calculate mode  
- In-memory API integration via proxy  
- Standalone Components (Angular 17+)  

---

## 🚀 Running Angular

### 1. Install dependencies
```
npm install
```

### 2. Proxy setup
`proxy.conf.json`:
```json
{
  "/api": {
    "target": "https://localhost:44320",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

### 3. Start Angular
```
npm start
```

Runs at:
```
http://localhost:4200
```

---

## 📂 Structure
```
premium-calculator
 ├── proxy.conf.json
 ├── src
 │    ├── main.ts
 │    ├── app/
 │         ├── app.ts
 │         ├── app.html
 │         ├── app.scss
 │         ├── models/
 │         ├── services/
 │         └── validators/
 └── package.json
```

---

## 🧩 Key Components

### Service — premium.service.ts
Handles:
- GET /api/occupations
- POST /api/premium/calculate

### app.ts
Main logic, state, auto-calc, form validation.

### one-of.validator.ts
Ensures:
- Either DOB OR AgeNextBirthday is provided.

---

## 📝 Assumptions
- API uses in-memory data  
- Proxy avoids CORS issues  
- No routing required  
- No state management library needed  

