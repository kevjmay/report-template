import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

const DataFetcherDB = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('house').select('*')

            if (error) setError(error.message)
            else setData(data)
        }

        fetchData()
    }, [])

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