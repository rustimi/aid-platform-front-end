import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { API_BASE_URL } from '../components/config';
import axios from 'axios';

export default function UserInfoPage() {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [updateStatus, setUpdateStatus] = useState(null);
    const [userUpdateErrors, setUserUpdateErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [userDocumentPicturePath, setUserDocumentPicturePath] = useState(null);
    const [uploadStatus, setUploadStatus] = useState({});


    useEffect(() => { // Fetch user info
        setUpdateStatus(null)
        axios.get(`${API_BASE_URL}/users`)
            .then(response => {
                setEmail(response.data.user.email);
                setFirstName(response.data.user.fname);
                setLastName(response.data.user.lname);
                setUserDocumentPicturePath(response.data.user.document_url);
            }).catch(error => {
                console.error('Failed to fetch user info:', error);
            });
    }, []); // return empy dependency array to run once

    const handleSubmitUserInfo = async (e) => {
        e.preventDefault();
        axios.patch(`${API_BASE_URL}/users`, { // Update user
            fname: first_name,
            lname: last_name,
            email: email
        })
            .then(response => {
                if (response.status === 200) {
                    setUpdateStatus(true)
                }
            })
            .catch(errors => {
                let objUserCreateErrors = {};

                // Format error messages
                errors.response.data.errors.forEach(error => {
                    let split = error.split(" ") // Error message format: "Email has invalid format"
                    objUserCreateErrors[split[0].toLowerCase()] = split.slice(1).join(" ")
                })
                setUserUpdateErrors(objUserCreateErrors);
                setUpdateStatus(false)
            })
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Set the selected file
    };

    const handleUpload = async () => {
        if (!selectedFile) return; // Ensure there is a file to upload
        setUploadStatus({})
        setUserDocumentPicturePath(null)
        const formData = new FormData();
        formData.append('document', selectedFile);

        axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log("OK")
                setUploadStatus({
                    status: true,
                    message: 'File uploaded successfully'
                })
                axios.get(`${API_BASE_URL}/users`)
                    .then(response => {
                        setUserDocumentPicturePath(response.data.user.document_url);
                    })
            })
            .catch(error => {
                console.log("KO")
                setUploadStatus({
                    status: false,
                    message: 'File upload failed. Please try again later.'
                })
            });
    };


    return (
        <>
            <div className="logo-img m-sm-auto d-flex justify-content-center">
                <Link to="/dashboard" className="position-absolute bottom-0 btn btn-sm text-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                    </svg>
                    Dashboard
                </Link>
            </div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-12 big-block bg-primary d-flex flex-column align-items-center justify-content-center">
                        <form onSubmit={handleSubmitUserInfo} className="p-4 bg-white col-11 col-lg-8 text-center" style={{ borderRadius: '5px' }}>
                            <h1 className="text-center text-primary">Update user info</h1>
                            <div className="mb-3">
                                <input type="text" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                                {userUpdateErrors.fname && <div className="pl-3 text-danger">{userUpdateErrors.fname}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                                {userUpdateErrors.lname && <div className="pl-3 text-danger">{userUpdateErrors.lname}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                                {userUpdateErrors.email && <div className="pl-3 text-danger">{userUpdateErrors.email}</div>}
                            </div>
                            <button type="submit" className={`btn btn-dark w-100`}>Update</button>
                            <div className={`alert alert-success ${updateStatus === true ? '' : 'd-none'}`} role="alert">
                                Update successful! :)
                            </div>
                        </form>
                        <div className='mt-2 user-document bg-white col-11 col-lg-8 rounded p-3'>
                            <div className='d-flex flex-column flex-lg-row justify-content-between mb-2'>
                                <p>Upload your government issued document</p>
                                <div className='d-flex flex-column align-items-end'>
                                    <input type="file" accept="image/*" className='btn btn-primary col-12' onChange={handleFileChange} />
                                    {selectedFile && (
                                        <button className='btn btn-secondary mt-1 col-12 col-lg-4 ' onClick={handleUpload}>Upload</button>
                                    )}
                                </div>
                            </div>
                            {userDocumentPicturePath && (
                                <Link to={`${API_BASE_URL}${userDocumentPicturePath}`} target="_blank" rel="noreferrer">Download document</Link>
                            )}
                            <div className={`mt-2 alert ${uploadStatus.status !== undefined ? (uploadStatus.status ? 'alert-success' : 'alert-danger') : 'd-none'}`} role="alert">
                                {uploadStatus.message}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
