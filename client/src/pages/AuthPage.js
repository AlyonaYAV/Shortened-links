import React from 'react';

export const AuthPage = ()=>{
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make shorten links</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Enter an email" id="email" type="email" name="email" className="yellow-input" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter an password" id="password" type="password" name="password" className="yellow-input" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={ {marginRight:"10px"} }> 
                            Sign in
                        </button>
                        <button className="btn grey lighten-1 black-text">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}