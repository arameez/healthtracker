import React, { useEffect, useState } from "react";
import axios from 'axios';
import PatientForm from "../patientform/PatientForm";
import { useLocation  } from 'react-router-dom';
import { apiUrl } from '../../config';

function Test(props) {
  const location = useLocation();
  const pdata1 = location.state?.data || '';
  console.log(pdata1)
  var jsonData = {
    "data": pdata1
  }
  
  const [postData, setPostData] = useState(null); // State to hold the data you want to send
  var data = JSON.stringify(jsonData);
  const handlePost = async () => {
    try {
      console.log('Inside Test.handlepost');
      const response = await axios.post(`${apiUrl}/report-upload`, data);
      console.log(response.data);
      setPostData(JSON.stringify(response.data)); // Handle the response from Django
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  useEffect(() => {
    handlePost();
  }, [])

  return (
    <div>     
      {postData && <div><PatientForm patientdata={postData} /></div>}
    </div>
  );
}

export default Test;
