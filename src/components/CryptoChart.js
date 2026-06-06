import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CryptoChart = () => {
  const [days, setDays] = useState(30); // Dynamic state for timeframes
  const [loading, setLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    chart: { type: 'line', zoomType: 'x' },
    title: { text: 'Cryptocurrency Historical Performance' },
    xAxis: {
      type: 'datetime',
      title: { text: 'Timeline' },
      dateTimeLabelFormats: { day: '%b %e', week: '%b %e' } // Clean date formatting
    },
    // DUAL Y-AXES: Left axis for high value, right axis for Litecoin
    yAxis: [
      {
        title: { text: 'BTC / ETH Price (USD)', style: { color: '#627EEA' } },
        labels: { format: '${value}' },
        opposite: false // Left side
      },
      {
        title: { text: 'LTC Price (USD)', style: { color: '#345D9D' } },
        labels: { format: '${value}' },
        opposite: true // Right side
      }
    ],
    tooltip: {
      shared: true,
      split: false,
      xDateFormat: '%B %e, %Y', // Beautiful full date inside hover tooltip
      valueDecimals: 2,
      valuePrefix: '$'
    },
    series: []
  });

  useEffect(() => {
    setLoading(true);
    const railsBackendUrl = 'http://localhost:3000';

    // Pass the active days state down to your Rails API dynamically
    fetch(`${railsBackendUrl}/api/crypto_rates/historical_month?days=${days}`, {
        method: "GET",
        credentials: "include", // 👈 REQUIRED: Tells the browser it is safe to load from port 3001
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server connectivity issue');
        return res.json();
      })
      .then((data) => {
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [
            { 
              name: 'Bitcoin', 
              data: data.bitcoin, 
              color: '#F7931A', 
              yAxis: 0 // Targets left axis
            },
            { 
              name: 'Ethereum', 
              data: data.ethereum, 
              color: '#627EEA', 
              yAxis: 0 // Targets left axis
            },
            { 
              name: 'Litecoin', 
              data: data.litecoin, 
              color: '#345D9D', 
              yAxis: 1 // Targets right axis (Litecoin scale)
            }
          ]
        }));
        setLoading(false);
      })
      .catch((err) => console.error('Error fetching crypto data:', err));
  }, [days]); // Component auto-updates whenever user toggles days state

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      {/* Dynamic Filter Buttons */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {[7, 30, 365].map((timeFrame) => (
          <button
            key={timeFrame}
            onClick={() => setDays(timeFrame)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: days === timeFrame ? '#007bff' : '#fff',
              color: days === timeFrame ? '#fff' : '#000',
              fontWeight: days === timeFrame ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            {timeFrame === 365 ? '1 Year' : `${timeFrame} Days`}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading historical timelines...</div>
      ) : (
        <HighchartsReact 
            highcharts={Highcharts} 
            options={chartOptions} 
            updateArgs={[true, true, true]} // FORCE Highcharts to redraw all 3 lines from scratch on update

            />
      )}
    </div>
  );
};

export default CryptoChart;
