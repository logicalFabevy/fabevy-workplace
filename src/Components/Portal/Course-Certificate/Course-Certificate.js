import "./Course-Certificate.css";
import OffcanvasBox from "../../../UI/Offcanvas/OffcanvasBox";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { REQUIRE_LETTER, VALIDATOR_REQUIRE, VALIDATOR_URL } from "../../Validation/Validation";
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { addCertificate, fetchCertificate } from "../../../Rdxstore/certificate-slice";
import { v4 as uuid } from 'uuid';

const CourseCertificate = () => {

    const baseURL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const certificates = useSelector(state => state.certificate);
    const dispatch = useDispatch();
    let certificateItems;
    if(certificates.item.length > 0){
        certificateItems = [...certificates.item].sort((a, b)=> {
            if (a.updatedAt < b.updatedAt) return -1;
            if (a.updatedAt > b.updatedAt) return 1;
            return 0;
        });
    }
    
    
    // console.log(certificateItems)
    // const certificatesData = certificates;
    
    useEffect(()=>{
        dispatch(fetchCertificate());
    }, [])


    const [certificateId, dispatchCertificateId] = useReducer(VALIDATOR_REQUIRE, {value: "",isValid: null, msg: ""});
    const [studentId, dispatchStudentId] = useReducer(VALIDATOR_REQUIRE, {value: "",isValid: null, msg: ""});
    const [fName, dispatchFname] = useReducer(VALIDATOR_REQUIRE, {value: "",isValid: null,msg: ""});
    const [lName, dispatchLname] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: ""});
    const [batch, dispatchBatch] = useReducer(VALIDATOR_REQUIRE, { value: "", isValid: null, msg: ""});
    const [course, dispatchCourse] = useState("front-end developer");
    const [duration, dispatchDuration] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: ""});
    const [grade, dispatchGrade] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: "" });
    const [attendance, dispatchAttendance] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: ""});
    const [tasks, dispatchTasks] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: ""});
    const [projects, dispatchProjects] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: ""});
    const [profileUrl, dispatchprofileUrl] = useReducer(VALIDATOR_URL, {value: "", isValid: null, msg: ""});
    const [completionStartDate, dispatchCompletionStartDate] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: ""});
    const [completionEndDate, dispatchCompletionEndDate] = useReducer(VALIDATOR_REQUIRE, {value: "", isValid: null, msg: ""});


    const [formIsValid, setformIsValid] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [isCreated, setIsCreated] = useState(null);
    const [messageAlert, setMessageAlert] = useState("");
    const { isValid: isCertificateId } = certificateId;
    const { isValid: isStudentId } = studentId;
    const { isValid: isFname } = fName;
    const { isValid: isLname } = lName;
    const { isValid: isBatch } = batch;
    const { isValid: isCourse } = course;
    const { isValid: isDuration } = duration;
    const { isValid: isGrade } = grade;
    const { isValid: isAttendance } = attendance;
    const { isValid: isTasks } = tasks;
    const { isValid: isProjects } = projects;
    const { isValid: isProfileUrl } = profileUrl;
    const { isValid: isCompletionStartDate } = completionStartDate;
    const { isValid: isCompletionEndDate } = completionEndDate;


    //Form validate loader
    useEffect(() => {
        const identifier = setTimeout(() => {
            setformIsValid(isCertificateId && isStudentId && isFname && isLname && isBatch && isDuration && isGrade && isAttendance && isTasks && isProjects && isProfileUrl && isCompletionStartDate && isCompletionEndDate);
        }, 500);
        return () => {
            clearTimeout(identifier);
        };
    }, [isCertificateId && isStudentId && isFname && isLname && isBatch && isDuration && isGrade && isAttendance && isTasks && isProjects && isProfileUrl && isCompletionStartDate && isCompletionEndDate]);

    const onInputHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        if(name === "certificateid"){
            dispatchCertificateId({ type: "REQUIRE", val: val, msg:"Please Enter Certificate ID" });
        }
        if (name === "studentid") {
            dispatchStudentId({ type: "REQUIRE", val: val, msg:"Please Enter Student ID" });
        }
        if (name === "firstname") {
            dispatchFname({ type: "REQUIRE", val: val, msg:"Please Enter first name" });
        }
        if (name === "lastname") {
            dispatchLname({ type: "REQUIRE", val: val, msg:"Please Enter lastname"});
        }
        if (name === "batch") {
            dispatchBatch({ type: "REQUIRE", val: val, msg:"Please Enter batch name"});
        }
        if (name === "course") {
            dispatchCourse(val);
        }
        if (name === "duration") {
            dispatchDuration({ type: "REQUIRE", val: val, msg:"Please Enter duration"});
        }
        if (name === "grade") {
            dispatchGrade({ type: "REQUIRE", val: val, msg:"Please Enter grade"});
        }
        if (name === "attendance") {
            dispatchAttendance({ type: "REQUIRE", val: val, msg:"Please Enter attendance"});
        }
        if (name === "tasks") {
            dispatchTasks({ type: "REQUIRE", val: val, msg:"Please Enter tasks"});
        }
        if (name === "projects") {
            dispatchProjects({ type: "REQUIRE", val: val, msg:"Please Enter projects"});
        }
        if (name === "profileurl") {
            dispatchprofileUrl({ type: "URL", val: val, msg:"Please Enter profile url"});
        }
        if (name === "completionstartdate") {
            dispatchCompletionStartDate({ type: "REQUIRE", val: val, msg:"Please select completion start date"});
        }
        if (name === "completionenddate") {
            dispatchCompletionEndDate({ type: "REQUIRE", val: val, msg:"Please select completion end date"});
        }
       
        setformIsValid(isStudentId && isFname && isLname && isBatch && isCourse && isDuration && isGrade && isAttendance && isTasks && isProjects && isProfileUrl && isCompletionStartDate && isCompletionEndDate);
    };

    //Clear input data
    const clearInputData = (e) =>{
        // e.preventDefault();
        dispatchFname({type:""});
        dispatchLname({type:""});
        dispatchBatch({type:""});
        dispatchCourse("front-end developer");
        dispatchTasks({type:""});
        dispatchAttendance({type:""});
        dispatchDuration({type:""});
        dispatchStudentId({type:""});
        dispatchCertificateId({type:""});
        dispatchProjects({type:""});
        dispatchGrade({type:""});
        dispatchprofileUrl({type:""});
        dispatchCompletionStartDate({type:""})
        dispatchCompletionEndDate({type:""})
    }

    //On validate
    const onInptValid = ()=>{
        dispatchCertificateId({ type: "REQUIRE", val: certificateId.value, msg:"Please Enter Certificate ID" });
        dispatchStudentId({ type: "REQUIRE", val: studentId.value, msg:"Please Enter Student ID" });
        dispatchBatch({ type: "REQUIRE", val: batch.value, msg:"Please Enter batch name"});
        dispatchFname({ type: "REQUIRE", val: fName.value, msg:"Please Enter first name" });
        dispatchLname({ type: "REQUIRE", val: lName.value, msg:"Please Enter lastname"});
        dispatchDuration({ type: "REQUIRE", val: duration.value, msg:"Please Enter duration"});
        dispatchGrade({ type: "REQUIRE", val: grade.value, msg:"Please Enter grade"});
        dispatchAttendance({ type: "REQUIRE", val: attendance.value, msg:"Please Enter attendance"});
        dispatchTasks({ type: "REQUIRE", val: tasks.value, msg:"Please Enter tasks"});
        dispatchProjects({ type: "REQUIRE", val: projects.value, msg:"Please Enter projects"});
        dispatchprofileUrl({ type: "URL", val: profileUrl.value, msg:"Please Enter profile url"});
        dispatchCompletionStartDate({ type: "REQUIRE", val: completionStartDate.value, msg:"Please select completion start date"});
        dispatchCompletionEndDate({ type: "REQUIRE", val: completionEndDate.value, msg:"Please select completion end date"});
    }

    //On submit certificate data
    const onSubmitUser = async (event) => {
        event.preventDefault();
        onInptValid();
        let isValidId = false;
        if(formIsValid){
            isValidId = true;
            if(certificateItems){
                for(let i = 0; i < certificateItems.length; i++){
                    if(certificateId.value === certificateItems[i].certificateId){
                        dispatchCertificateId({ type: "INVALID", val: certificateId.value, msg:"This certificate ID is exist." });
                        isValidId = false;
                    }else if(studentId.value === certificateItems[i].studentId){
                        dispatchStudentId({ type: "INVALID", val: studentId.value, msg:"This Student ID is exist." });
                        isValidId = false;
                    }
                }
            }
        }
        
        if(isValidId){         
            const unique_id = uuid();
            const certificateData = {
                id:unique_id,
                firstname:fName.value,
                lastname:lName.value,
                batch:batch.value,
                course:course,
                duration:duration.value,
                grade:grade.value,
                attendance:attendance.value,
                tasks:tasks.value,
                projects:projects.value,
                studentId:studentId.value,
                certificateId:certificateId.value,
                profileUrl: profileUrl.value,
                completionStartDate: completionStartDate.value,
                completionEndDate: completionEndDate.value
            }

            setIsLoad(true);
            try {
                const response = await axios.post(`${baseURL}/course-certificate/create-certificate/`, {...certificateData});
                const data = response.data;
                console.log(data)
                setIsLoad(false);
                if(data.status === 400){
                    setIsCreated(false);
                    setMessageAlert("Unable to create Certificate. Please try again")
                    setTimeout(() => {
                        setMessageAlert("");
                        setIsCreated(null);
                    }, 3000);
                    return;
                }

                if(data.status === 200){
                    //Fetch updated data
                    dispatch(addCertificate(certificateData));
                    //Clear inputs
                    clearInputData();
                    setMessageAlert("Certificate created successfully");
                    setIsCreated(true);
                    setTimeout(() => {
                        setMessageAlert("");
                        setIsCreated(null);

                    }, 3000);
                }
                
            } 
            catch (err) {
                console.log(err);
                setIsLoad(false);
                setMessageAlert("Sorry something went wrong. Please try again");
                setIsCreated(false);
                setTimeout(() => {
                    setMessageAlert("");
                    setIsCreated(null);
                }, 3000);
            }
        }
        
    };


    

     return (
        <>
            <div className="page-component">
                <div className="page-title d-flex justify-content-between">
                    <h2>Course Certificate</h2>
                    <button
                    className="btns btns-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#addcertificate"
                    aria-controls="offcanvasExample"
                    >
                    Add Certificate
                    </button>
                </div>
                <div className="card-section">
                    <div className="layout-title">
                    <h3>Certificate Details</h3>
                    </div>
                    {certificates.isLoad && <p>Loading...</p>}
                    {
                        !certificates.isLoad &&
                        <table className="tables">
                            <tbody>
                                <tr>
                                    <th>Certificate ID</th>
                                    <th>Student ID</th>
                                    <th>Name</th>
                                    <th>Batch</th>
                                    <th>Course</th>
                                    <th>Duration</th>
                                    <th>Completion Date</th>
                                    <th>Grade</th>
                                    <th>Attendance</th>
                                    <th>Tasks</th>
                                    <th>Projects</th>
                                </tr>
                                {
                                    certificates.item.length > 0 && 
                                    certificateItems.map((items, indx)=>{
                                        
                                        return <tr key={indx}>
                                                    <td>{items.certificateId}</td>
                                                    <td>{items.studentId}</td>
                                                    <td>{items.firstname}{" "}{items.lastname}</td>
                                                    <td>{items.batch}</td>
                                                    <td>{items.course}</td>
                                                    <td>{items.duration} Months</td>
                                                    <td>{items.completionStartDate} - {items.completionEndDate}</td>
                                                    <td>{items.grade}</td>
                                                    <td>{items.attendance}</td>
                                                    <td>{items.tasks}</td>
                                                    <td>{items.projects}</td>
                                                </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
            <OffcanvasBox showid="addcertificate" title="Add Certificate">
                <form className="col-7 row" onSubmit={onSubmitUser}>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Certificate ID</label>
                            <input
                            type="text"
                            placeholder=""
                            name="certificateid"
                            className="form-control ps-3"
                            value={certificateId.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {certificateId.isValid == false ? (
                            <p className="error-msg">{certificateId.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Student ID</label>
                            <input
                            type="text"
                            placeholder=""
                            name="studentid"
                            className="form-control ps-3"
                            value={studentId.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {studentId.isValid == false ? (
                            <p className="error-msg">{studentId.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                            type="text"
                            placeholder=""
                            name="firstname"
                            className="form-control ps-3"
                            value={fName.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {fName.isValid == false ? (
                            <p className="error-msg">{fName.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                            type="text"
                            placeholder=""
                            name="lastname"
                            className="form-control ps-3"
                            value={lName.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {lName.isValid == false ? (
                            <p className="error-msg">{lName.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Batch Name</label>
                            <input
                            type="text"
                            placeholder=""
                            name="batch"
                            className="form-control ps-3"
                            value={batch.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {batch.isValid == false ? (
                            <p className="error-msg">{batch.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Course</label>
                            <select 
                            className="form-control ps-3" 
                            name="course"
                            value={course}
                            onChange={onInputHandler}
                            >
                                <option value="front-end developer">Front end Developer</option>
                                <option value="full stack developer">Full stack Developer</option>
                                <option value="back-end development">Back end Development</option>
                                <option value="ui-ux designer">UI/UX Designer</option>
                                <option value="manual testing">Manual Testing</option>
                                <option value="api testing">API Testing</option>
                            </select>
                            
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {course.isValid == false ? (
                            <p className="error-msg">{course.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Profile Url</label>
                            <input
                            type="text"
                            placeholder="https://github.com"
                            name="profileurl"
                            className="form-control ps-3"
                            value={profileUrl.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {profileUrl.isValid == false ? (
                            <p className="error-msg">{profileUrl.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Duration</label>
                            <input
                            type="text"
                            placeholder=""
                            name="duration"
                            className="form-control ps-3"
                            value={duration.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {duration.isValid == false ? (
                            <p className="error-msg">{duration.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Completion Start Date</label>
                            <input
                            type="date"
                            placeholder=""
                            name="completionstartdate"
                            className="form-control ps-3"
                            value={completionStartDate.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {completionStartDate.isValid == false ? (
                            <p className="error-msg">{completionStartDate.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Completion End Date</label>
                            <input
                            type="date"
                            placeholder=""
                            name="completionenddate"
                            className="form-control ps-3"
                            value={completionEndDate.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {completionEndDate.isValid == false ? (
                            <p className="error-msg">{completionEndDate.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Grade</label>
                            <input
                            type="text"
                            placeholder=""
                            name="grade"
                            className="form-control ps-3"
                            value={grade.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {grade.isValid == false ? (
                            <p className="error-msg">{grade.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Attendance</label>
                            <input
                            type="text"
                            placeholder=""
                            name="attendance"
                            className="form-control ps-3"
                            value={attendance.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {attendance.isValid == false ? (
                            <p className="error-msg">{attendance.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Tasks</label>
                            <input
                            type="text"
                            placeholder=""
                            name="tasks"
                            className="form-control ps-3"
                            value={tasks.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {tasks.isValid == false ? (
                            <p className="error-msg">{tasks.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Projects</label>
                            <input
                            type="text"
                            placeholder=""
                            name="projects"
                            className="form-control ps-3"
                            value={projects.value}
                            onChange={onInputHandler}
                            />
                            {/* <i className="fa fa-user-o" aria-hidden="true"></i> */}
                            {projects.isValid == false ? (
                            <p className="error-msg">{projects.msg}</p>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                    

                    <div className="text-left">
                        {isCreated !== null && <p className={`${isCreated == false ? "msg error-msg":"msg success-msg"}`}>{messageAlert}</p>}
                        <button type="submit" className="btns btns-primary" disabled={isLoad}>
                            {isLoad &&
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            }
                            Submit
                        </button>
                        <button type="button" onClick={clearInputData} className="btns btns-secondary ms-3">Clear</button>
                    </div>
                </form>
            </OffcanvasBox>
        </>
        
  );
};
export default CourseCertificate;
