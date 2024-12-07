import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';


const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(
  url,
  key
);

export function useCsvData() {
    const [csv, setCsv] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchedData = useRef(false); // Ref to track if data is fetched
  
    // Fetch CSV data from Supabase storage
    async function fetchCsv() {
      if (fetchedData.current) return; // Skip fetching if data has already been fetched
      setLoading(true);
      setError(null);
  
      try {
        const { data: fileList, error: listError } = await supabase.storage.from('reportcsv').list('');
        if (listError) throw listError;
  
        if (fileList.length > 0) {
          const fileName = fileList[0].name;
          const { data: file, error: downloadError } = await supabase.storage.from('reportcsv').download(fileName);
          if (downloadError) throw downloadError;
  
          const fileText = await file.text();
          const parsedData = Papa.parse(fileText, { header: true, skipEmptyLines: true }).data;
          setCsv(parsedData); // Set the parsed data
          fetchedData.current = true; // Mark data as fetched
        } else {
          setCsv([]); // No files found, set empty array
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch or parse CSV data.');
      } finally {
        setLoading(false);
      }
    }
  
    // Upload a new CSV file to Supabase
    async function uploadCsv(file) {
      setLoading(true);
      setError(null);
  
      try {
        const { error: uploadError } = await supabase.storage.from('reportcsv').upload(`${Date.now()}.csv`, file);
        if (uploadError) throw uploadError;
  
        await fetchCsv(); // Refresh data after upload
      } catch (err) {
        console.error(err);
        setError('Failed to upload the file.');
      } finally {
        setLoading(false);
      }
    }
  
    // useEffect only runs once to fetch data
    useEffect(() => {
      if (!fetchedData.current) {
        console.log('Fetching CSV Data');
        fetchCsv();
      }
    }, []); // Run once when the component mounts
  
    return { csv, loading, error, uploadCsv };
  }

  
