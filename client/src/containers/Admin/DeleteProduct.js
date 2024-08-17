import React from 'react';
import { Modal } from 'react-bootstrap';

const DeleteProduct = (props) => {
    return (
        <div>
            <Modal
                show={props.isShow}
                onHide={props.handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                        <h5 style={{ margin: "0px" }}>Are you sure ?</h5>
                        <p style={{ fontWeight: "300" }}>
                            You won't be able to revert this!
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btnbackground"
                        type="submit"
                        onClick={props.handleDelete}
                    >
                        Yes delete it!
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteProduct
