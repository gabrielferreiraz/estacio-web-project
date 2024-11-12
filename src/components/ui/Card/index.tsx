import { FaChalkboardTeacher } from 'react-icons/fa'
import { LuBuilding } from 'react-icons/lu'

interface CardModelProps {
  titleCard: string
  roomInfo: {
    discipline: string
    teacher: string
    room: string
  }[]
}

export function CardModel(cardData: CardModelProps) {
  return (
    <div className="w-96 rounded-2xl bg-slate-600 p-4">
      <span className="text-2xl font-medium text-white">{cardData.titleCard}</span>

      {cardData.roomInfo.map((item, index) => (
        <div key={index} className="mt-3 w-full rounded-2xl border-2 border-zinc-700 bg-blue-800 px-4 py-2">
          <div className="flex w-full justify-center border-b py-1">
            <span className="text-lg text-white">{item.discipline}</span>
          </div>
          <div className="flex justify-between px-4 pb-1 pt-3">
            <div className="flex items-center gap-2">
              <FaChalkboardTeacher className="size-6 text-zinc-800" />
              <span className="text-white">{item.teacher}</span>
            </div>
            <div className="flex items-center gap-2">
              <LuBuilding className="size-6 text-zinc-800" />
              <span className="text-white">{item.room}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
