export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function w2h169(width: number) {
  return (width * 9) / 16;
}

export function h2w169(height: number) {
  return (height * 16) / 9;
}

export function w2h169Css(width: string) {
  return `calc(${width} / 16 * 9)`;
}

export function h2w169Css(height: string) {
  return `calc(${height} * 16 / 9)`;
}

export function filterVisibleVideos(
  liVidEls: NodeListOf<HTMLElement>
): Array<HTMLElement> {
  return Array.prototype.slice
    .call(liVidEls)
    .filter(v => parseFloat(v.style.opacity) !== 0);
}

export function getMainVideo(videoLiEls: Array<HTMLElement>): HTMLElement {
  return videoLiEls.sort((a, b) => {
    return a.getBoundingClientRect().x - b.getBoundingClientRect().x;
  })[0];
}

export function sortVideosTopToBottom(
  videoLiEls: Array<HTMLElement>
): Array<HTMLElement> {
  return videoLiEls.sort((a, b) => {
    return a.getBoundingClientRect().y - b.getBoundingClientRect().y;
  });
}

export function clearBordersAndPadding(videoLiEls: Array<HTMLElement>) {
  videoLiEls.forEach(v => {
    v.style.border = "0";
    const videoEl: HTMLElement | null = v.querySelector<HTMLElement>("video");
    if (videoEl != null) {
      videoEl.style.padding = "0";
    }
  });
}

export function setElWTL(
  el: HTMLElement,
  width: string,
  top: string,
  left: string
) {
  el.style.width = width;
  el.style.top = top;
  el.style.left = left;
}

export function isLayoutButton(el: Element): boolean {
  return el.tagName == "BUTTON" && el.className.includes("layout-selector");
}

export function isLayoutSpan(el: Element): boolean {
  return el.tagName == "SPAN" && el.className.includes("layout-selector");
}
