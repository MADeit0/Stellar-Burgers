/**
 * Возвращает строку с правильным окончанием для фразы.
 * @param {number} count - Число дней.
 * @returns {string} Строка с правильным суффиксом.
 */
export function countSelections(count: number = 0): string {
  const suffixes = new Map([
    ['one', 'день назад'],
    ['two', 'дня назад'],
    ['few', 'дня назад'],
    ['many', 'дней назад'],
    ['other', 'дней назад'],
  ]);

  const pluralRules = new Intl.PluralRules('ru').select(count);
  const rule = suffixes.get(pluralRules) as string;

  return rule;
}

/**
 * Форматирует дату и время в соответствии с требуемым форматом.
 * @param {Date} dateString - Строка, содержащая дату и время в формате ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).
 * @returns {string} Отформатированная строка с указанием времени, прошедшего с момента указанной даты.
 */
export function formatDate(dateString: Date): string {
  let timeAgo = '';
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
    default:
      timeAgo = `${days} ${countSelections(days)}`;
      break;
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Moscow',
  };

  const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);

  return `${timeAgo}, ${formattedDate}`;
}
