import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Login, fetchUser } from './Login'

const DataFetcherDB = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        const user = supabase.auth.getUser()
        console.log('Logged-in user:', user)
    }

    useEffect(() => {
        const fetchUser = async () => {
            const { data: user, error } = await supabase.auth.getUser()
            if (error) {
                console.error('Error fetching user:', error.message)
            } else {
                setUser(user)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return
            const { data, error } = await supabase.from('house').select('*')
            if (error) setError(error.message)
            else setData(data)
        }

        fetchData()
    }, [user])

    if (!user) return <p>Please log in to view data</p>
    if (error) return <p>Error: {error}</p>
    if (!data.length) return <p>Loading...</p>

    return (
        <ul>
            {data.map((item) => (
                <li key={item.id}>{(item.address)}</li>
            ))}
        </ul>
    )

}

export default DataFetcherDB