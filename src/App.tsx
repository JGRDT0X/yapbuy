import './App.css'
import './index.css'
import CryptoSpend from './CryptoSpend'

function App() {

  return (
    <>
    <div className='my-10'>
     <strong className='uppercase text-[#000]'>Spend your Magic Crypto Money</strong>
     <br/>made by 🗣️ <a className="text-[#0000FF] underline" href="https://yap.capital" target='_blank' >yap.capital </a>
     </div>
      <CryptoSpend />
    </>
  )
}

export default App
