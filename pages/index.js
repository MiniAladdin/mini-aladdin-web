mport { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

export default function Home() {
  const [btcData, setBtcData] = useState([])
  const [ethData, setEthData] = useState([])
  const [labels, setLabels] = useState([])

  useEffect(() => {
    async function fetchData() {
      const btc = await fetch("https://api.kraken.com/0/public/OHLC?pair=BTCEUR&interval=60").then(res => res.json())
      const eth = await fetch("https://api.kraken.com/0/public/OHLC?pair=ETHEUR&interval=60").then(res => res.json())

      const btcOHLC = btc.result.XXBTZEUR.slice(-24)
      const ethOHLC = eth.result.XETHZEUR.slice(-24)

      setLabels(btcOHLC.map(item => new Date(item[0] * 1000).toLocaleTimeString()))
      setBtcData(btcOHLC.map(item => parseFloat(item[4])))
      setEthData(ethOHLC.map(item => parseFloat(item[4])))
    }
    fetchData()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Aladdin Web</h1>
      <h2>BTC/EUR</h2>
      <Line data={{ labels, datasets: [{ label: "BTC Close", data: btcData, borderColor: 'blue' }] }} />
      <h2>ETH/EUR</h2>
      <Line data={{ labels, datasets: [{ label: "ETH Close", data: ethData, borderColor: 'green' }] }} />
    </div>
  )
}
