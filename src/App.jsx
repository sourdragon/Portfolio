import { useState, useEffect } from 'react'
import Desktop from './Desktop';
import Mobile from './Mobile'

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 576)
  
  return (
    <div className='bg-indigo-950 w-screen h-screen'>
      {isDesktop ? <Desktop style={{backgroundColor : 'red'}} /> : <Mobile />  }
    </div>
  )
}

export default App;