import { useState } from 'react';

function App() {
  const [ready] = useState(true);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>OctoFit Tracker</h1>
      <p>Modern React 19 + Vite frontend initialized on port 5173.</p>
      <section style={{ marginTop: '1.5rem' }}>
        <p>Status: {ready ? 'Ready to build' : 'Initializing...'}</p>
      </section>
    </main>
  );
}

export default App;
