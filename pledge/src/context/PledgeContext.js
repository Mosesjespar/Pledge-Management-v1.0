import React from "react"
import useLocalStorage from "../hooks/useLocalStorage"
const PledgeContext = React.createContext()

export function usePledges() {
    return React.useContext(PledgeContext)
}

//contributor staff
// { 
//     Name:
//     Amount:
//     Pledge_Type:
//     description
// }

//pledge staff
// {
//     Name:
//     Target:
// }

// contributions/payments
// {
//     pledgename:
//     totalcontributions:
// }
export const PledgeProvider = ({ children }) => {
    const [pledges, setPledges] = useLocalStorage('pledges', [])
    const [contributors, setContributors] = useLocalStorage('contributors', [])
    const [contributions, setContributions] = useLocalStorage('contributions', [])

    function getPledgeContributors(pledgename) {
        return contributors.filter(contributor => contributor.pledgename === pledgename)
    }


    function getPledgeContributions(pledgename) {
        return contributions.filter(payments => payments.pledgename === pledgename)
    }


    function addPledge({ name, target, collected }) {
        setPledges(prevPledges => {
            if (prevPledges.find(pledge => pledge.name === name)) {
                return prevPledges
            }
            return [...prevPledges, { name, target, collected }]
        })
    }


    function deletePledge({ name }) {
        setPledges(prevPledges => {
            return prevPledges.filter(pledge => pledge.name !== name)
        })
    }


    function deleteContributor({ name }) {
        setContributors(prevContributors => {
            return prevContributors.filter(contributor => contributor.name !== name)
        })
    }

    function addPledgeContributor({ name, amount, pledgename }) {
        setContributors(prevContributors => {
            return [...prevContributors, { name, amount, pledgename }]
        })
    }

    function getTotalPledgePayments(pledgename) {
        if (contributions.length === 0) {
            return 0
        }
        else {
            //target is the object in the contributions array
            let target = contributions.filter((pledge) => pledge.pledgename === pledgename)

            if (target.length === 0) {
                return 0
            }
            return target[0].contribution
        }
    }

    function addPledgeContributionInfo({ pledgename, contribution }) {
        setContributions(prevContributions => {
            if (prevContributions.find(pledge => pledge.pledgename === pledgename)) {
                let target = contributions.filter((pledge) => pledge.pledgename === pledgename)
                let remainders = contributions.filter((pledge) => pledge.pledgename !== pledgename)
                contribution+=target[0].contribution
                return [...remainders, { pledgename, contribution }]
            }
            return [...prevContributions, { pledgename, contribution }]
        })
    }
    return <PledgeContext.Provider value={{
        pledges,
        contributors,
        contributions,
        getPledgeContributors,
        addPledge,
        deletePledge,
        deleteContributor,
        addPledgeContributor,
        getPledgeContributions,
        getTotalPledgePayments,
        addPledgeContributionInfo
    }} >{children}</PledgeContext.Provider>
}