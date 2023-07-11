import classes from './Col.module.css';

const Col = (props) => {
    return <div 
            className={`${props.xs ? classes['col-xs-'+props.xs] : ''} ${props.sm ? classes['col-sm-'+props.sm] : ''} ${props.md ? classes['col-md-'+props.md] : ''}
            ${props.lg ? classes['col-lg-'+props.lg] : ''} ${props.className ? props.className : ''} `
            } style={props.style ? props.style : {}}>{props.children}</div>
}

export default Col;