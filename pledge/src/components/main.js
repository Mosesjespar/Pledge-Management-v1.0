import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import PledgeCard from './PledgeCard'
import AddPledgeModal from './AddPledgeModal'
import { usePledges } from '../context/PledgeContext'
import AddContributorModal from './AddContributor'
import MakePledgePaymentModal from './MakePledgePayment'
import TotalPledgeAmount from './TotalPledgeAmount'
import ViewContributorsModal from './ViewContributorsModal'

export default function Main() {
    const [viewPledgeForm, setViewPledgeForm] = useState(false)

    const [viewAddContributorForm, setViewAddContributorForm] = useState(false)

    const [viewContributors, setViewContributors] = useState(false)

    const [viewPledgePayment, setViewPledgePayment] = useState(false)

    const [pledgeName, setPledgeName] = useState()

    const { pledges, getTotalPledgePayments } = usePledges()

    // const test_array = [300, 200, 1000, 1200]
    return (
        <>
            <Container className='my-4'>
                <Stack direction='horizontal' gap={2} className='mb-4'>
                    <h1 className='me-auto'>PLEDGE MANAGEMENT</h1>
                    <Button variant="primary" onClick={() => setViewPledgeForm(true)}> Add Pledge</Button>
                    <Button variant="outline-primary" onClick={() => setViewAddContributorForm(true)}>Add Contributor</Button>
                </Stack>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px,1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                    {pledges.map(p => {

                        return (
                            <PledgeCard pledgename={p.name} collected={getTotalPledgePayments(p.name)} target={p.target} paymentAction={() => {
                                setPledgeName(p.name)
                                setViewPledgePayment(true)
                            }}
                                viewConts={() => {
                                    setViewContributors(true)
                                    setPledgeName(p.name)
                                }}
                            />
                        )

                    })
                    }
                    <TotalPledgeAmount />
                </div>

            </Container>
            <AddPledgeModal show={viewPledgeForm} handleClose={() => setViewPledgeForm(false)} />

            <AddContributorModal show={viewAddContributorForm}
                handleClose={() => setViewAddContributorForm(false)}
            />

            <MakePledgePaymentModal show={viewPledgePayment} handleClose={() => setViewPledgePayment(false)} pledgeName={pledgeName} />

            
            <ViewContributorsModal show={viewContributors} pledgename={pledgeName} handleClose={() => setViewContributors(false)} />
        </>
    )
}
