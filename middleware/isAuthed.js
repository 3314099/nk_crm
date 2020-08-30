export default function ({ store, redirect }) {
  if (!store.getters['auth/isAuthenficated']) {
    redirect('/')
    store.dispatch('snackBar/changeSnackBar', 'failLogin')
  }
}
