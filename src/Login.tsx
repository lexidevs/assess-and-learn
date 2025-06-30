// TODO: so much styling

import { useState } from 'preact/hooks';

type AuthMode = 'login' | 'register';

export function Login() {
	const [mode, setMode] = useState<AuthMode>('login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setError(null);

		const endpoint = mode === 'login' ? 'http://localhost:3001/api/auth/login' : 'http://localhost:3001/api/auth/register';
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) {
				const data = await res.json();
				setError(data.message || 'Authentication failed');
			} else {
				window.location.href = '/';
			}
		} catch (err) {
			setError('Network error');
		}
	};

	return (
		<div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
			<h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
			<form onSubmit={handleSubmit as any}>
				<div>
					<label>
						Email:
						<input
							type="email"
							required
							value={email}
							onInput={e => setEmail((e.target as HTMLInputElement).value)}
						/>
					</label>
				</div>
				<div style={{ marginTop: 12 }}>
					<label>
						Password:
						<input
							type="password"
							required
							value={password}
							onInput={e => setPassword((e.target as HTMLInputElement).value)}
						/>
					</label>
				</div>
				{error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
				<button type="submit" style={{ marginTop: 16 }}>
					{mode === 'login' ? 'Login' : 'Register'}
				</button>
			</form>
			<div style={{ marginTop: 16 }}>
				{mode === 'login' ? (
					<span>
						Don't have an account?{' '}
						<button type="button" onClick={() => setMode('register')}>
							Register
						</button>
					</span>
				) : (
					<span>
						Already have an account?{' '}
						<button type="button" onClick={() => setMode('login')}>
							Login
						</button>
					</span>
				)}
			</div>
		</div>
	);
}