import classes from './Flexbox.module.css';
import React from 'react';
const Flexbox = (props) => {
    return <div className={`${classes.row} ${props.className ? props.className : ''}`}>{props.children}</div>
}

export default Flexbox;