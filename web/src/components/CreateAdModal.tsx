import { Check, GameController } from 'phosphor-react'
import { Input } from './Input'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState, FormEvent } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

interface gameProps {
  id: string
  title: string
}

export function CreateAdModal() {
  const [game, setGame] = useState<gameProps[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoice, setUseVoice] = useState(false)

  useEffect(() => {
    axios('http://localhost:8880/games').then(res => {
      setGame(res.data)
    })
  }, [])

 async function handleCreateAD(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:8880/games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: useVoice
    })
    alert('Anúncio criado!')
  } catch (err) {
    console.log(err)
    alert('Error ao criar o anúncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/25 inset-0 fixed" />
      <Dialog.Content
        className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg"
      >
        <Dialog.Title className="text-[32px] font-black">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAD} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              name="game"
              id="game"
              defaultValue=""
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>
              {game.map(game => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome (ou nickname)
            </label>
            <Input
              type="text"
              placeholder="Como te chamam dentro do game?"
              id="name"
              name="name"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">
                Joga há quantos anos?
              </label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">
                Qual seu Discord?
              </label>
              <Input
                type="text"
                placeholder="Usuario#0000"
                id="discord"
                name="discord"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Quando costuma jogar?
              </label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-1"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={` w-10 h-10 font-bold rounded  ${
                    weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                  }  `}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={` w-10 h-10 font-bold rounded  ${
                    weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                  }  `}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={` w-10 h-10 font-bold rounded  ${
                    weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                  }  `}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={` w-10 h-10 font-bold rounded  ${
                    weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                  }  `}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={` w-10 h-10 font-bold rounded  ${
                    weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                  }  `}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={` w-10 h-10 font-bold rounded  ${
                    weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                  }  `}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={` w-10 h-10 font-bold rounded  ${
                    weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                  }  `}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="" className="font-semibold">
                Qual horário do dia?
              </label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  id="hourStart"
                  name="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoice}
              onCheckedChange={checked => {
                if (checked === true) {
                  setUseVoice(true)
                } else {
                  setUseVoice(false)
                }
              }}
              className="w-6 h-6 rounded p-1 bg-zinc-900"
            >
              <Checkbox.Indicator>
                {' '}
                <Check className="w-4 h-4 text-emerald-400" />{' '}
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-8 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="px-5 py-3 bg-zinc-500 font-semibold 
                  rounded-md hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>

            <button
              type="submit"
              className="flex gap-3 items-center px-5 py-3 
                  rounded-md font-semibold bg-violet-500 hover:bg-violet-600 "
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
