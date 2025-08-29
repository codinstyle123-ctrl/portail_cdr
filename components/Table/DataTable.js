import React, { useState, useEffect } from 'react';
import axiosInstance from "AxiosApi/AxiosInstance"
import { Card, CardHeader, CardContent } from '@mui/material';

const DataTable = () => {
  const [data, setData] = useState({});
  const [rowData, setRowData] = useState({});
  const [firstDate, setFirstDate] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/fluxoa/api/get_table_data/');
        const responseData = response.data;

        console.log('Response Data:', responseData); // Debugging log

        if (responseData.success) {
          setData(responseData.data);
        } else {
          console.error('Error in response:', responseData.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      const date = Object.keys(data).sort().pop();
      if (date) {
        setFirstDate(date);
        setRowData(data[date]);
      }
    }
  }, [data]);

  if (!firstDate || Object.keys(rowData).length === 0) {
    return <div>No data available</div>;
  }

  // Extract unique etats
  const etats = Object.values(rowData).reduce((acc, curr) => {
    Object.keys(curr).forEach(etat => {
      if (!acc.includes(etat)) {
        acc.push(etat);
      }
    });
    return acc;
  }, []);

  // Extract unique statuses
  const uniqueStatuses = Object.keys(rowData);

  return (
    <div>
      <Card sx={{ height: '100%', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
        <CardHeader title={`Etat des Cellules en ${firstDate}`} />
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <table style={{ borderCollapse: 'collapse', border: '1px solid black', textAlign: 'center', height: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Etat/Status</th>
                {etats.map(etat => (
                  <th key={etat} style={{ border: '1px solid black', padding: '8px' }}>{etat}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueStatuses.map(status => (
                <tr key={status} style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{status}</td>
                  {etats.map(etat => (
                    <td key={`${status}-${etat}`} style={{ border: '1px solid black', padding: '8px' }}>
                      {rowData[status]?.[etat] || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTable;

