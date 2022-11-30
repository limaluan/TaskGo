// Converte um valor de data para o formato brasileiro
export function formatDateToBR(date: number) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function convertMsToTime(milliseconds: number): string {
  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}
