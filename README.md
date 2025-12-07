# API Monitoring & Observability Platform

This repository contains a complete mini-observability stack built for the Leap assignment:
- Tracking Client (Kotlin)
- Collector Service (Kotlin + MongoDB)
- Monitoring Dashboard (Next.js)

## Services
- **collector**: Stores logs in MongoDB, exposes `/logs` and `/logs/alerts`
- **tracking-client**: Sends API logs automatically using an interceptor
- **dashboard**: UI to visualize logs & alerts

## How to Run

### 1. Start MongoDB  
MongoDB runs automatically as a Windows service.

### 2. Start Collector  
```bash
cd collector
mvn spring-boot:run
