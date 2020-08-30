// export default (value, type) => {
//   const date = new Date(value)
//   if (type === 'date') {
//     return date.toLocaleDateString()
//   } else if (type === 'time') {
//     return date.toLocaleTimeString()
//   }
//   return date.toLocaleString()
// }
export default function dateFilter (value, format = 'date') {
  const options = {}
  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = '2-digit'
    options.year = '2-digit'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(value))
}

// Options key examples:
//   day:
//     The representation of the day.
//   Possible values are "numeric", "2-digit".
//   weekday:
// The representation of the weekday.
//   Possible values are "narrow", "short", "long".
//   year:
// The representation of the year.
//   Possible values are "numeric", "2-digit".
//   month:
// The representation of the month.
//   Possible values are "numeric", "2-digit", "narrow", "short", "long".
//   hour:
// The representation of the hour.
//   Possible values are "numeric", "2-digit".
//   minute: The representation of the minute.
//   Possible values are "numeric", "2-digit".
//   second:
// The representation of the second.
//   Possible values are "numeric", 2-digit".
