# 🗺️ Tour Booking Website

A **full-featured tour booking platform** where users can **browse tours**, **purchase tickets**, and **manage their bookings**.  
This backend service powers essential operations such as **user management**, **tour listings**, **payment integration**, and **ticket ownership**, all built with a **clean**, **scalable architecture**.

---

## 🚀 Tech Stack

Built with modern technologies for performance, scalability, and flexibility:

<p align="center">
  <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" alt="Node.js" width="120"/>
  &nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js" width="120"/>
  &nbsp;&nbsp;
  <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" alt="MongoDB" width="120"/>
  &nbsp;&nbsp;
  <img src="https://www.vectorlogo.zone/logos/mongoosejs/mongoosejs-ar21.svg" alt="Mongoose" width="120"/>
</p>

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## 🚀 Running the Server

To run the server in **production mode**:

```bash
npm run start
```

To run the server in **development mode** (with auto-restart on file changes):

```bash
npm run dev
```

---

## 🔍 Semantic Search Service

> **Important:**  
> To use the **semantic search** endpoint, you must run a separate Python service.

1. Install the required Python dependencies:

```bash
pip install fastapi pinecone
```

2. Start the semantic search server:

```bash
uvicorn semantic_search:app --host 0.0.0.0 --port 8000 --reload
```

---

## 👥 Contributors

Thanks to our amazing team who made this project possible:

- Ahmed Hussein
- Mohamed Khaled
- Ahmed Khaled
- Alaa Gaber
- Ali Abdelmoneam
- Eslam Mohamed

---
