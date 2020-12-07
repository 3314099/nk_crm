export default {
  data () {
    return {
      alertList: [
        {
          message: 'newLogCreated',
          alertType: 'none',
          color: 'success',
          log: false,
          text: 'api/controllers/logs/logs.controller.js - create'
        },
        {
          message: 'failedCreateLog',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/logs/logs.controller.js - create'
        },
        {
          message: 'failedMXtoCreateLog',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'mixins/logList/logList.mixin.js - MXtoCreateLog'
        },
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
          message: 'failedFetchGroups',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - fetchGroups'
        },
        {
          message: 'newGroupCreated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - create'
        },
        {
          message: 'failedCreateGroup',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - create'
        },
        {
          message: 'groupUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - update'
        },
        {
          message: 'failedUpdateGroup',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - update'
        },
        {
          message: 'groupRemoved',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - remove'
        },
        {
          message: 'failedRemoveGroup',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - remove'
        },
        {
          message: 'orderGroupsUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - chgOrderGroups'
        },
        {
          message: 'failedChgOrderGroups',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/groups.controller.js - chgOrderGroups'
        },
        {
          message: 'failedFetchCategoriesGroups',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - fetchCategoriesGroups'
        },
        {
          message: 'newCategoriesGroupCreated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - createCategoriesGroup'
        },
        {
          message: 'failedCreateGroup',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - createCategoriesGroup'
        },
        {
          message: 'categoriesGroupUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - updateCategoriesGroup'
        },
        {
          message: 'failedUpdateCategoriesGroup',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - updateCategoriesGroup'
        },
        {
          message: 'categoriesGroupRemoved',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - removeCategoriesGroup'
        },
        {
          message: 'failedRemoveCategoriesGroup',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - removeCategoriesGroup'
        },
        {
          message: 'orderCategoriesGroupsUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - chgOrderCategoriesGroups'
        },
        {
          message: 'failedChgOrderCategoriesGroups',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - chgOrderCategoriesGroups'
        },
        {
          message: 'failedFetchCategories',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - fetchCategories'
        },
        {
          message: 'newCategoryCreated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - createCategory'
        },
        {
          message: 'failedCreateCategory',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - createCategory'
        },
        {
          message: 'categoryUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - updateCategory'
        },
        {
          message: 'failedUpdateCategory',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - updateCategory'
        },
        {
          message: 'categoryRemoved',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - removeCategory'
        },
        {
          message: 'failedRemoveCategory',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - removeCategory'
        },
        {
          message: 'orderCategoriesUpdated',
          alertType: 'none',
          color: 'success',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - chgOrderCategories'
        },
        {
          message: 'failedChgOrderCategories',
          alertType: 'errorPanel',
          color: 'error',
          log: true,
          text: 'api/controllers/user/properties/categories.controller.js - chgOrderCategories'
        }
      ]
    }
  }
}
