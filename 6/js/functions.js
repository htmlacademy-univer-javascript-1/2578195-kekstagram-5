function isMeetingWithinWorkHours(startWork, endWork, meetingStart, meetingDuration) {
  /**
   * Преобразует строку времени в общее количество минут с начала дня.
   * @param {string} timeStr - Время в формате 'часы:минуты'.
   * @returns {number} - Время в минутах с начала дня.
   */
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startWorkMinutes = timeToMinutes(startWork);
  const endWorkMinutes = timeToMinutes(endWork);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (
    meetingStartMinutes >= startWorkMinutes &&
    meetingEndMinutes <= endWorkMinutes
  );
}

// Тесты
isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900); // false
