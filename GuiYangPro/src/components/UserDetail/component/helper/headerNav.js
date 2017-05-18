import React from 'react';

export function navInput(className, href, photo, info) {
  return (
        <div className={className}>
            <a href={href}><div style={{width: '50px', height: '50px'}}><img src={photo} /></div></a>
            <p>{info}</p>
        </div>
    );
}
