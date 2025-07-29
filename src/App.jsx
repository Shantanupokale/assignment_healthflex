import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import CreateTimer from "./pages/CreateTimer";
import History from "./pages/History";
import { TimerProvider } from "./context/TimerContext";
import { ThemeProvider } from "./context/ThemeContext";
import MobileNavbar from "./components/MobileNavbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ThemeProvider>
        <TimerProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-b from-white/80 from-slate-50  to-indigo-500 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 text-foreground ">
            <MobileNavbar />
            <Toaster position="top-center" reverseOrder={false} />
            <main className=" min-h-screen  p-4 md:px-8 border-2 border-red-800">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateTimer />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </main>
          </div>
        </Router>
         </TimerProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
