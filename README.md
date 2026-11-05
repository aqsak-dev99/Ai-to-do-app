 🌟 AI Todo – Smart Task Manager  

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blueviolet?style=for-the-badge)](https://aqsak-dev99.github.io/Ai-to-do-app/)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-yellow?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Live%20Now-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)



 ✨ Overview

AI Todo – Smart Task Manager is a next-generation productivity web app designed to help users organize, prioritize, and complete their daily tasks — with the power of artificial intelligence and an immersive glassmorphic design.
This project goes beyond a standard to-do list — it blends beautiful aesthetics, modern React development, and interactive experiences to make productivity feel fun and futuristic.
Built entirely with React 18 and Vite, the app delivers blazing-fast performance and a seamless user experience. In AI Mode, a Groq-powered serverless function reads your current tasks and suggests a planning tip and three concrete next steps you can add in one click (or run it in Demo Mode with built-in samples). Each task completion triggers a confetti celebration, rewarding progress and creating positive reinforcement loops — inspired by gamified UX principles.
With Dark/Light themes, drag-and-drop reordering, streak tracking, and local data persistence, AI Todo combines functionality and design polish that stands out both in your portfolio and in real-world use.
Whether you’re a developer looking to showcase front-end skills, a productivity enthusiast wanting an elegant task manager, or a client seeking a polished React app — AI Todo is the perfect example of creativity meeting code.  

🔗 [👉 Live Demo](https://aqsak-dev99.github.io/Ai-to-do-app/)  


🧩 App Preview:





https://github.com/user-attachments/assets/47844cf8-8159-417c-8d6c-21dd03b822e6










ScreenShots:


<img width="800" height="450" alt="app ss" src="https://github.com/user-attachments/assets/a0f89eb8-b107-46a0-b686-b24eabda1cfd" />


<img width="800" height="450" alt="app ss2" src="https://github.com/user-attachments/assets/ddc384dc-b4d7-477d-a283-54ca6ec4c471" />


<img width="800" height="450" alt="app ss3" src="https://github.com/user-attachments/assets/80928989-dc79-4b0f-8888-5594a40c4183" />













 🧭 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How to Run Locally](#-how-to-run-locally)
- [Demo Mode vs AI Mode](#-demo-mode-vs-ai-mode)
- [Made With](#-made-with)



 ⚡ Features
 🌌 Glassmorphic UI with neon gradients for a sleek, modern aesthetic  
 🌗 Dark/Light Mode Toggle for user preference  
 🖱 Drag & Drop task reordering using React DnD  
 🤖 AI Suggestions – a planning tip and 3 next-step tasks generated from your current list, each addable in one click  
 🔥 Streak & XP System to gamify productivity  
 🗂 Priority, Category, Due Date for robust task management  
 🎉 Confetti Celebration on task completion for a rewarding experience  
 📱 Fully Responsive design for all devices  
 💾 LocalStorage Persistence to save tasks  
 💖 Personal Branding with customizable logo in footer  



 🧰 Tech Stack
 ⚛️ React 18 + Vite — Fast and modern web development  
 🧩 JSX — Declarative UI components  
 🧲 React DnD — Drag-and-drop functionality  
 🎇 Canvas Confetti — Celebration effects  
 📊 React Circular Progressbar — Dynamic productivity stats  
 🎨 Pure CSS (Tailwind-free) — Glassmorphism + animations  
 💾 LocalStorage — Persistent task data  
 🤖 Groq API (via a Vercel serverless function) — AI-powered suggestions  



💻 How to Run Locally

-bash
- Clone the repository
git clone https://github.com/aqsak-dev99/Ai-to-do-app.git
cd Ai-to-do-app

- Install dependencies
npm install

- Start the development server
npm run dev


Now open your browser and visit ➡️ **[http://localhost:5173](http://localhost:5173)**



 🧠 Demo Mode vs AI Mode

 🧩 Demo Mode: Uses built-in sample suggestions, with no network calls
 🤖 AI Mode: Sends your task list to a small serverless function (`api/suggest.js`), which asks a Groq-hosted model for a planning tip and three new tasks. Visitors don't need an API key: the key lives only in the server's environment variables, never in the browser.

 How the AI part is built:
 - The model is told to reply with JSON only, and the server validates every field (category and priority must be known values) before anything reaches the app
 - Task text is treated as data, not instructions, and is trimmed to a safe length
 - A per-visitor rate limit and a 15-second timeout protect the free API quota
 - Clear error messages when the AI is busy or unavailable, so the app never hangs

 To run AI Mode yourself, deploy to Vercel and add `GROQ_API_KEY` in the project's environment variables. Locally, `vercel dev` runs both the app and the function.



 🪄 Made With

 ⚛️ [React](https://reactjs.org/) – UI Framework
 ⚡ [Vite](https://vitejs.dev/) – Lightning-fast build tool
 🎉 [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) – Fun task completion effects
 💜 Love & Neon – Crafted by [@aqsak-dev99](https://github.com/aqsak-dev99)



⭐ If you like this project, don’t forget to give it a star on GitHub!






