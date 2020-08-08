import React from 'react';
import { Link } from 'react-router-dom';

export const LinkList = ({ links })=>{
    if(!links.length){
        return (<p>Links don't exist</p>);
    }
    return (
        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>Original links</th>
              <th>Shorten links</th>
              <th>Open</th>
          </tr>
        </thead>

        <tbody>
            {
                links.map( (link, ind)=>{
                    return (
                        <tr key={link._id}>
                            <td>{ind + 1 }</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>
                                    Open link
                                </Link>
                            </td>
                        </tr>  
                    )
                })
            }
        </tbody>
      </table>
    )
}
