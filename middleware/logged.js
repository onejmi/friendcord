export default function ({ store, app }) {
    const $cookies = app.$cookies;

    if(!$cookies.get('authLogged')) {
        if(!store.state.loadingPrefs) store.commit('invert')
        $cookies.set('authLogged', true, { path: '/app' })
    }
}