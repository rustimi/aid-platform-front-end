import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
const placesLibrary = ["places"];

export default function NewRequestPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [type, setType] = useState('One time task');
    const [createStatus, setCreateStatus] = useState(null);
    const [newRequestErrors, setNewRequestErrors] = useState({});
    const [searchResult, setSearchResult] = useState("Result: none");
    const autocompleteInputRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDcBfcLxJIXSvH2fZmYHrSTqS8w2E3-ywo",
        libraries: placesLibrary
    });

    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    }

    function onPlaceChanged() {
        if (searchResult != null) {
            const place = searchResult.getPlace();
            setCoordinates({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
        } else {
            alert("Please enter text");
        }
    }

    const handleSubmitNewRequest = async (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/requests`, { // Create request
            title: title,
            description: description,
            request_type: type,
            latitude: coordinates.lat,
            longitude: coordinates.lng
        })
            .then(response => {
                if (response.status === 201) {
                    setCreateStatus(true)
                }
            })
            .catch(errors => {
                console.log(errors)
                let objUserCreateErrors = {};

                // Format error messages
                errors.response.data.forEach(error => {
                    let split = error.split(" ") // Error message format: "Email has invalid format"
                    objUserCreateErrors[split[0].toLowerCase()] = split.slice(1).join(" ")
                })
                setNewRequestErrors(objUserCreateErrors);
                setCreateStatus(false)
            })
    };

    useEffect(() => {
        if (createStatus === true) {
            setNewRequestErrors({});
            setDescription('');
            setTitle('');
            setType('One time task');
            setCoordinates({ lat: 0, lng: 0 });
            if (autocompleteInputRef.current) {
                autocompleteInputRef.current.value = "";
            }

            setTimeout(() => {
                setCreateStatus(null);
            }, 3000);
        }
    }, [createStatus]);

    return isLoaded ? (
        <>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-12 big-block bg-primary d-flex flex-column align-items-center justify-content-center">
                        <div className='col-11 col-lg-8 mb-2'>
                            <Link to="/requests" className="btn btn-action btn-sm float-start ">Back</Link>
                        </div>
                        <form onSubmit={handleSubmitNewRequest} className="p-4 bg-white col-11 col-lg-8 text-center" style={{ borderRadius: '5px' }}>
                            <h1 className="text-center text-primary">Create a new request!</h1>
                            <div className="mb-3">
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                                {newRequestErrors.title && <div className="pl-3 text-danger">{newRequestErrors.title}</div>}
                            </div>
                            <div className="mb-3">
                                <textarea type="textarea" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                                {newRequestErrors.description && <div className="pl-3 text-danger">{newRequestErrors.description}</div>}
                            </div>
                            <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                                <input
                                    ref={autocompleteInputRef}
                                    type="text"
                                    placeholder="Search for a place"
                                    className="form-control mb-2"
                                />
                            </Autocomplete>
                            {(newRequestErrors.latitude && newRequestErrors.longitude) && <><div className="pl-3 text-danger">{newRequestErrors.latitude}</div><div className="pl-3 text-danger">{newRequestErrors.longitude}</div></>}
                            <div className="request-type btn-group btn-group-toggle mb-2">
                                <label className={`btn btn-primary ${type === 'Material need' ? 'btn-action active' : 'btn-primary'}`}>
                                    <input
                                        id="materialNeed"
                                        className="d-none"
                                        type="radio"
                                        name="requestType"
                                        value="Material need"
                                        checked={type === 'Material need'}
                                        onChange={(e) => setType(e.target.value)} />
                                    Material need
                                </label>
                                <label className={`label-request-type btn ${type === 'One time task' ? 'btn-action active' : 'btn-primary'}`}>
                                    <input
                                        id="oneTimeTask"
                                        className="d-none"
                                        type="radio"
                                        name="requestType"
                                        value="One time task"
                                        checked={type === 'One time task'}
                                        onChange={(e) => setType(e.target.value)} />
                                    One time task
                                </label>
                                {newRequestErrors.type && <div className="text-danger">{newRequestErrors.type}</div>}
                            </div>
                            <button type="submit" className={`btn btn-dark w-100`}>Publish your request</button>
                            <div className={`alert alert-success mt-2 ${createStatus === true ? '' : 'd-none'}`} role="alert">
                                Create successful! :)
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : <></>
}
