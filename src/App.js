import React, { useState, useRef, useEffect } from 'react';
import './style.css';

export default function App() {
  const [enter, setEnter] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [words, setWords] = useState(0);
  const [time, setTime] = useState('');
  const [text, setText] = useState('');
  const textBoxRef = useRef(null);
  const [reasonable, setReasonable] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (isRunning && time > 0) {
      setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      if (time == 0) end();
    }
  }, [time, isRunning]);

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleTime(event) {
    const result = event.target.value.replace(/\D/g, '');

    setTime(result);
  }

  function numWords(text) {
    const arr = text.split(' ');
    return arr.filter((word) => word !== '').length;
  }

  function start() {
    setIsRunning(true);
    setText('');
    setTime(startTime);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function end() {
    setIsRunning(false);
    setWords(numWords(text));
  }

  function access(event) {
    event.preventDefault();
    const result = parseInt(time);
    if (result > 60 || result < 0) {
      setReasonable(true);
    } else {
      setTime(result);
      setStartTime(result);
      setEnter(true);
      setReasonable(false);
    }
  }
  return (
    <main>
      {enter ? (
        <div>
          <h1>How <span>fast</span> do you type?</h1>
          <textarea
            ref={textBoxRef}
            disabled={!isRunning}
            value={text}
            onChange={handleChange}
          />
          <h3>Time remaining: {time}</h3>
          <button onClick={start} disabled={isRunning}>
            {!isRunning ? 'START' : 'TYPE'}
          </button>
          <h2>Word Count: {words}</h2>
        </div>
      ) : (
        <div>
          <form onSubmit={access}>
            <h1>How <span>fast</span> do you type</h1>
            {reasonable && <h2>Use a number below 60 and above 0</h2>}
            <input
              className="input"
              type="text"
              value={time}
              placeholder="in this much time?"
              onChange={handleTime}
            />
          </form>
        </div>
      )}
    </main>
  );
}
