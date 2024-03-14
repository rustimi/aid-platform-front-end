import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useEffect } from 'react';

export default function LogoutPage() {
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.logout()){
            navigate('/');    
        }
    }, []);

}