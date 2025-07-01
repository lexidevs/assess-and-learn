import { render } from 'preact';
import Router from 'preact-router';
import { Assessment } from './Assessment';
import {Login} from './Login'; 
import { Course } from './Course';
import './style.css';





export function App() {
    return (
        <div className="app-container">
            <h1>Math Assessment App</h1>
            <section>
                <Router>
                    <Login path="/login" />
                    <Assessment path="/" />
					<Course path="/course/:uuid" />
                </Router>
            </section>
        </div>
    );
}

render(<App />, document.getElementById('app'));
