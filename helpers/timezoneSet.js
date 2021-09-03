module.exports = (timezone, get) => {
  let nDate
  const obj = {
    timeZone: timezone
  }
  if (get == 'H') {
    obj.hour = '2-digit'
    obj.hour12 = false
  } else if (get == 'h') {
    obj.hour = '2-digit'
  } else if (get == 'i') {
    obj.minute = '2-digit'
  } else if (get == 's') {
    obj.second = '2-digit'
  } else if (get == 'd') {
    obj.day = 'numeric'
  } else if (get == 'd') {
    obj.weekday = 'long'
  } else if (get == 'm') {
    obj.month = 'long'
  } else if (get == 'Y') {
    obj.year = 'numeric'
  } else if (get == 'full') {
    obj.day = 'numeric'
    obj.month = 'long'
    obj.year = 'numeric'
    obj.hour = '2-digit'
    obj.minute = '2-digit'
    obj.second = '2-digit'
  } else if (get == 'full2') {
    obj.day = 'numeric'
    obj.month = 'numeric'
    obj.year = 'numeric'
    obj.hour = '2-digit'
    obj.minute = '2-digit'
    obj.second = '2-digit'
  } else if (get == 'jdate') {
    obj.weekday = 'short'
    obj.day = 'numeric'
    obj.month = 'long'
    obj.year = 'numeric'
  } else if (get == 'jdate2') {
    obj.day = 'numeric'
    obj.month = 'numeric'
    obj.year = 'numeric'
  } else if (get == 'fulltime24') {
    obj.hour = '2-digit'
    obj.minute = '2-digit'
    obj.second = '2-digit'
    obj.hour12 = false
  } else if (get == 'fulltime12') {
    obj.hour = '2-digit'
    obj.minute = '2-digit'
    obj.second = '2-digit'
  }
  nDate = new Date().toLocaleString('en-us', obj)
  return nDate
}
