import React, { useState } from "react";

export default function SignupForm({ onSignup }) {
  const [name, setName] = useState('');
  return (
    <div>
      <label className="block text-sm">Create Username</label>
      <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded mt-1" />
      <div className="mt-3">
        <button onClick={()=>onSignup(name || `user${Math.floor(Math.random()*9999)}`)} className="px-3 py-1 border rounded">Create</button>
      </div>
    </div>
  )
}
