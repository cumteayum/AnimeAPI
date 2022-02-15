export function rectifyQueryParams(str: string): string {
  return str.split(' ').join('+');
}
export function originalizeQueryParams(str: string): {title: string, id: number} {
  const cache = str.split('+').join(' ').split('&id=');
  return {title: cache[0], id: parseInt(cache[1])};
}
export function pushRectifiedQueryParam(str: string, id: number | string): string {
  return `${rectifyQueryParams(str)}&id=${+id}`
}
