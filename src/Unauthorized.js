
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>🚫 Access Denied</h2>
            <p>You do not have permission to access this page.</p>
            <Link to="/login">🔑 Back to Login</Link>
        </div>
    );
};

export default Unauthorized;
