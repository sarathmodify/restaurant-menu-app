import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ marginBottom: '1.5rem' }}>Page Not Found</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--color-gray)' }}>
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="btn-primary"
                style={{
                    textDecoration: 'none',
                    display: 'inline-block'
                }}
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
