import create from 'zustand'
import { ExplanationsSlice, createExplanationsSlice } from '../store/slices/explanation'
import { AppsSlice, createAppsSlice } from './slices/apps'
import { createQuestionSlice, QuestionSlice } from './slices/question'

export const useStore = create<
  ExplanationsSlice &
  AppsSlice &
  QuestionSlice
>()((...a) => ({
  ...createExplanationsSlice(...a),
  ...createAppsSlice(...a),
  ...createQuestionSlice(...a),
}))
