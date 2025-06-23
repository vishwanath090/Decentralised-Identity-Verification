import { useEffect, useState } from 'react';
import { connectMetaMask } from '../utils/web3';

export default function Dashboard() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      window.location.href = '/';
      return;
    }

    const loadUser = async () => {
      try {
        await connectMetaMask();
        const storedName = JSON.parse(auth)?.username || 'User';
        setUserName(storedName);
      } catch (err) {
        console.error("MetaMask connection failed:", err);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <img src="/assets/secure.png" alt="Secure" style={styles.icon} />
        <h1 style={styles.welcome}>Welcome, <span style={styles.name}>{userName}</span></h1>
        <p style={styles.subtext}>Your identity is secured on the blockchain.</p>
      </div>

      <div style={styles.card}>
        <ul style={styles.list}>
          <li>✅ Logged In</li>
          <li>🔐 Encrypted Access</li>
          <li>📅 {new Date().toLocaleDateString()}</li>
        </ul>
      </div>

      <button style={styles.logout} onClick={handleLogout}>Logout</button>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    padding: 30,
    background: 'linear-gradient(120deg, #e0f7fa, #ffffff)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  icon: {
    width: 60,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 600,
    color: '#263238',
  },
  name: {
    color: '#0288d1',
  },
  subtext: {
    fontSize: 14,
    color: '#546e7a',
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    padding: 20,
    width: '100%',
    maxWidth: 320,
    textAlign: 'left',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: 15,
    color: '#37474f',
    lineHeight: '1.8em',
  },
  logout: {
    marginTop: 30,
    padding: '10px 20px',
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
