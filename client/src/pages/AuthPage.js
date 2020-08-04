import React, { useState, useEffect } from 'react';
import { useHttp } from './../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = ()=>{
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email : "",
        password : ""
    });
    //Display reeor message
    useEffect( ()=>{
        message(error);
        clearError();
        //console.log("effect ",error );
    },[error,message, clearError] );
    //Using with Imputs
    const changeHandler = (event)=>{
        setForm({...form, [event.target.name] : event.target.value });
    };
    //
    const registerHandler = async ()=>{
        try{
          const data = await request('/api/auth/register', 'POST', {...form});
          message(data.message);  
        }catch(e){

        }
    };
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make shorten links</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Enter an email"
                                       id="email"
                                       type="email"
                                       name="email"
                                       className="yellow-input"
                                       onChange={changeHandler}    
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter a password"
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="yellow-input"
                                       onChange={changeHandler}       
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4"
                                style={ {marginRight:"10px"} }
                                disabled={loading}
                        > 
                            Sign in
                        </button>
                        <button className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}