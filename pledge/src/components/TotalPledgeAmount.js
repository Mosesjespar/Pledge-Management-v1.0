import React from 'react'
import { Card, ProgressBar } from 'react-bootstrap'
import { CurrencyFormater } from './Utils'
import { usePledges } from '../context/PledgeContext'



function TotalPledgeAmount() {
    const {pledges, contributions} = usePledges()
    const amount = contributions.reduce((total, contributions) => total + contributions.contribution, 0)
    const total = pledges.reduce((total, target) => total + target.target, 0)
    return (
        <Card>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>Accumulated Funds</div>

                    <div className='d-flex align-items-baseline'>{CurrencyFormater.format(amount)} /
                        <span className='text-muted fs-6 ms-1'>{CurrencyFormater.format(total)}</span></div>

                </Card.Title>
                <ProgressBar className='rounded-pill ' variant={amount}
                    min={0}
                    max={total}
                    now={amount}
                />
            </Card.Body>
        </Card>
    )
}

export default TotalPledgeAmount