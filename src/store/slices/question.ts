import { StateCreator } from "zustand"

export interface QuestionSlice {
  content: string
  setContent: (content: string) => void
}

export const createQuestionSlice: StateCreator<
  QuestionSlice,
  [],
  [],
  QuestionSlice
> = (set, get) => ({
  content: '',
  setContent: (newContent) => {
    set((state) => ({ content: newContent }))
  }
})
