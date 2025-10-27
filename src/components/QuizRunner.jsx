import React, { useState } from "react";

export default function QuizRunner({ quiz, onSubmit }) {
  const [answers, setAnswers] = useState(() => Array(quiz.questions.length).fill(null));
  function setAnswer(i, v) {
    const copy = [...answers];
    copy[i] = v;
    setAnswers(copy);
  }
  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h3 className="font-semibold">{quiz.title}</h3>
      <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(answers); }} className="mt-3 space-y-4">
        {quiz.questions.map((q,i)=> (
          <div key={i} className="p-3 border rounded">
            <div className="font-medium">{q.q}</div>
            <div className="mt-2 flex flex-col gap-2">
              {q.choices.map((c,idx)=> (
                <label key={idx} className="flex items-center gap-2">
                  <input type="radio" name={`q${i}`} checked={answers[i]===idx} onChange={()=>setAnswer(i, idx)} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div>
          <button type="submit" className="px-4 py-2 border rounded">Submit Quiz</button>
        </div>
      </form>
    </div>
  );
}
