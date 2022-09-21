import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePledges } from '../context/PledgeContext'

export default function AddPledgeModal({ show, handleClose }) {
    const nameRef = useRef()
    const targetRef = useRef()
    const { addPledge } = usePledges()

    function handleSubmit(e) {
        e.preventDefault()
        addPledge({
            name: nameRef.current.value,
            target: parseFloat(targetRef.current.value)

        })
        handleClose()
        
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Pledge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Pledge Name</Form.Label>
                        <Form.Control type='text' required ref={nameRef} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='target'>
                        <Form.Label>Target Amount</Form.Label>
                        <Form.Control type='number' required min={0} ref={targetRef} />
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
