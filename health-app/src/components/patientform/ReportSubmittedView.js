import React, { useState,useContext } from "react";
import axios from 'axios';
import AuthContext from '../login/AuthContext';
import { useLocation  } from 'react-router-dom';

const ReportSubmittedView = (props) => {
    const { user, login, logout } = useContext(AuthContext);
    const location = useLocation();    
    const savedpatient = location.state || location.state.patient;
    console.log(savedpatient);

    return(
        <form>
            <div>
                <div>
                    <label htmlFor='labname'>Laboratory Name</label>
                    <input type='text' id='labname' name='labname' value={savedpatient.labname}/>        
                </div>
                <div>
                    <label htmlFor='labaddress'>Laboratory Address</label>
                    <input type='text' id='labaddress' name='labaddress' value={savedpatient.labaddress}/>        
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='name'>Patient Name</label>
                    <input type='text' id='name' name='name' value={savedpatient.name}/>        
                </div>
                <div>
                    <label htmlFor='gender'>Gender</label>
                    <input type='text' id='gender' name='gender' value={savedpatient.gender}/>        
                </div>
                <div>
                    <label htmlFor='age'>Age</label>
                    <input type='text' id='age' name='age' value={savedpatient.age}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='collected'>Collected Date</label>
                    <input type='text' id='collected' name='collected' value={savedpatient.collected}/>        
                </div>
                <div>
                    <label htmlFor='received'>Received Date</label>
                    <input type='text' id='received' name='received' value={savedpatient.received}/>        
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='reported'>Report Date</label>
                    <input type='text' id='reported' name='reported' value={savedpatient.reported}/>        
                </div>
                <div>
                    <label htmlFor='reportstatus'>Report Status</label>
                    <input type='text' id='reportstatus' name='reportstatus' value={savedpatient.reportstatus}/>        
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='testname'>Test Name</label> 
                    <label htmlFor='testresult'>Test Result</label>
                    <label htmlFor='range'>Bio Reference Range</label>
                    <label htmlFor='unit'>Unit</label>
                </div>
                {savedpatient.testlist.map((item) => (
                        <div key={item.id}>                        
                            <input                            
                                type="text"                            
                                value={item.testname}                                                                                   
                            />
                            <input                            
                                type="text"                            
                                value={item.value}                                                                                       
                            />
                            <input                            
                                type="text"                            
                                value={item.range}                                                                                     
                            />
                            <input                            
                                type="text"                            
                                value={item.unit}                                                                                     
                            />
                        </div>
                    ))}            
            </div>                    
        </form>    
        );
}

export default ReportSubmittedView;