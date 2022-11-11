// Converte um valor de data para o formato brasileiro
export function formatDateToBR(date: number) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
