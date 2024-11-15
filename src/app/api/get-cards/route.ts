import { NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

export async function GET() {
  try {
    // await prisma.disciplina.delete({
    //   where: {
    //     id: '6c6dac4f-4ae1-483e-b8e8-7c9483b2529d',
    //   },
    // })

    // await prisma.disciplina.delete({
    //   where: {
    //     id: '93d3f957-d202-438b-aa2e-e70680f16951',
    //   },
    // })

    // await prisma.card.delete({
    //   where: {
    //     id: 'df614553-d928-4316-a4de-44f5d84086a0',
    //   },
    // })
    // await prisma.painel.delete({
    //   where: {
    //     id: '149ef6fd-6bc6-40db-96e3-7f660947736b',
    //   },
    // })

    /// ////////////////////////////////////////////////////////
    // const cursos = ['Engenharia de Software', 'Administração', 'Direito', 'Medicina', 'Psicologia', 'Arquitetura']

    // const disciplinasData = [
    //   { disciplina: 'Algoritmos', professor: 'Prof. João Silva', sala: 'Sala 101' },
    //   { disciplina: 'Estruturas de Dados', professor: 'Prof. Maria Souza', sala: 'Sala 102' },
    //   { disciplina: 'Introdução à Programação', professor: 'Prof. Carlos Lima', sala: 'Sala 103' },
    //   { disciplina: 'Gestão Financeira', professor: 'Prof. Ana Torres', sala: 'Sala 201' },
    //   { disciplina: 'Marketing', professor: 'Prof. Luiz Carvalho', sala: 'Sala 202' },
    //   { disciplina: 'Contabilidade', professor: 'Prof. Clara Mendes', sala: 'Sala 203' },
    //   { disciplina: 'Direito Penal', professor: 'Prof. Pedro Santos', sala: 'Sala 301' },
    //   { disciplina: 'Direito Civil', professor: 'Prof. Rafaela Cunha', sala: 'Sala 302' },
    //   { disciplina: 'Processo Penal', professor: 'Prof. Miguel Souza', sala: 'Sala 303' },
    //   { disciplina: 'Anatomia', professor: 'Prof. Laura Ribeiro', sala: 'Sala 401' },
    //   { disciplina: 'Fisiologia', professor: 'Prof. Ricardo Almeida', sala: 'Sala 402' },
    //   { disciplina: 'Biologia Celular', professor: 'Prof. Sofia Castro', sala: 'Sala 403' },
    //   { disciplina: 'Psicologia Geral', professor: 'Prof. Marcos Lima', sala: 'Sala 501' },
    //   { disciplina: 'Desenvolvimento Humano', professor: 'Prof. Carla Mendes', sala: 'Sala 502' },
    //   { disciplina: 'Psicologia Social', professor: 'Prof. Bruno Souza', sala: 'Sala 503' },
    //   { disciplina: 'Desenho Técnico', professor: 'Prof. Amanda Costa', sala: 'Sala 601' },
    //   { disciplina: 'Projetos de Arquitetura', professor: 'Prof. André Lima', sala: 'Sala 602' },
    //   { disciplina: 'Materiais de Construção', professor: 'Prof. Beatriz Santos', sala: 'Sala 603' },
    //   { disciplina: 'História da Arte', professor: 'Prof. Helena Figueiredo', sala: 'Sala 604' }, // Extra disciplina para o último card
    // ]

    // // Criação dos painéis
    // const painelCalouro = await prisma.painel.create({
    //   data: {
    //     statusAluno: 'CALOURO',
    //     turno: 'MANHA',
    //   },
    // })

    // const painelVeterano = await prisma.painel.create({
    //   data: {
    //     statusAluno: 'VETERANO',
    //     turno: 'TARDE',
    //   },
    // })

    // // Criação dos cards e disciplinas
    // for (let i = 0; i < cursos.length; i++) {
    //   const curso = cursos[i]
    //   const numDisciplinas = i === cursos.length - 1 ? 4 : 3 // 4 disciplinas para o último curso, 3 para os outros
    //   const disciplinas = disciplinasData.slice(i * 3, i * 3 + numDisciplinas)

    //   // Determina o painel (primeiros 3 cursos para calouros, restantes para veteranos)
    //   const painelId = i < 3 ? painelCalouro.id : painelVeterano.id

    //   await prisma.card.create({
    //     data: {
    //       curso,
    //       painelId,
    //       disciplinas: {
    //         create: disciplinas,
    //       },
    //     },
    //   })
    // }

    // console.log('Dados inseridos com sucesso!')

    /// ////////////////////////////////////////////////////////
    // const painel = await prisma.painel.findMany({
    //   select: {
    //     statusAluno: true,
    //     turno: true,
    //     cards: {
    //       take: quantidadePorPagina, // Limita a busca a 6 cards
    //       skip: offset, // Controla o deslocamento para a página atual
    //       select: {
    //         curso: true,
    //         disciplinas: {
    //           select: {
    //             disciplina: true,
    //             professor: true,
    //             sala: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // })

    const painel = await prisma.painel.findMany({
      include: {
        cards: {
          select: {
            disciplinas: true,
            curso: true,
            id: true,
          },
        },
      },
    })

    return NextResponse.json({ painel }, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Erro no servidor', { status: 500 })
  }
}
