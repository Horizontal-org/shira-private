import { StateCreator } from "zustand"

export interface ExplanationsSlice {
  explanations: {
    index: number;
    text?: string;
  }[],
  selectedExplanation: number;
  // last explanation index
  explanationIndex: number;
  addExplanation: (index: number) => void
  updateExplanation: (index: number, text: string) => void
  deleteExplanation: (index: number) => void
  deleteExplanations: (componentId: number, componentType: string) => void
  changeSelected: (index: number) => void
  clearExplanations: () => void
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
  deleteExplanations: (componentId, componentType) => {
    let explanations = null
    if (componentType === 'text') {
      explanations = document.getElementById(`component-${componentType}-${componentId}`).querySelectorAll('[data-explanation]')
    } else {
      explanations = [document.getElementById(`component-${componentType}-${componentId}`)]
    }

    const toDelete = []    
    explanations.forEach((e) => {
      const dataExplanation = parseInt(e.getAttribute('data-explanation'))
      toDelete.push(dataExplanation)
    })
    
    set((state) => ({
      explanations: state.explanations.filter(e => !toDelete.includes(e.index))
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
  })),
  clearExplanations: () => {
    set((state) => ({
      explanations: [],
      selectedExplanation: 0,
      explanationIndex: 0,
    }))
  }
})
