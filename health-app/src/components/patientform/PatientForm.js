import React, { useState,useContext,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../login/AuthContext';
import { apiUrl } from '../../config';

const PatientForm = (props) => {
    const { user, login, logout } = useContext(AuthContext);
    var patientdata = JSON.parse(props.patientdata);    
    const [isReportSaved,setIsReportSaved] = useState(false);
    const [responseData, setResponseData] = useState(null);    
    const navigate = useNavigate();
	const [withinRangeStatus, setWithinRangeStatus] = useState({});


    const [patient, setPatient] = useState({
        labname: patientdata.labname,
        labaddress: patientdata.labaddress,
        lab_id: patientdata.lab_id,
        name: patientdata.name,
        gender: patientdata.gender,
        age: patientdata.age,
        patient_id: patientdata.patient_id,
        collected: patientdata.collected,
        received: patientdata.received,
        reported: patientdata.reported,
        reportstatus: patientdata.reportstatus,
        visit_id: patientdata.visit_id,
        visited: patientdata.visited,
        refby: patientdata.refby,
        userid: user.userid,
        testlist: patientdata.testlist
    });

    const [testDetail, setTestDetail] = useState(patientdata.testlist);        

    const handleChange = (e) => {
         const{name,value} = e.target;
         setPatient((prev) => {
            return {...prev, [name]:value};
         });
    };

    const handlePatientChange = (updatedTestDetail) => {
        setPatient((prev) => {
            return {...prev, testlist: updatedTestDetail};
         });      
      };

    const handleTestChange = (e, id, fieldName) => {
        const newValue = e.target.value;
        setTestDetail(prevData =>
          prevData.map(item =>
            item.id === id ? { ...item, [fieldName]: newValue } : item
          )
        );
        const updatedTestDetail = patient.testlist.map((item) => {            
            return  item.id === id ? { ...item, [fieldName]: newValue } : item ;
          });
        handlePatientChange(updatedTestDetail);   
      };                

    const submitHandler = async (event) => {
        event.preventDefault();            
        if (user && user.userid) { 
            
             console.log(JSON.stringify(patient));  
            try {
                console.log('Inside patient form submit handler');
                const response = await axios.post(`${apiUrl}/report-save`, JSON.stringify(patient));
                console.log(response.data);
                console.log(response.status);                
                if (response.status === 201) { 
                    setIsReportSaved(true);
                    setResponseData(response.data);                                   
                    console.log(response.data.reportid);
                }else{
                    window.alert('There is some issue while saving the report');
                }                    
            } catch (error) {
                console.error('Error sending POST request:', error);
            }             
        }else{      
            console.log('user:'+user);    
            window.alert('Please Login to submit the report');
        }                             
    };

    const viewSavedReport = () => {        
        navigate('/vwSavedReport', { state: patient });
      };  

// Helper function to check if the value is within range
    const checkWithinRange = (value, range) => {
        if (!value || !range) return false;

        let isWithinRange = false;
        const numericValue = parseFloat(value);

        // Handle ranges with multiple conditions, like "Desirable <200 Borderline high:200-239 High:>240"
        if (range.includes("<") || range.includes(">")) {
            const firstCondition = range.split(/\s{2,}/)[0];
            if (firstCondition.includes("<")) {
                const threshold = parseFloat(firstCondition.split("<")[1]);
                isWithinRange = numericValue < threshold;
            } else if (firstCondition.includes(">")) {
                const threshold = parseFloat(firstCondition.split(">")[1]);
                isWithinRange = numericValue > threshold;
            }
        } else {
            // Simple range format, e.g., "40.0-60.0"
            const [min, max] = range.split('-').map(Number);
            isWithinRange = numericValue >= min && numericValue <= max;
        }
        return isWithinRange;
    };

    // Update `withinRangeStatus` whenever `testDetail` changes
    useEffect(() => {
        const status = {};
        testDetail.forEach((item) => {
            status[item.id] = checkWithinRange(item.value, item.range);
        });
        setWithinRangeStatus(status);
    }, [testDetail]);	  

    return(
    <form onSubmit={submitHandler} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-2">
        <h2 className="text-2xl font-bold text-center mb-4">Patient Information</h2>
		<div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label htmlFor="labname" className="block text-sm font-medium text-gray-700">Laboratory Name</label>
                <input
                        type="text"
                        id="labname"
                        name="labname"
                        value={patient.labname}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />        
            </div>
			<div className="space-y-2">
                <label htmlFor='lab_id' className="block text-sm font-medium text-gray-700">Laboratory Id</label>
				<input
                        type="text"
                        id="lab_id"
                        name="lab_id"
                        value={patient.lab_id}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />                 
            </div>
		</div>	
		<div className="grid grid-cols-1">
            <div className="space-y-2">
                <label htmlFor='labaddress' className="block text-sm font-medium text-gray-700">Laboratory Address</label>
				<input
                        type="text"
                        id="labaddress"
                        name="labaddress"
                        value={patient.labaddress}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />                 
            </div>            
        </div>
        <div  className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label htmlFor='name' className="block text-sm font-medium text-gray-700">Patient Name</label>
				<input
                        type="text"
                        id="name"
                        name="name"
                        value={patient.name}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />       
                    {!patient.name && (
                         <p className="text-red-500 text-sm">Patient Name is required.</p>
                    )}                             
            </div>
            <div className="space-y-2">
                <label htmlFor='patient_id' className="block text-sm font-medium text-gray-700">Patient Id</label>
				<input
                        type="text"
                        id="patient_id"
                        name="patient_id"
                        value={patient.patient_id}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                      
            </div>
		</div>	
		<div  className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label htmlFor='gender' className="block text-sm font-medium text-gray-700">Gender</label>
				<input
                        type="text"
                        id="gender"
                        name="gender"
                        value={patient.gender}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                
            </div>
            <div className="space-y-2">
                <label htmlFor='age' className="block text-sm font-medium text-gray-700">Age</label>
				<input
                        type="text"
                        id="age"
                        name="age"
                        value={patient.age}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label htmlFor='collected' className="block text-sm font-medium text-gray-700">Collected Date</label>
				<input
                        type="text"
                        id="collected"
                        name="collected"
                        value={patient.collected}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                     
            </div>
            <div className="space-y-2">
                <label htmlFor='received' className="block text-sm font-medium text-gray-700">Received Date</label>
				<input
                        type="text"
                        id="received"
                        name="received"
                        value={patient.received}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                    
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label htmlFor='reported' className="block text-sm font-medium text-gray-700">Report Date</label>
				<input
                        type="text"
                        id="reported"
                        name="reported"
                        value={patient.reported}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                     
            </div>
            <div className="space-y-2">
                <label htmlFor='reportstatus' className="block text-sm font-medium text-gray-700">Report Status</label>
				<input
                        type="text"
                        id="reportstatus"
                        name="reportstatus"
                        value={patient.reportstatus}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                    
            </div>            
        </div>
        <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
                <label htmlFor='visit_id' className="block text-sm font-medium text-gray-700">Visit Id</label>
				<input
                        type="text"
                        id="visit_id"
                        name="visit_id"
                        value={patient.visit_id}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                     
            </div>
            <div className="space-y-2">
                <label htmlFor='visited' className="block text-sm font-medium text-gray-700">Visit Date</label>
				<input
                        type="text"
                        id="visited"
                        name="visited"
                        value={patient.visited}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                   
            </div>
            <div className="space-y-2">
                <label htmlFor='refby' className="block text-sm font-medium text-gray-700">Referred By</label>
				<input
                        type="text"
                        id="refby"
                        name="refby"
                        value={patient.refby}
                        onChange={handleChange}
                        className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                    />				                
            </div>
        </div>
		<h2 className="text-2xl font-bold text-center mb-4">Test Details</h2>
        <div className="space-y-2">
            <div className="grid grid-cols-4 gap-3">
                <label htmlFor='testName' className="block text-sm font-medium text-gray-700">Test Name</label>
				<label htmlFor='result' className="block text-sm font-medium text-gray-700">Result</label>
				<label htmlFor='unit' className="block text-sm font-medium text-gray-700">Unit</label>
				<label htmlFor='range' className="block text-sm font-medium text-gray-700">Range</label>
            </div>
            {testDetail.map((item) => (

                    <div key={item.id}  className="grid grid-cols-4 gap-2 items-center">                        
                        <input                            
                            type="text"                            
                            value={item.testname}
                            className="w-full border-gray-400 border-2 rounded-md shadow-sm"
                            readOnly							
                        />
                        <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleTestChange(e, item.id, 'value')}
                            className={`w-full border-gray-400 border-2 rounded-md shadow-sm ${
                                withinRangeStatus[item.id] ? 'text-green-500' : 'text-red-500'
                            }`}
                        />
                        <input                            
                            type="text"                            
                            value={item.unit}                             
                            onChange={e => handleTestChange(e, item.id, 'unit')}   
                            className="w-full border-gray-400 border-2 rounded-md shadow-sm"							
                        />						
                        <input                            
                            type="text"                            
                            value={item.range}                                 
                            onChange={e => handleTestChange(e, item.id, 'range')}      
                            className="w-full border-gray-400 border-2 rounded-md shadow-sm"							
                        />
                    </div>
                ))}            
        </div>
        <div className="flex justify-center mt-6">
                {!isReportSaved ? (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none"
                    >
                        Submit
                    </button>
                ) : (
                    <div className="text-center">
                        <p className="text-green-500 font-semibold">Report saved successfully!</p>
                        <button
                            type="button"
                            onClick={() => navigate('/vwSavedReport', { state: patient })}
                            className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none"
                        >
                            View Report
                        </button>
                    </div>
                )}
        </div>   
    </form>    
    );
}

export default PatientForm;