export default {
  methods: {
    setTime (date, val = null) {
      let newDate
      switch (val) {
        case 'start':
          newDate = new Date(date).setHours(0, 0, 0, 0)
          break
        case 'end':
          newDate = new Date(date).setHours(23, 59, 59, 0)
          break
        default:
          newDate = new Date()
      }
      return this.$moment(newDate).format()
    },
    formatDate (date, format = 'YY/MM/DD HH:mm') {
      return this.$moment(date).locale('ru').format(format)
    },
    orderItems (items) {
      return items.map((item, index) => {
        item.order = index + 1
        return item
      })
    },
    UfilterByType (array, field, val) { // создает новый массив объектов с учетом свойства объекта и заначения
      return [...array].filter(o => o[field] === val)
    },
    UarrayFromObjectsArrayByField (array, field) { // создает массив из свойства объектов
      if (array.length) {
        return array.map(item => item[field])
      } else {
        return []
      }
    },
    UsortFromObjectsArrayByArray (ObjectsArray, Array, field) {
      let newArray = []
      if (Array.length && ObjectsArray.length) {
        Array.forEach((item) => {
          const newItem = ObjectsArray
            .filter(objectsItem => objectsItem[field].toString() === item.toString())
          if (newItem) {
            newArray = newArray.concat(newItem)
          }
        })
        return newArray
      } else {
        return []
      }
    },
    UsortBySortButton (array, button) {
      if (array) {
        switch (button) {
          case 'parentAlphabet':
            array = this.UsortObjectsArrayByText([...array].reverse(), 'parentTitle', false)
            break
          case 'rating':
            array = this.UsortObjectsArrayByText([...array], 'title', true)
            array = this.UsortObjectsArrayByNumber([...array], 'rating', true)
            break
          case 'parentRating':
            array = this.UsortObjectsArrayByText([...array], 'parentTitle', true)
            array = this.UsortObjectsArrayByNumber([...array], 'parentRating', true)
            break
          default: // alphabet
            array = this.UsortObjectsArrayByText([...array], 'title', false)
            break
        }
        return array
      } else {
        return []
      }
    },
    UsortObjectsArrayByNumber (array, field, reverse = false) {
      const newArray = array.sort((a, b) => a[field] > b[field] ? 1 : -1)
      return reverse ? newArray.reverse() : newArray
    },
    UsortObjectsArrayByText (array, field, reverse = false) {
      const newArray = array.sort(function (a, b) {
        const nameA = a[field].toString().toLowerCase()
        const nameB = b[field].toString().toLowerCase()
        if (nameA < nameB) { return -1 }
        if (nameA > nameB) { return 1 }
        return 0
      })
      return reverse ? newArray.reverse() : newArray
    },
    UsortRuEnArray (arr, val) {
      return val ? arr.filter(item =>
        ((item.title.toLowerCase()).includes(this.translate(val).ru.toLowerCase()) ||
          (item.title.toLowerCase()).includes(this.translate(val).en.toLowerCase()))
      ) : arr
    },
    translate (val) {
      const translate = {
        ru: '',
        en: ''
      }
      const ruLits = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
      const enLits = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']
      for (let i = 0; i < val.length; i++) {
        const ruIdx = ruLits.indexOf(val[i].toLowerCase())
        const enIdx = enLits.indexOf(val[i].toLowerCase())
        if (ruIdx >= 0) {
          translate.ru = translate.ru + ruLits[ruIdx]
          translate.en = translate.en + enLits[ruIdx]
        } else if (enIdx >= 0) {
          translate.ru = translate.ru + ruLits[enIdx]
          translate.en = translate.en + enLits[enIdx]
        } else {
          translate.ru = translate.ru + val[i]
          translate.en = translate.en + val[i]
        }
      }
      return translate
    }
  }
}
