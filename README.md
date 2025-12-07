# API Monitoring & Observability Platform

A complete mini-observability system built for the Leap assignment.  
This project includes:

- **Tracking Client (Kotlin + Spring Boot)** – Automatically sends API logs using an interceptor  
- **Collector Service (Kotlin + Spring Boot + MongoDB)** – Central log storage and alert generation  
- **Monitoring Dashboard (Next.js)** – Visualizes logs, alerts, and metrics in real time  

---

## 🏗 Architecture Overview

The system consists of three independent services:

### **1. tracking-client (Port 8081)**
- A sample microservice with endpoints like `/orders` and `/payments`
- Uses a Spring Boot `HandlerInterceptor` to automatically:
  - Record request start time
  - Record response status
  - Measure latency
  - Send the log to the collector service

### **2. collector (Port 8080)**
- Receives logs via `POST /logs`
- Saves logs into **MongoDB**
- Generates alerts:
  - **SLOW** → latency > 500ms  
  - **ERROR** → status ≥ 500  
- Exposes:
  - `GET /logs` → list all logs  
  - `GET /logs/alerts` → list all alerts  

### **3. dashboard (Port 3000)**
- Next.js UI showing:
  - Total number of logs  
  - Slow API count  
  - Error count  
  - Filterable logs table  
  - Alerts list  

---

## 🛠 Requirements
- Java 17+
- Node.js 18+
- MongoDB (runs automatically on Windows after installation)

---

## 🚀 How to Run

### **1. Start MongoDB**
MongoDB runs automatically as a Windows service.  
No manual startup required.

### **2. Start Collector**
```bash
cd collector
./mvnw spring-boot:run
```

### **3. Start Tracking Client**
```bash
cd tracking-client
./mvnw spring-boot:run
```

### **4. Start Dashboard**
```bash
cd dashboard
npm install
npm run dev
```

Dashboard runs at: http://localhost:3000

---

## 📡 Testing (Optional)

### **Trigger real logs**
Hit the tracking-client service:

```bash
Invoke-RestMethod -Uri "http://localhost:8081/orders" -Method GET
Invoke-RestMethod -Uri "http://localhost:8081/payments" -Method GET
```

Each call automatically logs data into MongoDB via the collector.

### **Manually push a log**
```bash
Invoke-RestMethod `
-Uri "http://localhost:8080/logs" `
-Method POST `
-Body '{"service":"orders","endpoint":"/test","method":"POST","status":500,"latency":840}' `
-ContentType "application/json"
```

---

## 📁 MongoDB Collections

### **1. api_logs**
Example document:
```json
{
  "service": "tracking-client",
  "endpoint": "/orders",
  "method": "GET",
  "status": 200,
  "latency": 180,
  "timestamp": "2025-12-05T14:23:10Z"
}
```

### **2. alerts**
Example:
```json
{
  "type": "SLOW",
  "service": "tracking-client",
  "endpoint": "/payments",
  "timestamp": "2025-12-05T14:23:12Z"
}
```

---

## 🔍 Features Summary
- Automatic API logging  
- Latency measurement with interceptor  
- Slow/failed alert detection  
- Clean Next.js dashboard UI  
- Filtering, sorting, and searching logs (client-side)  
- Real-time visibility  
- Microservice architecture  

---

## 📦 Tech Stack

### **Backend**
- Kotlin  
- Spring Boot 4  
- MongoDB  
- REST APIs  

### **Frontend**
- Next.js 14  
- TypeScript  
- Custom CSS  

---

## 📘 Notes
- All services run independently.
- Tracking-client → Collector → MongoDB → Dashboard.
- Designed to be simple, modular, and fully functional for the assignment.

---

## 🏁 Done!
You now have a working observability system ready to submit.

