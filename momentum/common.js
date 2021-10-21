function getTimeOfDay() {
  let hour = getHours()
  let timeOfDay = Math.floor(hour / 6)
  switch (timeOfDay) {
    case 0:
      result = 'night';
      break;
    case 1:
      result = 'morning';
      break;
    case 2:
      result = 'afternoon';
      break;
    case 3:
      result = 'evening';
      break;
  }
  return result
}
