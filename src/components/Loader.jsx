import logo from '../img/logo.png';
function Loader() {
  return (
    <div className='flex items-center justify-center h-screen m-auto z-50'>
      <img src={logo} alt='Logo' className='w-28 h-28 animate-spin' />
    </div>
  );
}

export default Loader;
