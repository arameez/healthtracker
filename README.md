# AI Health Tracker

This repository contains three interconnected applications that together provide a full-stack solution for analyzing diagnosis reports (PDFs or images) using NLP and deploying the system to AWS EC2.

## Repository Structure


---

## 1. Health App (`health-app/`)

### Description
- A **React.js frontend application**.
- Provides:
  - User **login functionality**.
  - Option to **upload diagnosis reports** (PDF or image).
  - Extracted patient and diagnosis data is displayed and pre-filled in a form using results from the backend.
  - Patient and diagnosis data can be saved in the backend database.
  - Saved patient and diagnosis data can be viewed in the frontend.
- Calls the Django API to receive structured JSON data after NLP processing.

### Features
- Upload medical reports in PDF or image format.
- Pre-population of forms with extracted structured data.
- Smooth integration with backend APIs.

---

## 2. Extract PDF Service (`extract-pdf/`)

### Description
- A **Node.js + Express.js backend service**.
- Responsible for:
  - Extracting raw text from uploaded PDF files.
  - Provides endpoint to React app for sending the pdf file for extraction

### Features
- Efficient PDF parsing.
- REST API endpoints to expose extracted text.

---

## 3. Deployment (`deployment/`)

### Description
- Contains scripts and configurations to **deploy the entire stack on AWS EC2**.
- Ensures smooth deployment of:
  - React frontend
  - Node.js/Express PDF extraction service
  - Django API backend
  - Sqllite database

### Features
- EC2 setup and provisioning.
- Scripts for building and managing apps.
- Configuration for environment variables, Nginx/PM2, and app orchestration.

---

## End-to-End Flow

1. **User uploads a PDF/image** through the **React app (`health-app`)**.  
2. File is sent to the **Node.js extract-pdf service (`extract-pdf`)**.  
3. Extracted raw data is sent to the **Django API** (not included in this repo, assumed to be part of backend).  
4. **Django API applies NLP** techniques to convert unstructured text → structured JSON.  
5. **React app consumes the JSON** and auto-populates forms for user review and submission.  

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python 3.10+ (for Django API)
- Sqllite3 database
- AWS account & EC2 instance (for deployment)
- Nginx / PM2 (for serving production apps)

### Setup Instructions

#### Health App (React)
```bash
cd health-app
npm install
npm start   # Runs on http://localhost:3000
