import create from 'zustand'
import { ExplanationsSlice, createExplanationsSlice } from '../store/slices/explanation'
import { AppsSlice, createAppsSlice } from './slices/apps'
import { AuthSlice, createAuthSlice } from './slices/auth'
import { createQuestionSlice, QuestionSlice } from './slices/question'

export const useStore = create<
  ExplanationsSlice &
  AppsSlice &
  QuestionSlice & 
  AuthSlice
>()((...a) => ({
  ...createExplanationsSlice(...a),
  ...createAppsSlice(...a),
  ...createQuestionSlice(...a),
  ...createAuthSlice(...a)
}))
