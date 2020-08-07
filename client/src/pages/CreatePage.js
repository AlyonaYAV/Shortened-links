import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from './../hooks/http.hook';
import {AuthContext} from './../context/AuthContext';
import {useHistory} from 'react-router-dom';

export const CreatePage = ()=>{
    const history = useHistory();
    const [link,setLink] = useState('');
    const { request } = useHttp();
    const auth = useContext(AuthContext);
    // Call as componentDidMount
    useEffect( ()=>{
        //Materialize clear inputs
        window.M.updateTextFields();
    },[]);
    //Handle the Input when press Enter
    const pressHandler = async (e)=>{
        if(e.key === "Enter") {
            try{
                const data = await request(
                  '/api/link/generate',
                  'POST',
                  {from: link},
                  {Authorization: `AYAV ${auth.token}`}
                );
                history.push(`/detail/${data.link._id}`);
                console.log(data);
            }catch(e){}
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={ {paddingTop: '2rem'} }>
                <div className="input-field">
                    <input placeholder="link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={ (event)=>{setLink(event.target.value);} }
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Create link</label>
                </div>
            </div>
            <p>{link}</p>
        </div>
    );
}