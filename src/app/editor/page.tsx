'use client'

import Image from 'next/image'

import { CardModel } from '@/components/ui/Card'

import { FormCard } from './FormCard'

interface CardModelProps {
  titleCard: string
  roomInfo: {
    discipline: string
    teacher: string
    room: string
  }[]
}

interface CardsProps {
  cards: CardModelProps[]
}

export default function Editor() {
  console.log('renderizando')
  // const cardData: CardModelProps = {
  //   titleCard: 'TADS-PRESENCIAL',
  //   roomInfo: [
  //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //   ],
  // }

  const cardsData: CardsProps = {
    cards: [
      {
        titleCard: 'TADS-PRESENCIAL',
        roomInfo: [
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
        ],
      },
      {
        titleCard: 'DIREITO',
        roomInfo: [
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
        ],
      },
      {
        titleCard: 'TADS-PRESENCIAL',
        roomInfo: [
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
        ],
      },
      {
        titleCard: 'TADS-PRESENCIAL',
        roomInfo: [
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
        ],
      },
      {
        titleCard: 'TADS-PRESENCIAL',
        roomInfo: [
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
        ],
      },
      {
        titleCard: 'TADS-PRESENCIAL',
        roomInfo: [
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
          { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
        ],
      },
    ],
  }

  return (
    <div className="overflow-hidden">
      <header className="flex h-auto border-b-4 border-b-zinc-400 border-opacity-50 bg-zinc-800 p-8">
        <div className="flex h-auto flex-col md:flex-row">
          <div className="flex flex-col items-center justify-between pb-8 md:pb-0">
            <Image src="/img/logo-estacio-branco.png" alt="Logo Estácio" width={158} height={10} />
            <h2 className="hidden whitespace-nowrap text-xl font-semibold text-white md:block">Pré-visualização</h2>
          </div>
          <FormCard />
          <h2 className="mx-auto block whitespace-nowrap text-xl font-semibold text-white md:hidden">
            Pré-visualização
          </h2>
        </div>
      </header>

      <div className="flex w-full flex-wrap items-center justify-center gap-8 bg-zinc-400 p-8">
        {cardsData.cards.map((card, index) => (
          <CardModel key={index} {...card} />
        ))}
      </div>
    </div>
  )
}
// const handleFetch = async () => {
//   console.log('chamei a api')
//   try {
//     const res = await fetch('http://localhost:3000/api/usuarios', { method: 'GET' })
//     console.log(res)
//   } catch (error) {
//     console.log(error)
//   }
// }

// return (
//   <div>
//     <h1>Pagina Contatos</h1>
//     <button className="bg-zinc-700 p-4" onClick={() => handleFetch()}>
//       Fazer requisição
//     </button>
//     <Teste />
//   </div>
// )
