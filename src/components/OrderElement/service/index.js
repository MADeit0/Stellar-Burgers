export function formatDate(dateString) {
  //dateString = ISO 8601 Extended YYYY-MM-DDTHH:mm:ss.sssZ";

  let timeAgo = "";
  const date = new Date(dateString);
  const currentDate = new Date();

  const timeDiff = Math.abs(currentDate - date);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  switch (days) {
    case 0:
      timeAgo = `сегодня`;
      break;
    case 1:
      timeAgo = `вчера`;
      break;
    case days < 5:
      timeAgo = `${days} дня назад`;
      break;
    default:
      timeAgo = `${days} дней назад`;
      break;
  }

  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "Europe/Moscow",
  };

  const formattedDate = new Intl.DateTimeFormat("ru-RU", options).format(date);

  return `${timeAgo}, ${formattedDate}`;
}
