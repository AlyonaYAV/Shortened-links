import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = ()=>{
    const { token } = useContext(AuthContext);
    const linkId = useParams().id;
    const { request, loading } = useHttp();
    const [link, setLink] = useState(null);
    const getLink = useCallback( async ()=>{
        try{
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `AYAV ${token}`
            });
            setLink(fetched);
        }catch(error){

        }
    }, [token, linkId, request]);

    useEffect( ()=>{
        getLink();

    }, [getLink]);
    // While is loading display Loader
    if (loading){
        return <Loader />;
    }
    return (
        <>
            { !loading && link && <LinkCard link={ link } />}
        </>
    );
}