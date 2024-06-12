import { create } from "zustand"

// definição do meu estado global
interface DarkModeStore {
  dark: boolean // variável
  change: () => void // método pra alterar minha variável
}

//crio um estado baseado na minha interface
export const useDarkMode = create<DarkModeStore>()(
  // inicializo as minhas variáveis e defino os comportamentos
  (set) => ({
    dark: true,
    change: () => set((store) => ({ dark: !store.dark })),
  })
)
