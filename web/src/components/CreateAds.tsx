import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export default function CreateAds() {
  return(
    <div className="pt-1 self-stretch rounded-lg bg-nlw-gradient overflow-hidden mt-8 ">
        <div className="bg-[#2a2634] py-6 px-8 flex justify-between items-center ">
          <div>
            <strong className='font-black text-2xl text-white'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <Dialog.Trigger className='px-4 py-3 bg-violet-500 text-white rounded-md hover:bg-violet-600 flex items-center gap-3'> 
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
            </Dialog.Trigger>
        </div>
      </div>
  )
}