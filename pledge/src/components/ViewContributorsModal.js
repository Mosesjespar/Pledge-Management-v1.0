import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePledges } from '../context/PledgeContext'
import { Stack } from 'react-bootstrap'
import { CurrencyFormater } from './Utils'


export default function ViewContributorsModal({ show, handleClose, pledgename }) {
    const { deletePledge, deleteContributor, getPledgeContributors } = usePledges()
    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction='horizontal' gap='3'>
                        <div>Pledge - {pledgename}</div>
                        <Button variant='outline-danger' onClick={() => {
                            deletePledge(pledgename)
                            handleClose()
                        }}>Delete Pledge</Button>
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='vertical' gap='3'>
                    {getPledgeContributors(pledgename).map(cont => {
                        return (
                            <Stack direction='horizontal' gap='2'>
                                <div className='me-auto fs-4'>{cont.name}</div>
                                <div className='fs-5'>{CurrencyFormater.format(cont.amount)}</div>
                                <Button variant='outline-danger' size='sm' onClick={() => deleteContributor(cont.name)}>&times;</Button>
                            </Stack>
                        )
                    })}
                </Stack>
            </Modal.Body>

        </Modal>
    )
}
