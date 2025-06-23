import React, { useState } from 'react';
import sha256 from 'crypto-js/sha256';
import { connectMetaMask } from '../utils/web3';
import './Auth.css';


export default function Auth() {
  const [form, setForm] = useState({ username: '', id: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { contract } = await connectMetaMask();

      const username = form.username.trim();
      const idHash = sha256(form.id).toString();
      const passwordHash = sha256(form.password).toString();

      if (!username) throw new Error("Username cannot be empty");
      if (idHash.length !== 64) throw new Error("ID hash must be 64 characters");
      if (passwordHash.length !== 64) throw new Error("Password hash must be 64 characters");

      const tx = await contract.registerUser(username, idHash, passwordHash);
      await tx.wait();

      alert("✅ Registration successful!");
      localStorage.setItem("auth", "true");
      localStorage.setItem("username", username);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Registration error:", err);
      const reason = err?.cause?.message || err?.message || "Unknown error";
      alert(`❌ Registration failed: ${reason}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { contract } = await connectMetaMask();

      const username = form.username.trim();
      const passwordHash = sha256(form.password).toString();

      if (!username || passwordHash.length !== 64) {
        throw new Error("Invalid username or password format");
      }

      const isValid = await contract.verifyUser(username, passwordHash);
      if (isValid) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("username", username);
        window.location.href = "/dashboard";
      } else {
        alert("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(`❌ Login failed: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        disabled={loading}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="ID (only for registration)"
        value={form.id}
        onChange={e => setForm({ ...form, id: e.target.value })}
        disabled={loading}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        disabled={loading}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button
        onClick={handleRegister}
        disabled={loading || !form.username || !form.id || !form.password}
        style={{ width: '100%', padding: 10, marginBottom: 8 }}
      >
        {loading ? 'Registering…' : 'Register'}
      </button>
      <button
        onClick={handleLogin}
        disabled={loading || !form.username || !form.password}
        style={{ width: '100%', padding: 10 }}
      >
        {loading ? 'Logging in…' : 'Login'}
      </button>
    </div>
  );
}
