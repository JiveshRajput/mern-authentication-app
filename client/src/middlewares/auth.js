import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/store';

export function AuthUser({ children }) {
    let token = localStorage.getItem('token');
    if (!token) return <Navigate to='/' replace={true} />

    return children;
}

export function ProtectRoute({ children }) {
    let username = useAuthStore((store)=> store.auth.username);
    if (!username) return <Navigate to='/' replace={true} />

    return children;
}