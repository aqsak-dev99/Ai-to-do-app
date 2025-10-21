import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import confetti from 'canvas-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Settings from './components/Settings';

const ItemType = 'TODO';

const TodoItem = ({ todo, index, toggleTodo, deleteTodo, moveTodo, editTodo }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: todo.id, index },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  }));
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: item => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    }
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editNote, setEditNote] = useState(todo.note || '');

  return (
    <li ref={node => drag(drop(node))} className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.isOverdue ? 'overdue' : ''}`} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
        {isEditing ? (
          <div style={{ flex: 1 }}>
            <input value={editText} onChange={e => setEditText(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.25rem', borderRadius: '8px', border: '1px solid #444' }} />
            <input value={editNote} onChange={e => setEditNote(e.target.value)} placeholder="Note" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid #444' }} />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button onClick={() => { editTodo(todo.id, editText, editNote); setIsEditing(false); }} style={{ padding: '0.25rem 0.5rem', background: '#3DDC97', color: 'white', border: 'none', borderRadius: '4px' }}>Save</button>
              <button onClick={() => setIsEditing(false)} style={{ padding: '0.25rem 0.5rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <span className="todo-text">{todo.text} {todo.note && <i style={{ fontSize: '0.8rem', opacity: 0.6 }}>({todo.note})</i>}</span>
            <span className={`badge ${todo.category.toLowerCase()}`}>{todo.category}</span>
            <span className={`badge ${todo.priority.toLowerCase()}`}>{todo.priority}</span>
            {todo.dueDate && <span className="badge" style={{ background: todo.isOverdue ? '#FF6B6B' : 'rgba(255,255,255,0.1)', color: todo.isOverdue ? 'white' : '#aaa' }}>{format(new Date(todo.dueDate), 'MMM d')}</span>}
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', color: '#9C88FF', cursor: 'pointer' }}>Edit</button>
        <button onClick={() => deleteTodo(todo.id)} style={{ background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}>Delete</button>
      </div>
    </li>
  );
};

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [points, setPoints] = useState(() => parseInt(localStorage.getItem('points')) || 0);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('streak')) || 0);
  const [lastCompletionDate, setLastCompletionDate] = useState(() => localStorage.getItem('lastCompletionDate') || null);
  const [aiTip, setAiTip] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'demo');
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('points', points);
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastCompletionDate', lastCompletionDate);
    localStorage.setItem('darkMode', isDarkMode);
    localStorage.setItem('mode', mode);
    localStorage.setItem('apiKey', apiKey);
    document.body.classList.toggle('light', !isDarkMode);
  }, [todos, points, streak, lastCompletionDate, isDarkMode, mode, apiKey]);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const tips = [
      "Break big tasks into 15-minute chunks for better focus.",
      "Use the 2-minute rule: if it takes <2 min, do it now.",
      "Prioritize: Do the hardest task first (eat the frog).",
      "Batch similar tasks to reduce context switching."
    ];
    setAiTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return toast.error('Task cannot be empty!');
    const todo = {
      id: uuidv4(),
      text: newTodo.trim(),
      note,
      category,
      priority,
      dueDate,
      completed: false,
      isOverdue: dueDate && new Date(dueDate) < new Date().setHours(0,0,0,0)
    };
    setTodos([todo, ...todos]);
    setNewTodo(''); setNote(''); setDueDate('');
    toast.success('Task Added!', { icon: 'Plus' });
  };

  const toggleTodo = id => {
    setTodos(prev => prev.map(t => {
      if (t.id === id && !t.completed) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setPoints(p => p + 10);
        updateStreak();
        toast.success('+10 XP!', { icon: 'Trophy' });
      }
      return t.id === id ? { ...t, completed: !t.completed } : t;
    }));
  };

  const deleteTodo = id => setTodos(prev => prev.filter(t => t.id !== id));
  const editTodo = (id, text, note) => setTodos(prev => prev.map(t => t.id === id ? { ...t, text, note } : t));
  const moveTodo = (from, to) => {
    const updated = [...todos];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setTodos(updated);
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (lastCompletionDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = lastCompletionDate === yesterday ? streak + 1 : 1;
    setStreak(newStreak);
    setLastCompletionDate(today);
    toast.success(`Streak: ${newStreak} days!`, { icon: 'Fire' });
  };

  const filtered = todos
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    .filter(t => filter === 'All' || (filter === 'Completed' ? t.completed : !t.completed) || t.category === filter);

  const progress = todos.length ? (todos.filter(t => t.completed).length / todos.length) * 100 : 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <ToastContainer position="top-right" theme={isDarkMode ? 'dark' : 'light'} />
        <div className="app-card glass">
          <div className="header">
            <div className="header-left">
              <img src="/logo/app-icon.png" alt="AI Todo" className="logo-sm" />
              <div>
                <h1>AI Todo</h1>
                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Smart Task Manager</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className={`toggle-container ${isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <div className="toggle-knob"></div>
              </div>
              <button onClick={() => setShowSettings(true)} style={{ background: 'none', border: 'none', color: '#9C88FF', fontSize: '1.4rem', cursor: 'pointer' }}>
                Settings
              </button>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div style={{ width: 50, height: 50, margin: '0 auto' }}>
                <CircularProgressbar value={progress} text={`${Math.round(progress)}%`} styles={buildStyles({ pathColor: '#9C88FF', textColor: '#9C88FF', trailColor: 'rgba(255,255,255,0.1)' })} />
              </div>
              <div className="stat-label">Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{points}</div>
              <div className="stat-label">XP</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Streak</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{todos.filter(t => t.completed).length}</div>
              <div className="stat-label">Done</div>
            </div>
          </div>
          <div className="ai-tip">
            {aiTip}
          </div>
          <div className="input-row">
            <input ref={inputRef} value={newTodo} onChange={e => setNewTodo(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} placeholder="New task..." />
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note" />
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option>Personal</option><option>Work</option><option>Study</option>
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <button onClick={addTodo}>Add</button>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#e0e7ff', marginBottom: '1rem' }} />
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {['All', 'Pending', 'Completed', 'Personal', 'Work', 'Study'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.6rem 1.2rem', background: filter === f ? '#9C88FF' : 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '0.9rem' }}>
              {f}
            </button>
            ))}
          </div>
          <ul className="todo-list">
            {filtered.map((todo, i) => (
              <TodoItem key={todo.id} todo={todo} index={i} toggleTodo={toggleTodo} deleteTodo={deleteTodo} moveTodo={moveTodo} editTodo={editTodo} />
            ))}
          </ul>
          <footer className="footer">
            <img src="/logo/logo.png" alt="Aqsa Khan" className="logo-sm" />
            <div>
              <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                Made by <strong>Aqsa-dev99</strong>
              </p>
              <div className="footer-links" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                <a href="https://github.com/aqsakhan" target="_blank">GitHub</a>
                <span>•</span>
                <a href="https://linkedin.com/in/aqsakhan" target="_blank">LinkedIn</a>
                <span>•</span>
                <a href="https://aqsakhan.dev" target="_blank">Portfolio</a>
              </div>
            </div>
          </footer>
        </div>
        {showSettings && (
          <Settings
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            mode={mode}
            setMode={setMode}
            apiKey={apiKey}
            setApiKey={setApiKey}
            clearAllTodos={() => { setTodos([]); toast.success('All tasks cleared!'); }}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </DndProvider>
  );
}