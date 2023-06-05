import React,{useState,useEffect} from 'react';
import '../styles/Upload.css';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {storage} from '../firebase';
import {ref,uploadBytes} from 'firebase/storage'; 
import {Link} from 'react-router-dom';

function Upload(){
    const [file,setFile]=useState(null);
    const [fileName,setFileName]=useState("");

    const uploadFile=async()=>{
        if(file===null){
            alert('No file chosen')
            return;
        }
        try{
            const fileRef=ref(storage,`uploads/${file.name}`) //directory in which the file will be saved
            await uploadBytes(fileRef, file);
            alert('File Uploaded Successfully')
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div id='upload'>
                <div id='upload-div'>
                    <input id='upload-input' type='file' onChange={(e)=>{
                        setFile(e.target.files[0])
                        setFileName(e.target.files[0].name)
                    }}></input>
                    <label id='upload-label'  htmlFor='upload-input' >
                        <FileCopyIcon style={{fontSize:'35px'}}/>
                        Browse Files
                    </label>
                    {fileName!=""&&<span>{fileName}</span>}
                    <button className='btn' id='upload-btn' onClick={uploadFile}>Upload</button>
                </div>  
                <Link style={{alignSelf:'center'}} to='/download'><button className='btn'>Generate Report</button></Link>
        </div>
    )
}

export default Upload;