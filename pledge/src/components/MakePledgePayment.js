import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePledges } from '../context/PledgeContext'

export default function MakePledgePaymentModal({ show, handleClose, defaultPledgeName, pledgeName }) {
    // const nameRef = useRef()
    const amountRef = useRef()
    const contributorRef = useRef()
    const { getPledgeContributors, addPledgeContributionInfo } = usePledges()
    function handleSubmit(e) {
        e.preventDefault()
        addPledgeContributionInfo({
            pledgename: pledgeName,
            contribution: parseFloat(amountRef.current.value)

        })
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Make Pledge Payment for {pledgeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Contributor Name</Form.Label>
                        <Form.Select
                            defaultValue={defaultPledgeName}
                            required ref={contributorRef}
                        >
                            {
                                getPledgeContributors(pledgeName).map((contributor) => (
                                    <option key={contributor.name} value={contributor.name}>{contributor.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type='number' required min={0} ref={amountRef} />
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
