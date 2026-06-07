import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GlobalGameVolume = () => {
  // 1. Manage loading states and data array using hooks instead of 'this.state'
  const [globalEconomyData, setGlobalEconomyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const railsBackendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
    
    setLoading(true);
    
    // 2. Clear credentials and structured headers matching CryptoChart
    fetch(`${railsBackendUrl}/api/crypto_rates/global_volume`, {
      method: "GET",
      credentials: "include", 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Global volume server connectivity issue');
        return res.json();
      })
      .then((volumeData) => {
        // 3. Update state cleanly using hook setters
        setGlobalEconomyData(volumeData);
        console.log("Global multiplayer transactional game volume loaded!", volumeData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading global network chart:", err);
        setLoading(false);
      });
  }, []); // Empty dependency array runs this exact request once on component mount

  // 4. Construct highcharts option configurations cleanly 
  const chartOptions = {
    chart: { type: 'area', backgroundColor: 'transparent' },
    title: { text: null },
    xAxis: { 
      type: 'datetime', 
      title: { text: 'Date Timeline' } 
    },
    yAxis: { 
      title: { text: 'Total Game Volume (USD)' },
      labels: { format: '${value}' }
    },
    tooltip: {
      shared: true,
      valueDecimals: 2,
      valuePrefix: '$'
    },
    plotOptions: {
        area: {
            marker: {
            enabled: true, // Forces the dot to show up even if there is only 1 point
            radius: 6,
            states: {
                hover: { enabled: true }
            }
            }
        }
    },
    series: [{
      name: 'Total Money Circulating',
      data: globalEconomyData, // Hooks pass array data straight here
      color: '#20b2aa' 
    }],
    credits: { enabled: false }
  };

  return (
    <div className="chart global-economy-graph mt-5 p-4 bg-white rounded shadow-sm" style={{ width: '100%', maxWidth: '900px', margin: '30px auto' }}>
      <h3 className="h5 mb-3 text-muted text-center">Multiplayer Global Market Activity (All Users Total Volume)</h3>
      
      {loading ? (
        <p className="text-center text-muted py-4 small">Loading volume metrics...</p>
      ) : globalEconomyData && globalEconomyData.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          updateArgs={[true, true, true]}
        />
      ) : (
        <p className="text-center text-muted py-4 small">Waiting for players to complete trades to populate global volume timeline metrics...</p>
      )}
    </div>
  );
};

export default GlobalGameVolume;
