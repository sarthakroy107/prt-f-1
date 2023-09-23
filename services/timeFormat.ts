export const formatTimeAgo =(timestamp: string | Date): string => {
  const now = new Date();
  const messageTime = new Date(Number(timestamp));
  const timeDifference = (now.getTime() - messageTime.getTime()) / 1000;

  if (timeDifference < 60) {
    return `${Math.floor(timeDifference)} secs ago`;
  } else if (timeDifference < 60 * 60) {
    return `${Math.floor(timeDifference / 60)} mins ago`;
  } else if (timeDifference < 24 * 60 * 60) {
    return `${Math.floor(timeDifference / 60 / 60)} hours ago`;
  } else if (timeDifference < 7 * 24 * 60 * 60) {
    const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek: string = daysOfWeek[messageTime.getUTCDay()];
    return `${dayOfWeek} at ${messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return messageTime.toLocaleDateString();
  }
}