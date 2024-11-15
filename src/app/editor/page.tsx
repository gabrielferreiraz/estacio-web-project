'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import Image from 'next/image'

import { CardModel } from '@/components/ui/Card'

import 'dayjs/locale/pt-br'
import { FormCard } from './FormCard'
import { PainelEditorProps } from './painel-types'

// interface CardModelProps {
//   titleCard: string
//   roomInfo: {
//     discipline: string
//     teacher: string
//     room: string
//   }[]
// }

// interface CardsProps {
//   cards: CardModelProps[]
// }

export default function Editor() {
  const diaSemana = dayjs().locale('pt-br').format('dddd')
  const diaSemanaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
  // const cardsData: CardsProps = {
  //   cards: [
  //     {
  //       titleCard: 'TADS-PRESENCIAL',
  //       roomInfo: [
  //         { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //         { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //         { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //       ],
  //     },
  //     // {
  //     //   titleCard: 'DIREITO',
  //     //   roomInfo: [
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //   ],
  //     // },
  //     // {
  //     //   titleCard: 'TADS-PRESENCIAL',
  //     //   roomInfo: [
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //   ],
  //     // },
  //     // {
  //     //   titleCard: 'TADS-PRESENCIAL',
  //     //   roomInfo: [
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //   ],
  //     // },
  //     // {
  //     //   titleCard: 'TADS-PRESENCIAL',
  //     //   roomInfo: [
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //   ],
  //     // },
  //     // {
  //     //   titleCard: 'TADS-PRESENCIAL',
  //     //   roomInfo: [
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //   ],
  //     // },
  //     // {
  //     //   titleCard: 'TADS-PRESENCIAL',
  //     //   roomInfo: [
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //     { discipline: 'Eng.Software', teacher: 'Enilda', room: 'Lab.7' },
  //     //   ],
  //     // },
  //   ],
  // }

  const { data: painelItems } = useQuery({
    queryKey: ['get-cards', 'list-cards'],
    queryFn: async () => {
      const res = await axios.get('/api/get-cards')

      return res.data as PainelEditorProps
    },
  })

  if (!painelItems) {
    return <div className="flex h-screen w-full items-center justify-center">Carregando...</div>
  }

  console.log('depoiss de tratar', painelItems)
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

      <div className="flex w-full flex-col items-center bg-zinc-400 p-16">
        <div className="flex w-full flex-col justify-start">
          {/* depois a gente vê cores melhores */}
          <span className="-mt-12 mb-4 pr-6 text-5xl font-bold text-slate-600">
            {painelItems.painel[0].statusAluno}
          </span>
          <div className="flex gap-6 pb-10">
            <span className="border-r-2 pr-6 text-4xl font-bold">{diaSemanaFormatado.toLocaleUpperCase()}</span>
            <span className="border-l-2 pl-6 text-4xl font-bold">{painelItems.painel[0].turno}</span>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-9 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {painelItems.painel[0].cards.map((card, index) => (
            <CardModel key={index} {...card} />
          ))}
        </div>
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
