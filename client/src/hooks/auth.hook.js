import {useState, useCallback, useEffect} from 'react';

export const useAuth = ()=>{
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setRady] = useState(false);

    const login = useCallback( (jwtToken, id)=>{
        //Seve to the state
        setToken(jwtToken);
        setUserId(id);
        //Save to LocalStorage
        window.localStorage.setItem("userData", JSON.stringify({
            token: jwtToken,
            userId: id
        }))
    }, []);
    const logout = useCallback( ()=>{
        //Reset state
        setToken(null);
        setUserId(null);  
        //Reset LocalStorage
        window.localStorage.removeItem("userData");
    }, []);

    useEffect( ()=>{
        //Get from LocalStorage
        const data = JSON.parse(window.localStorage.getItem("userData"));
        if(data && data.token) {
           login(data.token, data.userId);
        }
        //Authorizaition is completed
        setRady(true)
    },[login]);

    return {login, logout, token, userId, ready};
};