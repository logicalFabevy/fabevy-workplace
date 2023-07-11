import classes from './Container.module.css';


const ContainerFluid = (props) => {
    return <div className={`${classes.containerFluid} ${props.className ? props.className : ''}`}>{props.children}</div>
}

export default ContainerFluid;