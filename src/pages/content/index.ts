import {
  clearBordersAndPadding,
  filterVisibleVideos,
  isLayoutButton,
  isLayoutSpan,
} from "@pages/content/util";
import {
  setGridLayout,
  setNUpLayout,
  setPipLayout,
  setSbsLayout,
  setStdLayout,
} from "@pages/content/layouts";
import { setDefaultLayout } from "@pages/content/default-layouts";

document.addEventListener("click", e => click(e));
document.addEventListener("dblclick", e => doubleClick(e));
document.addEventListener("fullscreenchange", () =>
  setTimeout(main, kayoScriptExecMs)
);

let layout = "standard";
const kayoScriptExecMs = 250;

function click(e: MouseEvent) {
  if (!(e.target instanceof Element)) {
    return;
  }
  if (isLayoutButton(e.target)) {
    triggerLayoutButton(e.target);
  } else if (isLayoutSpan(e.target)) {
    triggerLayoutButton(e.target.parentElement);
  } else if (e.target.className.includes("layout-composer")) {
    setTimeout(main, kayoScriptExecMs);
  }
}

function triggerLayoutButton(el: Element) {
  const newLayout = el?.getAttribute("aria-label")?.toLowerCase();
  if (newLayout && layout != newLayout) {
    layout = newLayout;
    setTimeout(main, kayoScriptExecMs);
  }
}

function doubleClick(e: MouseEvent) {
  if (!(e.target instanceof Element) || e.target.tagName != "VIDEO") {
    return;
  }
  layout = "standard";
  setTimeout(main, kayoScriptExecMs);
}

function main() {
  const layoutEl: HTMLElement | null = document.querySelector<HTMLElement>(
    "div[class*=PlayerResponsiveSizer]"
  );
  if (layoutEl == null) {
    return;
  }

  const visibleLiEls: Array<HTMLElement> = filterVisibleVideos(
    layoutEl.querySelectorAll<HTMLElement>("li[class*=layout-composer]")
  );
  clearBordersAndPadding(visibleLiEls);

  const fsEl: Element | null = document.fullscreenElement;
  if (fsEl == null) {
    defaultLayout(visibleLiEls, layoutEl);
    return;
  }

  const aR = fsEl.clientWidth / fsEl.clientHeight;
  if (aR <= 16 / 9) {
    defaultLayout(visibleLiEls, layoutEl);
    return;
  }

  wideLayout(visibleLiEls, layoutEl);
}

function wideLayout(visibleLiEls: Array<HTMLElement>, layoutEl: HTMLElement) {
  console.log(`Kayo Ultrawide - overriding layout: ${layout.toUpperCase()}`);
  layoutEl.style.maxWidth = "100%";
  switch (layout) {
    case "pip":
      setPipLayout(visibleLiEls);
      break;
    case "2up":
      setSbsLayout(visibleLiEls);
      break;
    case "3up":
    case "4up":
      setNUpLayout(visibleLiEls);
      break;
    case "standard":
      setStdLayout(visibleLiEls);
      break;
    case "grid":
      setGridLayout(visibleLiEls);
      break;
  }
}

function defaultLayout(
  visibleLiEls: Array<HTMLElement>,
  layoutEl: HTMLElement
) {
  layoutEl.style.removeProperty("max-width");
  setDefaultLayout(visibleLiEls, layout);
}
