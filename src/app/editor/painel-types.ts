interface Disciplina {
  id: string
  cardId: string
  disciplina: string
  professor: string
  sala: string
}
export interface CardProps {
  id: string
  disciplinas: Disciplina[]
  curso: string
}

export interface PainelProps {
  id: string
  statusAluno: string
  turno: string
  cards: CardProps[]
}

export interface PainelEditorProps {
  painel: PainelProps[]
}
