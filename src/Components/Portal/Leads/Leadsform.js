import React, { useEffect, useState } from 'react';
import './Leadsform.css';
import { useDispatch } from 'react-redux';
import { sendUpdateRequest } from '../../../Rdxstore/leads-slice';
import Flexbox from '../../Flexbox/Flexbox';
import Col from '../../Flexbox/Col';


const Leadsform = (props) =>{

    const dispatch = useDispatch();
    //set input default
    const [inptLead, setInptLead] = useState({
        leadStatus:"",
        assignTo: "",
        leadsNote:""
    })
    const [getLeadItem , setLeadItem] = useState({})
    
    //On change input
    const onInputHandler = (event) => {
        setInptLead((prev) => {return {...prev, [event.target.name]: event.target.value}})
    }
    
    //On update data
    const onUpdateAction = (event)=>{
        event.preventDefault();
        const getData = props.updateLead;
        const updateLeadItem = {
            id: getData.id,
            leadsName: getData.leadsName,
            leadsEmail: getData.leadsEmail,
            leadsMobile: getData.leadsMobile,
            leadsDegree: getData.leadsDegree,
            lookingFor: getData.lookingFor,
            leadsNote: inptLead.leadsNote,
            leadsStatus: inptLead.leadStatus,
            leadsAssign: inptLead.assignTo
        } 
        dispatch(sendUpdateRequest(updateLeadItem));
       
    }



    useEffect(()=>{
        if(props.updateLead){
            setLeadItem({...props.updateLead})
            const editeInpt = props.updateLead;
            setInptLead({
                leadStatus:editeInpt.leadsStatus,
                assignTo:editeInpt.leadsAssign,
                leadsNote: editeInpt.leadsNote ? editeInpt.leadsNote : ""
            })
            
        }
    }, [props.updateLead])

    return (
        <div className={ `${props.updateLead ? "model-bx active":"model-bx"}`}>
            <div className='model-bx-body'>
                <div className='model-title'>
                    <h3>Leads Action </h3>
                </div>
                <form className='forms' onSubmit={onUpdateAction}>
                    <Flexbox>
                        <Col lg={4} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <input type='text' defaultValue={getLeadItem.leadsName} className='forms-controll' disabled />
                            </div>
                        </Col>
                        <Col lg={4} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <div className='forms-group'>
                                    <input type='text' defaultValue={getLeadItem.leadsEmail} className='forms-controll' disabled />
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <input type='text' defaultValue={getLeadItem.leadsMobile} className='forms-controll' disabled />
                            </div>
                        </Col>
                        <Col lg={6} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <div className='forms-group'>
                                    <input type='text' defaultValue={getLeadItem.leadsDegree} className='forms-controll' disabled />
                                </div>
                            </div>
                        </Col> 
                        <Col lg={6} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <div className='forms-group'>
                                    <input type='text' defaultValue={getLeadItem.lookingFor} className='forms-controll' disabled />
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <select name='leadStatus' className='forms-controll' 
                                    onChange={onInputHandler} 
                                    value={inptLead.leadStatus}>
                                    <option value="Generator">Generator</option>
                                    <option value="Proposed">Proposed</option>
                                    <option value="Interest">Interest</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Dropped">Dropped</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg={6} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <select name='assignTo' className='forms-controll' 
                                    onChange={onInputHandler} 
                                    value={inptLead.assignTo}>
                                    <option value="Pradeep">Pradeep</option>
                                    <option value="Prema">Prema</option>
                                    <option value="Abbas">Abbas</option>
                                    
                                </select>
                            </div>
                        </Col>
                        <Col lg={12} style={{paddingLeft:"10px",paddingRight:"10px",}}>
                            <div className='forms-group'>
                                <textarea name='leadsNote' placeholder='Leads Note...' className='forms-controll' 
                                value={inptLead.leadsNote} onChange={onInputHandler} ></textarea>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <button className='btns btns-primary' type='submit'>Update</button>
                            <button className='btns btns-secondary' type='button' onClick={props.onEdite.bind(null, null)} style={{marginLeft:"10px"}}>Cancel</button>
                        </Col>    
                    </Flexbox>
                    
                    
                </form>
            </div>
            
        </div>
    )

}

export default Leadsform;