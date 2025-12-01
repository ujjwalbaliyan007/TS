import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('/api/user/me', { name, bio }, {
                headers: { Authorization: token }
            });
            updateUser(res.data.user);
            setMessage('Profile updated successfully');
            setIsEditing(false);
            setTimeout(() => setMessage(''), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <div>
            <nav style={{
                background: 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--border)',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
                <button
                    onClick={logout}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--text-main)',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem'
                    }}
                >
                    Sign Out
                </button>
            </nav>

            <div className="container" style={{ marginTop: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ margin: 0 }}>Profile Information</h2>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-primary"
                                style={{ width: 'auto', padding: '0.5rem 1rem' }}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message && <div style={{ color: '#22c55e', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.25rem' }}>{message}</div>}
                    {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.25rem' }}>{error}</div>}

                    {isEditing ? (
                        <form onSubmit={handleUpdate}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Bio</label>
                                <textarea
                                    className="input-field"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={4}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn-primary">Save Changes</button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-main)',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        flex: 1
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Email</label>
                                <div style={{ fontSize: '1.125rem' }}>{user?.email}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Name</label>
                                <div style={{ fontSize: '1.125rem' }}>{user?.name}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Bio</label>
                                <div style={{ fontSize: '1.125rem', lineHeight: '1.5' }}>{user?.bio || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No bio added yet</span>}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
