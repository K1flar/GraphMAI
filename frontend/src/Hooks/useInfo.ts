import { useState } from 'react'
import { status } from '../types'

export default function useInfo(initialValue: string, initialStatus: status): [string, status, (i: string, s: status) => void] {
    let [value, setValue] = useState<string>(initialValue)
    let [status, setStatus] = useState<status>(initialStatus)

    function change(newValue: string, newStatus: status) {
        setStatus(newStatus)
        if (newStatus === 'ok') setValue(`✅ ${newValue}`)
        else if (newStatus === 'error') setValue(`❌ ${newValue}`)
        else setValue(newValue)
    }

    return [value, status, change]
}