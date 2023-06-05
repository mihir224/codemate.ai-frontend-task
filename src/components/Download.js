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
                res.items.forEach(async (item)=>{
                   const response=await getMetadata(item);
                   setFileList((prev)=>[...prev,response])
                   const downloadUrl=await getDownloadURL(item)
                   setDownloadUrlList((prev)=>[...prev,downloadUrl]);
                })
                setIsLoading(false);
            }catch(err){
                console.log(err);
            }
        })();
    },[])
    
    useEffect(()=>{
       console.log(fileList)
    },[fileList])

    const generateReport=()=>{
        try{
            doc.text("hello",10,10)
            doc.save("a4.pdf")
        }catch(err){
            console.log(err)
        }
    }

    return isLoading?<h2 style={{opacity:'0.9',textAlign:'center'}}>Loading...</h2>:(
        <div id='download'>
            <div className='grid-container' id='grid-container-col'>
                <div className='col'>Uploaded File</div>
                <div className='col'>Report</div>
            </div>
            {fileList.map((file,index)=>{
                return(
                    <div className='grid-container' id='grid-container-row'>
                        <div className='row'><a id='uploaded-file-link' href={downloadUrlList[index]} target='_blank' ><span>{file?.name}</span></a></div>
                        <div className='row'><span id='report-text' onClick={generateReport}>file-report.pdf</span></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Download;