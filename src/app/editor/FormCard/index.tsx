import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import { z } from 'zod'

const formSchema = z.object({
  curso: z.string().min(3, 'Informar ao menos 3 caracteres'),
  turno: z.string().min(3, 'Informar ao menos 3 caracteres'),
  disciplina: z.string().min(3, 'Informar ao menos 3 caracteres'),
  professor: z.string().min(3, 'Informar ao menos 3 caracteres'),
  sala: z.string().min(3, 'Informar ao menos 3 caracteres'),
  statusAluno: z
    .string()
    .min(1, 'Escolha um estágio do curso')
    .refine((value) => ['calouros', 'veteranos'].includes(value), { message: 'Selecione um estágio válido do curso' }),
})

export type FormCardProps = z.infer<typeof formSchema>

export function FormCard() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { curso: '', disciplina: '', professor: '', sala: '', turno: '', statusAluno: '' },
  })

  const handleAddCard = async (form: FormCardProps) => {
    try {
      await axios.post('/api/create-card', form)
      reset()
      await queryClient.invalidateQueries({ queryKey: ['get-cards', 'list-cards'] })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleAddCard)} className="flex flex-col items-center px-8 lg:flex-row">
      <div className="ml-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* <div className="mx-10 my-4 flex w-auto min-w-24 max-w-48 flex-col"> */}
        <div className="flex flex-col items-start">
          <label htmlFor="Curso" className="pb-1 pl-2 text-sm text-white">
            Curso:
          </label>
          <input
            {...register('curso')}
            type="text"
            placeholder="Curso"
            className="h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            required
          />
          {errors.curso && <span className="text-sm text-red-600">{errors.curso.message}</span>}
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="Disciplina" className="pb-1 pl-2 text-sm text-white">
            Disciplina:
          </label>
          <input
            type="text"
            {...register('disciplina')}
            placeholder="Disciplina"
            className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            required
          />
          {errors.disciplina && <span className="text-sm text-red-600">{errors.disciplina.message}</span>}
        </div>
        {/* </div> */}

        {/* <div className="mx-10 my-4 flex w-auto min-w-24 max-w-48 flex-col"> */}
        <div className="flex flex-col items-start">
          <label htmlFor="Professor" className="pb-1 pl-2 text-sm text-white">
            Professor:
          </label>
          <input
            type="text"
            {...register('professor')}
            placeholder="Professor"
            className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            required
          />
          {errors.professor && <span className="text-sm text-red-600">{errors.professor.message}</span>}
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="Sala/Lab" className="pb-1 pl-2 text-sm text-white">
            Sala/Lab:
          </label>
          <input
            type="text"
            {...register('sala')}
            placeholder="Sala/Lab"
            className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            required
          />
          {errors.sala && <span className="text-sm text-red-600">{errors.sala.message}</span>}
        </div>
        {/* </div> */}

        {/* <div className="mx-10 my-4 flex w-auto min-w-24 max-w-48 flex-col"> */}
        <div className="flex flex-col items-start">
          <label htmlFor="turno" className="pb-1 pl-2 text-sm text-white">
            Turno:
          </label>
          <select
            id="turno"
            {...register('turno', { required: 'Selecione um turno!' })} // Registra o campo
            className="max-h-10 w-full rounded-lg border-2 border-zinc-600 bg-zinc-900 py-2 pl-4 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          >
            <option value="">Selecione</option>
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
          </select>
        </div>

        <div className="mt-auto flex gap-2 pb-2">
          <label className="flex items-center">
            <input type="radio" value="calouros" {...register('statusAluno')} />
            <span className="ml-2 text-white">Calouros</span>
          </label>
          <label className="flex items-center">
            <input type="radio" value="veteranos" {...register('statusAluno')} />
            <span className="ml-2 text-white">Veteranos</span>
          </label>
        </div>
        {/* </div> */}
      </div>

      <div className="ml-4 mt-8 flex items-center lg:mt-0">
        <button
          type="submit"
          className="flex h-10 items-center justify-center gap-2 rounded-2xl border-2 border-blue-400 bg-blue-500 py-1 pl-3 pr-6 font-semibold text-white transition ease-out hover:bg-blue-800"
        >
          <GoPlus color="#00FFFF" size={23} />
          Adicionar
        </button>
      </div>
    </form>
  )
}
