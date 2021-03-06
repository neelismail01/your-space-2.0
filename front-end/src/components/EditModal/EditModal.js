import React, {useState, useEffect} from 'react';
import axios from 'axios';
import deletePost from './delete.png';
import './EditModal.css';

const EditModal = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [who, setWho] = useState(props.who);
    const [where, setWhere] = useState(props.where);
    const [when, setWhen] = useState(props.when);
    const [what, setWhat] = useState(props.what);

    const imgUrl = props.imgUrl;

    const handleDetails = event => {
        const {name} = event.target;
        const {value} = event.target;
        
        if (name === 'who') {
            setWho(value);
        } else if (name === 'where') {
            setWhere(value);
        } else if (name === 'when') {
            setWhen(value);
        } else if (name === 'what') {
            setWhat(value);
        }
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        axios.put('http://localhost:5000/edit', { who, what, where, when, imgUrl }, { headers: { 'authorization': localStorage.getItem("token") } })
        .then(res => {
            props.closeEdit();
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleCancel = event => {
        event.preventDefault();
        props.closeEdit();
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/details/${imgUrl.substring(30)}`, { headers: { 'authorization': localStorage.getItem("token") } })
        .then(response => {
            setWho(response.data.who);
            setWhere(response.data.location);
            setWhen(response.data.time_of_memory);
            setWhat(response.data.what);
            setLoaded(true);
        })
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="editmodal-container">
            {
            loaded
            ?
            <div className="body">
                <div className="who-where">
                    <div className="detail-wrapper">
                        <div className="intro">Tagged</div>
                        <input type="text" value={who} className="value-edit" name="who" onChange={handleDetails} />
                    </div>
                    <div className="detail-wrapper">
                        <div className="intro">Where</div>
                        <input type="text" value={where} className="value-edit" name="where" onChange={handleDetails} />
                    </div>
                </div>
                <div className="when-what">
                    <div className="detail-wrapper">
                        <div className="intro">When</div>
                        <input type="text" value={when} className="value-edit" name="when" onChange={handleDetails} />
                    </div>
                    <div className="detail-wrapper">
                        <div className="intro">What</div>
                        <input type="text" value={what} className="value-edit" name="what" onChange={handleDetails} />
                    </div>
                </div>
            </div>
            :
            <div className="loading">
                <p className="loading-message">Retrieving image tags...</p>
            </div>
            }
            <div className="tagmodal-btns">
                <div className="cancel">
                    <button className="edit-btn" onClick={handleCancel}>Cancel</button>
                </div>
                <div className="confirm">
                    <button className="edit-btn" onClick={handleFormSubmit}>Confirm</button>
                </div>
                <img src={deletePost} alt="delete button" style={{height:'30px', width:'30px'}} onClick={props.onDelete} />
            </div>
        </div>
    );
}

export default EditModal;