export default function ({ store, redirect }) {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const isAdmin = store.getters['auth/isAdmin']
  if (!isAuthenticated || !isAdmin) {
    store.commit('admin/users/clear')
    redirect('/error')
  }
}
