import React from 'react';
import './ImageModal.css';

const ImageModal = (props) => {
    const who = `${props.postData.who}`;
    const where = `${props.postData.location}`;
    const when = `${props.postData.time_of_memory}`;
    const what = `${props.postData.what}`;

    const closeModal = (event) => {
        props.closeModal();
    }
    
    if (props.showModal) {
        return (
            <div className="modal">
                <div className="modal-card">
                    <img className="image" src={props.imgUrl} />
                    <div className="details">
                        {who && <p className="fact">{who}</p>}
                        {where && <p className="fact">{where}</p>}
                        {when && <p className="fact">{when}</p>}
                        {what && <p className="fact">{what}</p>}
                    </div>
                    <input
                        type="button"
                        value="Close"
                        className="upload-close"
                        onClick={closeModal}
                    />
                </div>
            </div>
        );
    }
    return null;
}

export default ImageModal;