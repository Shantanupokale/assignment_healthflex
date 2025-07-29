# 🕒 HealthFlex Timer Management Web App

This project is a **React-based web application** built as part of a timed assignment for HealthFlex. The goal was to replicate a **React Native timer management tool** into a **mobile-responsive web app** that allows users to create, manage, and interact with multiple customizable timers with categorized grouping, progress tracking, and local data persistence.

---

## 🚀 Live Demo

🌐 [assignment-healthflex.vercel.app](https://assignment-healthflex.vercel.app/)

📦 [GitHub Repository](https://github.com/Shantanupokale/assignment_healthflex)

---



## 🧠 Features

### ✅ Core Functionality
- **Add Timer**  
  - Name  
  - Duration (in seconds)  
  - Category (e.g., Study, Workout, Break)

- **Timers Grouped by Category**  
  - Expand/collapse by category  
  - View timers with their name, remaining time, and status (Running, Paused, Completed)

- **Timer Management**  
  - Start, Pause, Reset individual timers  
  - Mark as completed when timer ends

- **Progress Visualization**  
  - Smooth progress bar for each timer

- **Bulk Category Actions**  
  - Start/Pause/Reset all timers within a category

### 📖 Enhanced Functionality
- **Timer History**  
  - Logs completed timers with name and timestamp

- **Custom Alerts**  
  - Midway (50%) alert notification using toast

### 🎨 UI/UX
- **Mobile Responsive Design**
- **Dark/Light Mode Toggle**

---

## 🛠️ Tech Stack

| Tech         | Usage                         |
|--------------|-------------------------------|
| React        | Frontend library              |
| Vite         | Build tool                    |
| Tailwind CSS | Styling                       |
| ShadCN UI    | Component library             |
| React Context| State management              |
| LocalStorage | Data persistence (in place of AsyncStorage) |
| Lucide-react | Icons                         |
| Toast        | User feedback (mid-timer & completion alerts) |

---

## 📁 Folder Structure
```bash
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Category/
│ │ │ ├── CategoryControls.jsx
│ │ │ └── CategorySection.jsx
│ │ ├── Timer/
│ │ │ ├── ProgressBar.jsx
│ │ │ └── TimerCard.jsx
│ │ └── ui/
│ │ ├── MobileNavbar.jsx
│ │ └── ThemeSwitcher.jsx
│ ├── context/
│ │ ├── ThemeContext.jsx
│ │ └── TimerContext.jsx
│ ├── hooks/
│ │ └── use-toast.js
│ ├── lib/
│ │ └── utils.js
│ ├── pages/
│ │ ├── CreateTimer.jsx
│ │ ├── History.jsx
│ │ └── Home.jsx
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
```
---

## 🧪 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/Shantanupokale/assignment_healthflex.git
   cd assignment_healthflex


2. **Install dependencies**
   ```bash
   npm install

3. **Start the development server**
   ```bash
   npm run dev

4. **Open your browser at**
    ```bash
   http://localhost:5173

5. **Build Project**
   ```bash
   npm run build

---
## 🤔 Assumptions Made

- Since the assignment was originally for **React Native**, but the target platform was shifted to **Web**, `AsyncStorage` was replaced with `localStorage` for data persistence.

- **Notifications and alerts** were implemented using toast notifications (`use-toast`) instead of native modals or OS-level alerts.

- The app uses **`setInterval` and manual state tracking** for managing timer countdowns due to the absence of any external timing libraries.

- A **lightweight design system** (Tailwind CSS + ShadCN UI) was used to maintain clean UI/UX while keeping third-party dependencies minimal.


