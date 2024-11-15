interface Disciplina {
  id: string
  cardId: string
  disciplina: string
  professor: string
  sala: string
}
export interface CardProps {
  disciplinas: Disciplina[]
  curso: string
}

interface Painel {
  id: string
  statusAluno: string
  turno: string
  cards: CardProps[]
}

export interface PainelEditorProps {
  painel: Painel[]
}
