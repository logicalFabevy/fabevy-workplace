import classes from './Flexbox.module.css';

const Flexbox = (props) => {
    return <div className={`${classes.row} ${props.className ? props.className : ''}`}>{props.children}</div>
}

export default Flexbox;