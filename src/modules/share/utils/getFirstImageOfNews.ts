import { isEmpty } from 'lodash';

export const getImageOfNews = (content: string): string => {
  const filterImage = content
    .split('<')
    .filter((tag: string) => tag.startsWith('img'));
  if (isEmpty(filterImage)) {
    return 'url("/logo.png")';
  }
  const firstImgSrc = filterImage[0]
    .split(' ')
    .filter((element: string) => element.startsWith('src'))[0]
    .split('=')[1]
    .replaceAll('"', '')
    .slice(0, -1);
  return `url("${firstImgSrc}")`;
};