import React, { useEffect, useState } from 'react';
import './Webinar.css';
import { useDispatch, useSelector } from 'react-redux';
import Leadsform from './Leadsform';
import {ConfirmAlertBx} from '../../../UI/ModelBox/ConfirModelBox';
import { fetchAll, sendRemoveData } from '../../../Rdxstore/leads-slice';

const Leads = (props) =>{
    const dispatch = useDispatch();
    // const leadState = useSelector(state => state);
    const leadState = useSelector(state => state.leads);
    const [isModel, setisModel] = useState(false);
    const [updateLeadId, setupdateLeadId] = useState(null);

    useEffect(()=>{
        dispatch(fetchAll());
    }, [leadState.changes, dispatch])

    const onEditeTb = (leadData)=>{
        // setisModel(isEdit);
        setupdateLeadId(leadData)
    }

    const onRemoveLead = (removeItem)=>{
       
        ConfirmAlertBx(
            {
                title: 'Confirm to Delete',
                message: 'Are you sure to delete this lead.?.',
                buttons: [
                    {
                    label: 'Yes',
                    onClick: () => dispatch(sendRemoveData(removeItem))
                    },
                    {
                    label: 'No',
                    // onClick: () => alert('Click No')
                    }
                ]
            }
        );

    }
    
    //table pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const endNo = currentPage * perPage;
    const fromNo = endNo - perPage;
    const currentRecords = leadState.items?.slice(fromNo, endNo);
    const nPages = Math.ceil(leadState.items?.length / perPage)
    const pageNumbers =  nPages ? [...Array(nPages + 1).keys()].slice(1) : [];

    const nextPage = () => {
        if(currentPage !== nPages) {setCurrentPage(currentPage + 1)}
    }
    const prevPage = () => {
        if(currentPage !== 1){setCurrentPage(currentPage - 1)}
    }
    

    return (
        <div className='page-component'>
            <div className='page-title'>
                <h2>Webinar Leads</h2>
            </div>
            <div className='card-section'>
                <div className='layout-title'>
                    <h3>Leads for Back End Developer</h3>
                </div>
                <table className='tables'>
                    <tbody >
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Degree</th>
                            <th>Looking For</th>
                            <th>Status</th>
                            {/* <th>Assign</th>
                            <th>Note</th>
                            <th>Action</th> */}
                        </tr>
                        {
                            leadState.loadData ? (<tr><td colSpan="9">loading...</td></tr>) : (
                                currentRecords.map((item, indx) => {
                                    let dateFormate = item.createdAt.split(',');
                                    return  <tr key={indx}>
                                                <td valign='top'>{dateFormate[0]} <br/> {dateFormate[1]}</td>
                                                <td valign='top'>{item.leadsName}</td>
                                                <td valign='top'>{item.leadsEmail}</td>
                                                <td valign='top'>{item.leadsMobile}</td>
                                                <td valign='top'>{item.leadsDegree}</td>
                                                <td valign='top'>{item.lookingFor}</td>
                                                <td valign='top'>{item.leadsStatus}</td>
                                                {/* <td valign='top'> {item.leadsAssign}</td>
                                                <td valign='top'>{item.leadsNote ? item.leadsNote : "Null" }</td>
                                                <td>
                                                    <button className='td-update' onClick={onEditeTb.bind(null, item)}><i className="fa fa-user-plus" aria-hidden="true"></i></button>
                                                    <button className='td-delete' onClick={onRemoveLead.bind(null, item)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                                </td> */}
                                            </tr>
                            })
                            )
                        }
                    </tbody>
                    
                </table>
                {
                    !leadState.loadData && 
                    <div id="table-control" className="table-control d-flex align-items-center justify-content-between">
                        <div className="table-item-view">
                            <span>Showing</span> 
                            <span>{fromNo === 0 ? 1 : fromNo} - {endNo > leadState.items?.length ? leadState.items?.length : endNo}</span>
                            <span>of</span>
                            <span className="tl-tb-items">{leadState.items?.length}</span>
                            
                        </div>
                        
                        <nav aria-label="Page navigation example">
                            <ul className="pagination flex-wrap">
                                <li className="page-item"><a onClick={prevPage} className="page-link" href="#">Previous</a></li>
                                {
                                    pageNumbers.map(pageNo => {
                                        return <li key={pageNo} className={`page-item ${currentPage == pageNo ? 'active': ''}`}>
                                                <a className="page-link" href="#" onClick={() => setCurrentPage(pageNo)}>{pageNo}</a>
                                            </li>
                                    })
                                }
                                <li className="page-item"><a onClick={nextPage} className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                        
                    </div>
                }
                
            </div>
            <Leadsform onEdite={onEditeTb} updateLead={updateLeadId} />
        </div>
        
        
    )
}

export default Leads;