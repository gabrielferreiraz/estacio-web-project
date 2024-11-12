import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import { z } from 'zod'

const formSchema = z.object({
  curso: z.string().min(3, 'É necessario informar pelo menos 3 caracteres'),
  turno: z.string().min(3, 'É necessario informar pelo menos 3 caracteres'),
  disciplina: z.string().min(3, 'É necessario informar pelo menos 3 caracteres'),
  professor: z.string().min(3, 'É necessario informar pelo menos 3 caracteres'),
  sala: z.string().min(3, 'É necessario informar pelo menos 3 caracteres'),
  statusAluno: z.string(),
})

type FormProps = z.infer<typeof formSchema>

export function FormCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { curso: '', disciplina: '', professor: '', sala: '', turno: '', statusAluno: '' },
  })

  const handleAddCard = async (form: FormProps) => {
    console.log('formulario recebido:', form)
  }

  return (
    <form onSubmit={handleSubmit(handleAddCard)} className="ml-32 flex">
      <div className="flex flex-col gap-9">
        <label className="mt-8 flex items-center">
          <input type="radio" {...register('statusAluno')} />
          <span className="ml-2 text-white">Calouros</span>
        </label>
        <label className="flex items-center">
          <input type="radio" {...register('statusAluno')} />
          <span className="ml-2 text-white">Veteranos</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="mx-10 my-4 flex w-auto max-w-48 flex-col">
          <label htmlFor="Curso" className="pb-1 pl-2 text-sm text-white">
            <h3>Curso:</h3>
          </label>
          <input
            {...register('curso')}
            type="text"
            placeholder="Curso"
            className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            required
          />
          {errors.curso && <span className="text-sm text-red-600">{errors.curso.message}</span>}

          <label htmlFor="Disciplina" className="mt-4 text-sm text-white">
            <h3>Disciplina:</h3>
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

        <div className="mx-10 my-4 flex w-auto max-w-48 flex-col">
          <label htmlFor="Professor" className="pb-1 pl-2 text-sm text-white">
            <h3>Professor:</h3>
          </label>
          <input
            type="text"
            {...register('professor')}
            placeholder="Professor"
            className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            required
          />
          {errors.professor && <span className="text-sm text-red-600">{errors.professor.message}</span>}

          <label htmlFor="Sala/Lab" className="mt-4 text-sm text-white">
            <h3>Sala/Lab:</h3>
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

        <div className="mx-10 my-4 flex w-auto max-w-48 flex-col">
          <label htmlFor="Turno" className="pb-1 pl-2 text-sm text-white">
            <h3>Turno:</h3>
          </label>

          <input
            type="text"
            {...register('turno')}
            placeholder="Turno"
            className="h-auto max-h-10 w-auto max-w-52 rounded-lg border-2 border-zinc-600 bg-zinc-900 px-4 py-2 align-middle text-base text-zinc-200 caret-blue-300 outline-none transition ease-in-out placeholder:text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            required
          />
          {errors.turno && <span className="text-sm text-red-600">{errors.turno.message}</span>}
        </div>
      </div>

      <div className="flex items-center">
        <button
          type="submit"
          className="mt-14 h-10 w-36 rounded-2xl border-2 border-blue-400 bg-blue-500 text-white transition ease-out hover:bg-blue-800"
        >
          Adicionar
        </button>
        <GoPlus className="ml-[-135px] mt-14" color="#00FFFF" size={23} />
      </div>
    </form>
  )
}
