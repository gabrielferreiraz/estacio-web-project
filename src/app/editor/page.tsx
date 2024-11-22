'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import Image from 'next/image'

import { CardModel } from '@/components/ui/Card'

import 'dayjs/locale/pt-br'
import { FormCard } from './FormCard'
import { PainelProps } from './painel-types'

export default function Editor() {
  const [status, setStatus] = useState('CALOURO')
  const [turno, setTurno] = useState('MANHA')

  const diaSemana = dayjs().locale('pt-br').format('dddd')
  const diaSemanaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)

  const { data: painelItems, refetch } = useQuery({
    queryKey: ['get-cards', 'list-cards', status, turno],
    queryFn: async () => {
      const res = await axios.get(`/api/get-cards?statusAluno=${status}&turno=${turno}`)

      if (res.data?.message) {
        return null
      }

      return res.data as PainelProps
    },
    gcTime: 0,
    staleTime: 0,
  })

  // UseEffect para refetch quando status ou turno mudarem
  useEffect(() => {
    refetch()
  }, [status, turno, refetch])

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value) // Atualiza o estado
  }

  const handleChangeTurno = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTurno(event.target.value) // Atualiza o estado
  }

  const formatedTurno = remapTurno(painelItems?.turno)
  const formatedStatusAluno = remapStatusAluno(painelItems?.statusAluno)

  return painelItems && painelItems.cards.length > 0 ? (
    <div className="overflow-hidden">
      <header className="flex h-auto border-b-4 border-b-zinc-400 border-opacity-50 bg-zinc-800 p-8">
        <div className="flex h-auto w-full flex-col justify-center md:flex-row">
          <div className="mr-auto flex max-w-60 flex-col items-center gap-16 pb-8 md:pb-0">
            <Image src="/img/logo-estacio-branco.png" alt="Logo Estácio" width={158} height={10} />
            <h2 className="mt-3 hidden whitespace-nowrap text-xl font-semibold text-white md:block">
              Pré-visualização
            </h2>
          </div>

          <FormCard />
          <h2 className="mx-auto mt-8 block whitespace-nowrap text-xl font-semibold text-white md:hidden">
            Pré-visualização
          </h2>
        </div>
      </header>

      <div className="flex w-full flex-col items-center bg-zinc-400 p-16">
        <div className="flex w-full flex-col-reverse justify-between md:flex-row">
          <div className="flex w-full flex-col justify-start">
            <span className="mb-4 pr-6 text-5xl font-bold text-slate-600 md:-mt-12">{formatedStatusAluno}</span>
            <div className="flex gap-6 pb-10">
              <span className="border-r-2 pr-6 text-4xl font-bold">{diaSemanaFormatado}</span>
              <span className="border-l-2 pl-6 text-4xl font-bold">{formatedTurno}</span>
            </div>
          </div>

          <div className="-mt-12 flex flex-col">
            <div>
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                onChange={handleChangeStatus}
                value={status}
                className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              >
                <option value="">Selecione</option>
                <option value="CALOURO">Calouro</option>
                <option value="VETERANO">Veterano</option>
              </select>
            </div>
            <div>
              <label htmlFor="turno">Turno:</label>
              <select
                id="turno"
                value={turno}
                onChange={handleChangeTurno}
                className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              >
                <option value="">Selecione</option>
                <option value="MANHA">Manhã</option>
                <option value="TARDE">Tarde</option>
                <option value="NOITE">Noite</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-9 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {painelItems.cards.map((card, index) => (
            <CardModel key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  ) : (
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

      <div className="relative flex h-auto w-full flex-col items-center bg-zinc-400 p-4">
        <div>
          <Image alt="empty" src="/img/undraw_void.png" width={300} height={300} />
        </div>
        <span className="mt-4 px-16 text-center text-4xl font-semibold text-white">
          Sem cursos e disciplinas cadastrados
        </span>
        <div className="absolute right-0 flex flex-col pr-4">
          <div className="mb-4 flex flex-col">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={handleChangeStatus}
              className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            >
              <option value="">Selecione</option>
              <option value="CALOURO">Calouro</option>
              <option value="VETERANO">Veterano</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="turno">Turno:</label>
            <select
              id="turno"
              value={turno}
              onChange={handleChangeTurno}
              className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            >
              <option value="">Selecione</option>
              <option value="MANHA">Manhã</option>
              <option value="TARDE">Tarde</option>
              <option value="NOITE">Noite</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mapeamento inverso para Turno
const turnoHumanizadoMap: { [key: string]: string } = {
  MANHA: 'Manhã',
  TARDE: 'Tarde',
  NOITE: 'Noite',
}

// Mapeamento inverso para StatusAluno
const statusAlunoHumanizadoMap: { [key: string]: string } = {
  CALOURO: 'Calouros',
  VETERANO: 'Veteranos',
}

// Função para transformar Turno no formato humanizado
function remapTurno(turno: string | undefined): string {
  if (!turno) {
    return 'Indefinido'
  }
  return turnoHumanizadoMap[turno]
}

// Função para transformar StatusAluno no formato humanizado
function remapStatusAluno(statusAluno: string | undefined): string {
  if (!statusAluno) {
    return 'Indefinido'
  }
  return statusAlunoHumanizadoMap[statusAluno]
}
