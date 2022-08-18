import millify from 'millify';
import React, { useCallback, useState, useEffect, useRef  } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { createChart, CrosshairMode } from 'lightweight-charts';
import SharePopup from './SharePopup';
import {volumeData} from './data';
import { priceData } from './priceData';
import TimePeriod from './TimePeriod';
import { useSelector } from 'react-redux';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';


const LineChart = ({coinHistory, coinName, coinCurrentPrice, coinColor, allTimeHigh, coinSymbol, coinUUID, coinIcon, cdata, time, timePeriod, setTimeperiod}) => {
  const symbol = useSelector((state) =>  state.currency.currency.sign ? state.currency.currency.sign : state.currency.currency.symbol);
  const currencySymbol = useSelector((state) => state.currency.currency.symbol);

// const coinPrice = [];
// const coinTimestamp = [];
let data = [];
const [ openShare, setOpenShare ] = useState(false);

const [getAreaPng, { ref: areaRef }] = useCurrentPng();
const handleAreaDownload = useCallback(async () => {
  const png = await getAreaPng();
  if (png) {
    FileSaver.saveAs(png, `${coinName.toLowerCase()}-to-usd.png`);
  }
}, [getAreaPng]);


// for(let i = 0; i < coinHistory?.data?.history?.length; i += 1){
//     coinPrice.push(coinHistory?.data.history[i].price);
//     coinTimestamp.push(new Date(coinHistory?.data?.history[i]?.timestamp*1000).toLocaleString('en-IN',{month:'short', day: 'numeric'}));
// }

//test code for recharts looping bruh
for(let i = 0; i < coinHistory?.data?.history?.length; i += 1){
  data.push({
    date: new Date(coinHistory?.data?.history[i]?.timestamp*1000).toLocaleDateString(),
    value: coinHistory?.data.history[i].price,
  });
  // coinPrice.push(coinHistory?.data.history[i].price);
  // coinTimestamp.push(new Date(coinHistory?.data?.history[i]?.timestamp*1000).toLocaleString('en-IN',{month:'short', day: 'numeric'}));
}

const [chartView, setChartView] = useState('price');


// const cdata = ohlcData?.data?.ohlc.map((d) => {return {time: new Date(d.startingAt), open: parseFloat(d.open), high: parseFloat(d.high), low: parseFloat(d.low), close: parseFloat(d.close)} });
// console.log(cdata)

const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  
  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    candleSeries.setData(Array.prototype.reverse.call(cdata));

    
    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    const volumeSeries = chart.current.addHistogramSeries({
      color: '#182233',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    volumeSeries.setData(volumeData);
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  

const shareLink = () => {
      setOpenShare(!openShare)
}

  return (
    <>
    <div className='flex flex-col xl:flex-row justify-between my-6 items-center'>
    <h3 className='text-4xl font-medium text-center xl:text-left'>{`${coinName} to ${currencySymbol} ${chartView === 'price' ? 'Price' : chartView === 'candlestick' ? 'CandleStick' : 'TradingView'}`} Chart</h3>
    <div className='flex items-center'>
        <div className='flex flex-col mr-4'>
          <span className='text-2xl font-semibold'><span className='text-sm'>{symbol}</span>{parseFloat(coinCurrentPrice).toFixed(2)}</span>
          <span className='text-sm'>1 {coinSymbol}</span>
        </div>
        <div className='flex flex-col'>
        <div className='flex items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-1 ${coinHistory?.data?.change < 0?'text-red-500':'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {coinHistory?.data?.change < 0 ? (<path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />) : (<path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />)}
        </svg>
        <span className={`text-2xl font-semibold mr-2 ${coinHistory?.data?.change < 0?'text-red-500':'text-green-500'}`}>{coinHistory?.data?.change ? coinHistory?.data?.change : 0}%</span>
        </div>
        <span className='text-sm'>24h Change</span>
        </div>
    </div>
    </div>
  {/* <div>
  <h5 className='text-base font-bold'>All Time High ${millify(allTimeHigh.price)} on {new Date(allTimeHigh.timestamp).toLocaleDateString()}</h5>
  </div> */}
    {/* <Line data={data} options={options} /> */}
    <div className='-mx-2'>
      <div className='flex  flex-col xl:flex-row items-baseline my-3'>
      <div className='flex items-center justify-center px-3 py-[0.40rem] bg-app-purple rounded-md mx-1 w-full xl:w-fit text-sm'>
        <button className={`px-2 py-1 ${chartView === 'price' ? 'bg-app-white text-app-purple shadow-sm' : 'bg-transparent text-app-white'}  rounded-md`} onClick={() => setChartView('price')}>
          Price
        </button>
        <button className={`px-2 py-1 ${chartView === 'candlestick' ? 'bg-app-white text-app-purple shadow-sm' : 'bg-transparent text-app-white'} rounded-md mx-1`} onClick={() => setChartView('candlestick')}>
        CandleStick
        </button>
        <button className={`px-2 py-1 ${chartView === 'tradingview' ? 'bg-app-white text-app-purple shadow-sm' : 'bg-transparent text-app-white'} rounded-md mx-1`} onClick={() => setChartView('tradingview')}>
          TradingView
        </button>
      </div>

      <div className='mr-auto ml-1 xl:mr-1 xl:ml-auto flex items-center '>
    <button onClick={handleAreaDownload} className="mr-1 text-xs xl:text-sm px-2 py-1 bg-app-white border-2 border-app-light-gray text-app-gray hover:bg-app-purple hover:text-app-white rounded-md transition-colors duration-200 mt-2 mb-4">
          <code>Download {coinName} Chart</code>
    </button>
    <button onClick={shareLink} className=" ml-1 flex items-center text-xs xl:text-sm px-2 py-1 bg-app-white border-2 border-app-light-gray text-app-gray hover:bg-app-purple hover:text-app-white rounded-md transition-colors duration-200 mt-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <code>Share</code>
    </button>
    </div>
    </div>

      {openShare && <SharePopup setClosePopup={setOpenShare} coinName={coinName} coinPrice={coinCurrentPrice} coinIcon={coinIcon} shareURL={`https://my-app.com/crypto/${coinUUID}`} /> }
      <ResponsiveContainer width="100%" height={450} id='cryptoRecharts' className={`${chartView === 'price' ? 'visible' : 'hidden'} z-0`}>
        <AreaChart data={data.reverse()} ref={areaRef}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={coinColor} stopOpacity={0.4} />
              <stop offset="75%" stopColor={coinColor} stopOpacity={0.00} />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke={coinColor} fill="url(#color)" />
          <XAxis style={{ fontSize: '0.9rem', fontFamily: 'Noto Sans'}} dataKey="date" axisLine={false} tickLine={false} tickFormatter={ str => {
          let myDate = str + ''
          myDate = myDate.split("/")
          let newDate = new Date( myDate[2], myDate[0], myDate[1])
          if(newDate){
          return newDate.toLocaleString('en-IN',{day:'numeric', month:'short',})
          }
          }} />
          <YAxis style={{ fontSize: '0.7rem', fontFamily: 'Noto Sans'}} dataKey="value" axisLine={false} tickLine={false} tickCount={8} tickFormatter={(number) => `${symbol}${number && number.toFixed(2)}`} />
          <Tooltip content={<CustomTooltip coinSymbol={coinSymbol && coinSymbol} coinColor={coinColor && coinColor} symbol={symbol} />} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
    </ResponsiveContainer>
    <div ref={chartContainerRef} className={`w-full h-[450px] rounded-md ${chartView === 'candlestick' ? 'visible' : 'hidden'}`}></div>
   <div className={`w-full h-[500px] ${chartView === 'tradingview' ? 'visible' : 'hidden'}`}>
    <TradingViewWidget symbol={`${coinSymbol}USDT`} theme={Themes.LIGHT} locale="en" autosize hide_side_toolbar={false} />
  </div>
  {chartView === 'price' && (<TimePeriod time={time} timePeriod={timePeriod} setTimeperiod={setTimeperiod} />)}
    </div>
    </>
  );
}

function CustomTooltip({ active, payload, label, coinSymbol, coinColor, symbol }) {
  const priceFun = (price) => {
    return Math.trunc(price).toString().length <= 1 ? Math.trunc(price) === 0 ? parseFloat(price).toFixed(6) : parseFloat(price).toFixed(3)  : parseFloat(price).toFixed(2)
  }

  if (active) {
    return (
      <div className={`py-2 px-4 bg-app-white border border-app-light-gray rounded-md shadow-lg items-stretch grid place-items-center`} style={{color: coinColor && coinColor}}>
        <p className='text-lg self-center'><span className='text-sm'>{symbol}</span>{payload[0]?.value.length > 0 ? priceFun(payload[0]?.value) : 'No Data'} {coinSymbol && coinSymbol}</p>
        <p className='text-sm font-semibold'>{label && new Date(label).toLocaleString('en-us',{day:'numeric' ,month:'long', year:'numeric'}).toUpperCase()}</p>
      </div>
    );
  }
  return null;
}

export default LineChart;
