export function formatNPWPInput(value: any) {
  const numbersOnly = value.replace(/\D/g, '');

  const parts = [
    numbersOnly.slice(0, 2),
    numbersOnly.slice(2, 5),
    numbersOnly.slice(5, 8),
    numbersOnly.slice(8, 9),
    numbersOnly.slice(9, 12),
    numbersOnly.slice(12, 15),
  ];

  let formatted = '';
  if (parts[0]) formatted += parts[0];
  if (parts[1]) formatted += '.' + parts[1];
  if (parts[2]) formatted += '.' + parts[2];
  if (parts[3]) formatted += '.' + parts[3];
  if (parts[4]) formatted += '-' + parts[4];
  if (parts[5]) formatted += '.' + parts[5];

  return formatted;
}

export const npwpNumberOnly = (value: string) => {
  const numbersOnly = value.replace(/\D/g, '');

  return numbersOnly;
}