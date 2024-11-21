'use client'

import { Disciplina } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { LuBuilding } from 'react-icons/lu'

import { CardProps } from '@/app/editor/painel-types'

export function CardModel(cardData: CardProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteFunction } = useMutation({
    mutationFn: async (discipline: Disciplina) => {
      await axios.delete(`/api/delete-discipline?disciplineId=${discipline.id}&cardId=${discipline.cardId}`)
    },
  })

  async function deleteDiscipline(discipline: Disciplina) {
    try {
      await deleteFunction(discipline)

      queryClient.invalidateQueries({
        queryKey: ['get-cards', 'list-cards'],
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-auto min-w-64 max-w-96 rounded-2xl bg-slate-600 p-4">
      <span className="text-2xl font-medium text-white">{cardData.curso}</span>

      {cardData.disciplinas.map((item, index) => {
        return (
          <div key={index} className="relative mt-3 w-full rounded-2xl border-2 border-zinc-700 bg-blue-800 px-4 py-2">
            <button
              onClick={() => deleteDiscipline(item)}
              className="absolute right-0 mr-2 rounded-md p-0.5 transition hover:bg-blue-900"
            >
              <IoMdClose fontSize={22} color="#fff" />
            </button>
            <div className="flex w-full justify-center border-b py-1">
              <span className="text-lg text-white">{item.disciplina}</span>
            </div>
            <div className="flex justify-between px-4 pb-1 pt-3">
              <div className="flex items-center gap-2">
                <FaChalkboardTeacher className="size-6 text-zinc-800" />
                <span className="text-white">{item.professor}</span>
              </div>
              <div className="flex items-center gap-2">
                <LuBuilding className="size-6 text-zinc-800" />
                <span className="text-white">{item.sala}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
