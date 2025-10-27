import React, { useEffect, useState } from "react";
import SignupForm from "./components/SignupForm";
import Stat from "./components/Stat";
import QuizRunner from "./components/QuizRunner";
import { RELIGION_THEMES } from "./data/themes";
import { SEED_QUIZZES } from "./data/quizzes";
import { DEFAULT_BADGES } from "./data/badges";
import { DATA_SOURCES } from "./data/sources";

// localStorage DB helpers
const DB_KEY = "devotionalify_db_v1";
function seedDB() { 
  const initial = { users:{}, quizzes: SEED_QUIZZES, badges: DEFAULT_BADGES, sources: DATA_SOURCES };
  localStorage.setItem(DB_KEY, JSON.stringify(initial));
  return initial;
}
function loadDB() { 
  const raw = localStorage.getItem(DB_KEY); 
  if(!raw) return seedDB();
  try { return JSON.parse(raw); } catch { return seedDB(); }
}
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }

export default function App() {
  const [db,setDb] = useState(loadDB);
  const [user,setUser] = useState(null);
  const [view,setView] = useState('home');
  const [theme,setTheme] = useState(null);
  const [msg,setMsg] = useState('');

  useEffect(()=>{saveDB(db)},[db]);

  function signupCustom(name){
    const id = `u_${Math.random().toString(36).slice(2,9)}`;
    const u = { id, username:name, createdAt:new Date().toISOString(), religion:null, points:0, level:1, streak:0, lastLogin:null, badges:[], completedQuizzes:[] };
    const newDb = {...db}; newDb.users[id]=u; setDb(newDb); setUser(u); setMsg(`Welcome ${name}`); 
  }

  function chooseReligion(key){ if(!user){setMsg('Signup first');return;}
    const updated={...user,religion:key}; setUser(updated); setTheme(RELIGION_THEMES[key]); setView('dashboard');
    const newDb={...db}; newDb.users[user.id]=updated; setDb(newDb);
  }

  return (
    <div className={`min-h-screen p-6 bg-gradient-to-br ${theme?.palette?.bg||'from-gray-50 to-white'}`}>
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Devotionalify</h1>
          <nav className="flex gap-3">
            <button onClick={()=>setView('home')}>Home</button>
            <button onClick={()=>setView('dashboard')}>Dashboard</button>
          </nav>
        </header>

        {!user && <SignupForm onSignup={signupCustom} />}
        {user && <div>Welcome {user.username}, Religion: {user.religion||'Not chosen'}</div>}
        {view==='home' && <div className="grid md:grid-cols-3 gap-3 mt-3">
          {Object.entries(RELIGION_THEMES).map(([k,t])=>(
            <div key={k} className={`p-4 border rounded bg-gradient-to-br ${t.palette.bg}`}>
              <div>{t.name} - {t.hero}</div>
              <button onClick={()=>chooseReligion(k)}>Select</button>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}
