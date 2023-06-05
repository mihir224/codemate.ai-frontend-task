import React,{useState,useEffect} from 'react';
import '../styles/Download.css';
import {storage} from '../firebase';
import {ref,listAll,getDownloadURL,getMetadata} from 'firebase/storage';
import axios from 'axios';

function Download(){
    const [fileList,setFileList]=useState([]);
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

    return isLoading?<h2 style={{opacity:'0.9',textAlign:'center'}}>Loading...</h2>:(
        <div id='download'>
            <div className='grid-container' id='grid-container-col'>
                <div className='col'>Uploaded File</div>
                <div className='col'>Report</div>
            </div>
            {fileList.map((file)=>{
                return(
                    <div className='grid-container' id='grid-container-row'>
                        <div className='row'>{file?.name}</div>
                        <div className='row'>file-report.pdf</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Download;