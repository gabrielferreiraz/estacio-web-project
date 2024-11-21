'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { AiOutlineMail } from 'react-icons/ai'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { RiAccountCircleLine } from 'react-icons/ri'

interface EnvioFormProps {
  email: string
  password: string
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, register } = useForm({
    defaultValues: { email: '', password: '' },
  })

  const envioForm = (data: EnvioFormProps) => {
    console.log('Email', data)
    console.log('Senha: ', data.password)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-700">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image src="/img/img-bemvindo.png" alt="Bem-vindo" width={638} height={391} />

        <p className="text-5xl font-bold text-white">Seja bem-vindo</p>
      </div>

      <div className="flex w-1/3 justify-center border-2 border-zinc-600 border-l-zinc-500 border-opacity-50 bg-zinc-800">
        <div className="flex h-full w-full flex-col items-center">
          <div className="mt-8 flex w-full items-center justify-center">
            <Image src="/img/logo-estacio-branco.png" alt="logo" width={200} height={56} />
          </div>
          <div className="flex">
            <RiAccountCircleLine color="#00FFFF" size={28} className="mr-1 mt-10 flex" />
            <h1 className="mt-10 flex justify-center text-2xl font-bold text-zinc-300">Acesse sua conta</h1>
          </div>
          <form onSubmit={handleSubmit(envioForm)} className="mt-20 flex flex-col gap-8">
            <div className="flex flex-col">
              <label htmlFor="email" className="pb-1 pl-2 text-sm font-semibold text-zinc-300">
                E-mail
              </label>

              <div className="flex items-center">
                <input
                  type="text"
                  id="email"
                  {...register('email')}
                  placeholder="Digite seu e-mail"
                  className="flex h-10 w-80 justify-center rounded-lg border-2 border-zinc-600 bg-black px-4 align-middle text-white placeholder-gray-600 caret-blue-300 transition duration-700 ease-in-out placeholder:text-sm focus:border-blue-400 focus:outline-none"
                  required
                />
                <AiOutlineMail color="#00FFFF" size={20} className="ml-[-36px]" />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="pass" className="pb-1 pl-2 text-sm font-semibold text-zinc-300">
                Senha
              </label>

              <div className="flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="pass"
                  {...register('password')}
                  placeholder="Digite sua senha"
                  className="flex h-10 w-80 justify-center rounded-lg border-2 border-zinc-600 bg-black px-4 align-middle text-white placeholder-gray-600 caret-blue-300 transition duration-700 ease-in-out placeholder:text-sm focus:border-blue-400 focus:outline-none"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="">
                  {showPassword ? (
                    <LuEye size={20} color="#00FFFF" className="ml-[-36px]" />
                  ) : (
                    <LuEyeOff size={20} color="#00FFFF" className="ml-[-36px]" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="rounded bg-blue-500 py-2 pl-4 text-white transition ease-in-out hover:bg-blue-900"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// if (usuarios.length > 1) {
//   return (
//     <>
//       <p>adicionei um novo campo aqui, está vendo?</p>
//       {usuarios.map((user, index) => (
//         <div key={index} className="mt-4 flex border-spacing-1 flex-col gap-1 border-2 border-red-600">
//           <p>nome: {user.nome}</p>
//           <p>gmail: {user.email}</p>
//         </div>
//       ))}
//     </>
//   )
// }
