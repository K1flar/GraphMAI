import { useState } from 'react'
import { status } from '../types'

export default function useInfo(initialValue: React.ReactNode, initialStatus: status): [React.ReactNode, status, (i: React.ReactNode, s: status) => void] {
    let [value, setValue] = useState<React.ReactNode>(initialValue)
    let [status, setStatus] = useState<status>(initialStatus)

    function change(newValue: React.ReactNode, newStatus: status) {
        setStatus(newStatus)
        if (newStatus === 'ok') setValue(<div>✅ {newValue}</div>)
        else if (newStatus === 'error') setValue(<div>❌ {newValue}</div>)
        else setValue(newValue)
    }

    return [value, status, change]
}