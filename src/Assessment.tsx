import { useState, useEffect } from 'preact/hooks';

export function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setInputs(Array(data.length).fill(''));
        setLoading(false);
      });
  }, []);

  // MathJax typeset effect
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [questions, results]);

  function handleInputChange(idx, value) {
    const newInputs = [...inputs];
    newInputs[idx] = value;
    setInputs(newInputs);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const graded = questions.map((q, i) => ({
      ...q,
      userAnswer: inputs[i]
    }));
    setResults(graded);
  }

  if (loading) return <div>Loading questions...</div>;
  if (questions.length === 0) return <div>No questions available.</div>;

  if (results) {
    return (
      <div>
        <h2>Results</h2>
        <ul className="results-list">
          {results.map((r, i) => (
            <li key={i}>
              <span
                dangerouslySetInnerHTML={{
                  __html: r["text-tex"] ? r["text-tex"] : r.text
                }}
              /> — Your answer: {r.userAnswer} ({r.userAnswer === r.answer ? "Correct" : "Incorrect"})
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul className="questions-list">
        {questions.map((q, idx) => (
          <li key={q.id || idx}>
            <p>
              <span
                dangerouslySetInnerHTML={{
                  __html: q["text-tex"] ? q["text-tex"] : q.text
                }}
              />
            </p>
            <input
			  type="text"
			  id={`question-${idx}`}
              value={inputs[idx] || ''}
              onInput={e => handleInputChange(idx, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button type="submit">Submit All</button>
    </form>
  );
}