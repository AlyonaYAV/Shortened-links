import React from 'react';

export const LinkCard = ( {link} )=>{
    return (
        <>
            <h2>This is a link</h2>
            <p>It's your link:&nbsp;
                <a href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.to}
                </a>
            </p>
            <p>It's a link from:&nbsp;
                <a href={link.from} target="_blank" rel="noopener noreferrer">
                    {link.from}
                </a>
            </p>
            <p>Amount of clicks:&nbsp;
                <strong>{link.clicks}</strong>
            </p>
            <p>Creation date:&nbsp;
                <strong>{ new Date(link.date).toLocaleDateString() }</strong>
            </p>
        </>
    );
};