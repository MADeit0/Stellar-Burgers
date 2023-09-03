
/**
 * Форматирует дату и время в соответствии с требуемым форматом.
 * @param {Date} dateString - Строка, содержащая дату и время в формате ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).
 * @returns {string} Отформатированная строка с указанием времени, прошедшего с момента указанной даты.
 */
export function formatDate(dateString: Date): string {


  let timeAgo = "";
  const date = new Date(dateString).getTime();
  const currentDate = new Date().getTime();

  const timeDiff = Math.abs(currentDate - date);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  switch (days) {
    case 0:
      timeAgo = `сегодня`;
      break;
    case 1:
      timeAgo = `вчера`;
      break;
    case 2:
    case 3:
    case 4:
      timeAgo = `${days} дня назад`;
      break;
    default:
      timeAgo = `${days} дней назад`;
      break;
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "Europe/Moscow",
  };

  const formattedDate = new Intl.DateTimeFormat("ru-RU", options).format(date);

  return `${timeAgo}, ${formattedDate}`;
}
