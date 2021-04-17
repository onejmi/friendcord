export const state = () => ({
    loadingPrefs: false
  })
  
export const mutations = {
    invert(state: any) {
        state.loadingPrefs = !state.loadingPrefs
    }
}