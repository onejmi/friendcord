export default function ({ app }) {
    const $auth = app.$auth;
    const $cookies = app.$cookies;
    const $axios = app.$axios;
    const user = $auth.user
    if(!$cookies.get('authLogged')) {
        $cookies.set('authLogged', true, { path: '/app' })
        $axios.$post('/api/v1/auth/login', {
            id: user.id,
            email: user.email,
            a_token: $auth.strategy.token.get(),
            r_token: $auth.strategy.refreshToken.get()
        })
    }
}