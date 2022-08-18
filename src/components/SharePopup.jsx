import {TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon, WeiboShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, WhatsappShareButton} from 'react-share';
import copy from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
function SharePopup({ setClosePopup, shareURL, coinName, coinPrice, coinIcon }) {
  const symbol = useSelector((state) =>  state.currency.currency.sign ? state.currency.currency.sign : state.currency.currency.symbol);
  function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}
  return (
    <>
    <div className='w-full h-full top-0 right-0 bottom-0 left-0 fixed flex items-center justify-center bg-[#2121216a] z-50' >
      <div className='absolute'>
      <div className='px-1 xl:px-6 pb-6 xl:pb-10 pt-5 xl:pt-9 bg-white rounded-lg shadow-lg' style={{zIndex: 60}} >
          <div className='w-full grid justify-end mb-1'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-app-gray hover:text-red-500 transition-colors duration-200 cursor-pointer" onClick={() => setClosePopup(false)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        <div className='grid justify-center'>
        <img src={coinIcon} alt={coinName} className='h-12 w-12 xl:h-14 xl:w-14  mx-auto mb-4' />    
        <h4 className='mx-auto text-xl xl:text-2xl font-bold my-2 xl:my-3'>Share it with your friends</h4>
        <p className='text-sm xl:text-base mx-auto'>The price of <span className='text-base xl:text-lg text-app-gray font-semibold'>{coinName}</span> is {symbol}{parseFloat(coinPrice).toFixed(2)}!</p>
        <div className='my-4 mx-auto'>
            <FacebookShareButton className='mx-1' url={shareURL} quote={`Hey!! Check Out ${coinName} pricing and other stats on MyApp.`} hashtag={`#MyAppName #${coinName}`} >
                <FacebookIcon size={34} round={true} />
            </FacebookShareButton>
            <TwitterShareButton className='mx-1' url={shareURL} quote={`Hey!! Check Out ${coinName} pricing and other stats on MyApp.`} hashtag={`#MyAppName #${coinName}`} >
                <TwitterIcon size={34} round={true} />
            </TwitterShareButton>
            <TelegramShareButton className='mx-1' url={shareURL} quote={`Hey!! Check Out ${coinName} pricing and other stats on MyApp.`} >
                <TelegramIcon size={34} round={true} />
            </TelegramShareButton>
            <WhatsappShareButton className='mx-1' url={`Hey!! Check Out ${coinName} pricing and other stats on MyApp. ${shareURL}`} quote={`Hey!! Check Out ${coinName} pricing and other stats on MyApp.`} >
                <WhatsappIcon size={34} round={true} />
            </WhatsappShareButton>
        </div>
        </div>
        <div className='px-1'>
        <span className='text-sm xl:text-base'>Or copy link</span>
        <div className="flex items-center mt-1 border-2 rounded-md relative z-40 w-96 bg-app-white border-neutral-200">
        <span className='w-full px-2 py-2 truncate'>{shareURL}</span>
        <button className='mr-2 px-1.5 py-1 bg-app-purple text-app-white rounded-md' onClick={() => copyToClipboard(shareURL)}>Copy</button>
        </div>
        <div>

        </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default SharePopup;
