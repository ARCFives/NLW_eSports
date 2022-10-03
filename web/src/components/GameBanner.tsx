import 'keen-slider/keen-slider.min.css'


interface gameBannerProps {
  bannerUrl: string
  title: string
  ads: number
}

export default function GameBanner({title, bannerUrl, ads}: gameBannerProps) {
  return(
    <div className="relative rounded-lg overflow-hidden keen-slider__slide">
          <img src={bannerUrl}/>
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
            <strong className="font-bold text-white block">{title}</strong>
            <span className="text-zinc-300 text-sm block mt-1">{ads} anuncio{ads >= 2 ? 's' : ''}</span>
          </div>
        </div>
  )
}