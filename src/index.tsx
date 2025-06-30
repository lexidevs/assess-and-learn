import { render } from 'preact';
import { Assessment } from './Assessment'; // <-- Import your Assessment component

import './style.css';

export function App() {
    return (
        <div className="app-container">
            <h1>Math Assessment App</h1>
            <section>
                <Assessment />
            </section>
        </div>
    );
}

render(<App />, document.getElementById('app'));
