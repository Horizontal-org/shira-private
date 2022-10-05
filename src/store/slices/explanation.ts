import { StateCreator } from "zustand"

export interface ExplanationsSlice {
  explanations: {
    index: number;
    text?: string;
  }[],
  selectedExplanation: number;
  explanationIndex: number;
  addExplanation: (index: number) => void
  updateExplanation: (index: number, text: string) => void
  deleteExplanation: (index: number) => void
  changeSelected: (index: number) => void
}

export const createExplanationsSlice: StateCreator<
  ExplanationsSlice,
  [],
  [],
  ExplanationsSlice
> = (set, get) => ({
  explanations: [],
  selectedExplanation: 0,
  explanationIndex: 0,
  addExplanation: (index) => {
    set((state) => ({
      explanations: [
        ...state.explanations,
        { index: index, text: '' }
      ],
      explanationIndex: index
    }))
  },
  deleteExplanation: (index) => {
    set((state) => ({
      explanations: state.explanations.filter(e => e.index !== index)
    }))
  },
  updateExplanation: (index, text) => {
    let oldExplanations = get().explanations.filter(e => e.index !== index)
    set((state) => ({
     explanations: [
      ...oldExplanations,
      { index: index, text: text }
     ] 
    }))
  },
  changeSelected: (index) => set((state) => ({
    selectedExplanation: index
  }))
})
