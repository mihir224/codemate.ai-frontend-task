import React,{useState,useEffect} from 'react';
import '../styles/Download.css';
import {storage} from '../firebase';
import {ref,listAll,getDownloadURL,getMetadata} from 'firebase/storage';
import axios from 'axios';
import { jsPDF } from "jspdf";

function Download(){
    const doc=new jsPDF();
    const [fileList,setFileList]=useState([]);
    const [downloadUrlList,setDownloadUrlList]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const fileListRef=ref(storage,'/uploads');
    useEffect(()=>{
        setIsLoading(true);
        (async()=>{
            try{
                const res=await listAll(fileListRef);
                console.log(res)
                const files = res.items.map(async (item) => {
                    const response = await getMetadata(item);
                    const downloadUrl = await getDownloadURL(item);
                    return { metadata: response, downloadUrl };
                  });
                  const fileData = await Promise.all(files)
                setFileList(fileData);
                setIsLoading(false);
                
            }catch(err){
                console.log(err);
            }
        })();
    },[])
    
    useEffect(()=>{
       console.log(fileList)
    },[fileList])

    const generateReport=async(code)=>{
        try{
            const result=await executeCode(code)
            console.log(result)
            doc.text("hello",10,10)
            doc.save("a4.pdf")
        }catch(err){
            console.log(err)
        }
    }

    
const executeCode = async (code) => {
    const url = 'https://emkc.org/api/v2/piston/execute';
  
    const payload = {
      language: 'python',
      version: '3.10.0',
      files: [
        {
          name: 'hello_world.py',
          content: code,
        },
      ],
    };
  
    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

    return isLoading?<h2 style={{opacity:'0.9',textAlign:'center'}}>Loading...</h2>:(
        <div id='download'>
            <div className='grid-container' id='grid-container-col'>
                <div className='col'>Uploaded File</div>
                <div className='col'>Report</div>
            </div>
            {fileList.map((file,index)=>{
                return(
                    <div className='grid-container' id='grid-container-row'>
                        <div className='row'><a id='uploaded-file-link' href={downloadUrlList[index]} target='_blank' ><span>{file.metadata?.name}</span></a></div>
                        <div className='row'><span id='report-text' onClick={()=>generateReport(file.metadata?.content)}>file-report.pdf</span></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Download;