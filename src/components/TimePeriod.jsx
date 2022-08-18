function TimePeriod({time, timePeriod, setTimeperiod}) {
  return (
    <div>
      <div className='px-6 py-1 rounded-md border-2 border-app-light-gray w-fit text-base text-app-gray mx-auto mt-3 mb-10'>
  {time.map((timeData, timeKey) => 
  <button key={timeKey} className={`px-2 py-1 rounded-md mx-1 text-sm xl:text-base ${timePeriod === timeData ? '' : 'hover:text-app-white hover:bg-[#505ce180]'} transition-colors duration-200 ${timePeriod === timeData ? 'bg-app-purple text-app-white' : 'bg-app-white text-app-gray' }`} onClick={() => setTimeperiod(timeData)}>{timeData}</button>
  )}
</div>
    </div>
  )
}

export default TimePeriod;
