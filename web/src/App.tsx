import './styles/main.css'
import logoImage from './assets/logo.svg'
import GameBanner from './components/GameBanner'
import CreateAds from './components/CreateAds'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'
interface gameProps {
  id: string
  title: string
  bannerURL: string
  _count: {
    ads: number
  }
}

function App() {
  const [game, setGame] = useState<gameProps[]>([])
  useEffect(() => {
    axios('http://localhost:8880/games')
      .then(res => {setGame(res.data)})
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImage} />

      <h1 className="text-6xl text-white mt-20 font-black">
        Seu
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          {' '}
          duo{' '}
        </span>{' '}
        está aqui.
      </h1>

      <div className="flex mt-16 gap-3 mx-6"> 
        {game.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              ads={game._count.ads}
              bannerUrl={game.bannerURL}
            />
            
          )
        })}  
      </div>

      <Dialog.Root>
        <CreateAds />
        <CreateAdModal/>
        
      </Dialog.Root>
    </div>
  )
}

export default App
