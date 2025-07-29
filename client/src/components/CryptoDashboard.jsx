import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoDashboard = () => {
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchCoins = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/coins`);
            setCoins(data);
        } catch (err) {
            console.error('Error fetching data:', err.message);
        }
    };

    useEffect(() => {
        fetchCoins();
        const interval = setInterval(fetchCoins, 30 * 60 * 1000); // every 30 minutes
        return () => clearInterval(interval);
    }, []);

    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCoins = [...filteredCoins].sort((a, b) => {
        if (!sortBy) return 0;
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>📊 Top 10 Cryptocurrencies</h2>

            <input
                type="text"
                placeholder="Search by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    marginBottom: '10px',
                    padding: '8px',
                    width: '250px',
                    fontSize: '14px'
                }}
            />

            <div style={{ margin: '15px 0' }}>
                <button onClick={() => toggleSort('price')} style={{ marginRight: '10px' }}>
                    Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button onClick={() => toggleSort('marketCap')}>
                    Sort by Market Cap {sortBy === 'marketCap' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>

            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price (USD)</th>
                        <th>Market Cap</th>
                        <th>24h Change (%)</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCoins.map(coin => (
                        <tr key={coin.coinId}>
                            <td>{coin.name}</td>
                            <td>{coin.symbol.toUpperCase()}</td>
                            <td>${coin.price.toFixed(2)}</td>
                            <td>${coin.marketCap.toLocaleString()}</td>
                            <td>{coin.percentChange24h?.toFixed(2)}%</td>
                            <td>{new Date(coin.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoDashboard;
