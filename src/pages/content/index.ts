import {
  clearBordersAndPadding,
  filterVisibleVideos,
  isLayoutButton,
} from "@pages/content/util";
import {
  setNUpLayout,
  setPipLayout,
  setSbsLayout,
} from "@pages/content/layouts";

document.addEventListener("click", e => click(e));
document.addEventListener("dblclick", e => doubleClick(e));
document.addEventListener("fullscreenchange", () =>
  setTimeout(main, kayoScriptExecMs)
);

let layout = "standard";
const kayoScriptExecMs = 100;

function click(e: MouseEvent) {
  if (!(e.target instanceof Element)) {
    return;
  }
  if (isLayoutButton(e.target)) {
    const newLayout = e.target.getAttribute("aria-label")?.toLowerCase();
    if (newLayout) {
      layout = newLayout;
    }
    main();
  } else if (e.target.className.includes("layout-composer")) {
    setTimeout(main, kayoScriptExecMs);
  }
}

function doubleClick(e: MouseEvent) {
  if (!(e.target instanceof Element) || e.target.tagName != "VIDEO") {
    return;
  }
  layout = "standard";
  main();
}

function main() {
  const layoutEl: HTMLElement | null = document.querySelector<HTMLElement>(
    "div[class*=PlayerResponsiveSizer]"
  );
  if (layoutEl == null) {
    return;
  }
  const fsEl: Element | null = document.fullscreenElement;
  if (fsEl == null || fsEl.clientWidth / fsEl.clientHeight <= 16 / 9) {
    resetLayout(layoutEl);
    return;
  }

  const visibleLiEls: Array<HTMLElement> = filterVisibleVideos(
    layoutEl.querySelectorAll<HTMLElement>("li[class*=layout-composer]")
  );
  // TODO: Backup stock layout
  setLayout(visibleLiEls, layoutEl);
}

function setLayout(visibleLiEls: Array<HTMLElement>, layoutEl: HTMLElement) {
  layoutEl.style.maxWidth = "100%";
  clearBordersAndPadding(visibleLiEls);
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
    case "grid":
    default:
      resetLayout(layoutEl);
      break;
  }
}

function resetLayout(layoutEl: HTMLElement | null) {
  if (layoutEl) {
    layoutEl.style.removeProperty("max-width");
  }
  // TODO: Restore backed up stock layout
}
