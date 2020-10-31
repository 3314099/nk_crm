export default function ({ store, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    store.commit('admin/users/clear')
    store.commit('auth/clear')
    redirect('/error')
  }
}
