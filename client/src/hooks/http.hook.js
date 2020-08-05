import {useState, useCallback} from 'react';

 //This hook defines whether something is loading or not
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //Chached function
    const request = useCallback( async (url, method = 'GET', body = null, headers= {})=>{
        setLoading(true);
        try{
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';            }
            const response = await window.fetch(url, {method, body, headers});
            const data = await response.json();
            //console.log("Resspons", response);
            if(!response.ok) {
                throw new Error(data.message || "Something went wrong...");
            }
            setLoading(false);
            return data;
        }catch(e){
            //console.log("Error", e.message);
            setLoading(false);
            setError(e.message);
            //To process an error in Componets
            throw e;
        }
    },[] );
    const clearError = useCallback( ()=>setError(null), []);
    return { loading, request, error, clearError };
}