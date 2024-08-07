import React, { useState } from 'react';
import axios from 'axios';
import '../../css/OrderPicking.css';
const OrderPicking = () => {
    const [items, setItems] = useState('');
    const [timeMatrix, setTimeMatrix] = useState('');
    const [vehicles, setVehicles] = useState('');
    const [limit, setLimit] = useState('');
    const [result, setResult] = useState(null);

    const handleItemsChange = (e) => {
        setItems(e.target.value);
    };

    const handleTimeMatrixChange = (e) => {
        setTimeMatrix(e.target.value);
    };

    const handleVehiclesChange = (e) => {
        setVehicles(e.target.value);
    };

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            items: JSON.parse(items),
            time_matrix: JSON.parse(timeMatrix),
            vehicles: parseInt(vehicles),
            limit: parseInt(limit)
        };

        try {
            const response = await axios.post('http://localhost:5000/picking', data);
            setResult(response.data);
        } catch (error) {
            console.error('Error executing order picking:', error);
            setResult(null);
        }
    };

    return (
        <div>
            <h2>Order Picking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Items (JSON Array):</label>
                    <textarea value={items} onChange={handleItemsChange} rows="4" cols="50" />
                </div>
                <div>
                    <label>Time Matrix (JSON Array of Arrays):</label>
                    <textarea value={timeMatrix} onChange={handleTimeMatrixChange} rows="4" cols="50" />
                </div>
                <div>
                    <label>Vehicles:</label>
                    <input type="number" value={vehicles} onChange={handleVehiclesChange} />
                </div>
                <div>
                    <label>Limit:</label>
                    <input type="number" value={limit} onChange={handleLimitChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
            {result && (
                <div>
                    <h3>Result:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default OrderPicking;