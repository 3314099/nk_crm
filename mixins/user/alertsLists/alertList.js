export default {
  data () {
    return {
      alertList: [
        {
          message: 'logout',
          alertType: 'snackbar',
          color: 'success',
          log: false,
          text: 'Вы успешно вышли из системы'
        },
        {
          message: 'authed',
          alertType: 'snackbar',
          color: 'primary',
          log: false,
          text: 'Вы успешно вошли в систему'
        },
        {
          message: 'isAuthed',
          alertType: 'snackbar',
          color: 'success',
          log: false,
          text: 'Вы успешно вошли в систему'
        },
        {
          message: 'session',
          alertType: 'snackbar',
          color: 'teal',
          log: false,
          text: 'Необходимо войти в систему снова'
        },
        {
          message: 'newUser',
          alertType: 'snackbar',
          color: 'success',
          log: true,
          text: 'Новый пользователь добавлен'
        },
        {
          message: 'failLogin',
          alertType: 'snackbar',
          color: 'error',
          log: true,
          text: 'Не удалось войти в систему'
        },
        {
          message: 'newUserIsRegistered',
          alertType: 'snackbar',
          color: 'success',
          log: true,
          text: 'Новый пользователь зарегистрирован'
        },
        {
          message: 'userUpdated',
          alertType: 'snackbar',
          color: 'success',
          log: true,
          text: 'Пользователь успешно изменен'
        },
        {
          message: 'userDeleted',
          alertType: 'snackbar',
          color: 'success',
          log: true,
          text: 'Пользователь удалён'
        },
        {
          message: 'emailIsBusy',
          alertType: 'vuelidate',
          color: 'error',
          log: false,
          text: 'Такой Email уже зарегистрирован в системе'
        },
        {
          message: 'emailOrPassUncorrect',
          alertType: 'snackbar',
          color: 'error',
          log: false,
          text: 'Не удалось войти в систему'
        },
        {
          message: 'failedCreateSection',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - create'
        },
        {
          message: 'failedUpdateSection',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - update'
        },
        {
          message: 'failedRemoveSection',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - remove'
        },
        {
          message: 'failedChgOrderSections',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - chgOrderSections'
        },
        {
          message: 'newSectionCreated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - create'
        },
        {
          message: 'sectionUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - update'
        },
        {
          message: 'sectionRemoved',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - remove'
        },
        {
          message: 'orderSectionsUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/sections.controller.js - chgOrderSections'
        },
        {
          message: 'newLogCreated',
          alertType: 'none',
          color: 'success',
          log: false,
          text: 'api/controllers/logs/logs.controller.js - create'
        },
        {
          message: 'failedCreateLog',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/logs/logs.controller.js - create'
        },
      ]
    }
  }
}
