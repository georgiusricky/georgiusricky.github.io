import { create } from 'zustand'
import { socials as defaultSocials } from '@/data/socials'
import { skills as defaultSkills } from '@/data/skills'
import { experiences as defaultExperiences } from '@/data/experiences'
import { projects as defaultProjects } from '@/data/projects'
import type { Socials, Skill, Experience, Project } from '@/types'

interface GlobalState {
  socials: Socials
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  setSocials: (socials: Partial<Socials>) => void
  setSkills: (skills: Skill[]) => void
  setExperiences: (experiences: Experience[]) => void
  setProjects: (projects: Project[]) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  socials: defaultSocials,
  skills: defaultSkills,
  experiences: defaultExperiences,
  projects: defaultProjects,

  setSocials: (socials) =>
    set((state) => ({ socials: { ...state.socials, ...socials } })),
  setSkills: (skills) => set(() => ({ skills })),
  setExperiences: (experiences) => set(() => ({ experiences })),
  setProjects: (projects) => set(() => ({ projects })),
}))

// Re-export types for backward compatibility
export type { Socials, Skill, Experience, Project } from '@/types'
