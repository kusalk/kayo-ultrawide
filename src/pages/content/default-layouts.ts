import {
  getMainVideo,
  removeItem,
  sortVideosGrid,
  sortVideosTopToBottom,
} from "@pages/content/util";

const kayoDefaults = {
  pip: [
    {
      top: null,
      left: null,
      width: "100%",
    },
    {
      top: "70%",
      left: "70%",
      width: "25%",
      "z-index": "1",
    },
  ],
  "2up": [
    {
      top: "25%",
      left: null,
      width: "50%",
    },
    {
      top: "25%",
      left: "50%",
      width: "50%",
    },
  ],
  "3up": [
    {
      top: "13%",
      left: null,
      width: "67%",
    },
    {
      top: "13%",
      left: "67%",
      width: "33%",
    },
    {
      top: "47%",
      left: "67%",
      width: "33%",
    },
  ],
  "4up": [
    {
      top: "13%",
      left: null,
      width: "75%",
    },
    {
      top: "13%",
      left: "75%",
      width: "25%",
    },
    {
      top: "38%",
      left: "75%",
      width: "25%",
    },
    {
      top: "63%",
      left: "75%",
      width: "25%",
    },
  ],
  standard: [
    {
      top: null,
      left: null,
      width: "100%",
    },
  ],
  grid: [
    {
      top: null,
      left: null,
      width: "50%",
    },
    {
      top: null,
      left: "50%",
      width: "50%",
    },
    {
      top: "50%",
      left: null,
      width: "50%",
    },
    {
      top: "50%",
      left: "50%",
      width: "50%",
    },
  ],
};

export function setDefaultLayout(
  visibleLiEls: Array<HTMLElement>,
  layout: string
) {
  switch (layout) {
    case "pip":
      setPipLayout(visibleLiEls);
      break;
    case "2up":
    case "3up":
    case "4up":
      setNUpLayout(visibleLiEls, kayoDefaults[layout]);
      break;
    case "standard":
      setStdLayout(visibleLiEls);
      break;
    case "grid":
      setGridLayout(visibleLiEls);
      break;
  }
}

function setPipLayout(visibleLiEls: Array<HTMLElement>) {
  const mainVideo = getMainVideo(visibleLiEls);
  const pipVideo = removeItem(visibleLiEls, mainVideo)[0];
  const sorted = [mainVideo, pipVideo];
  setStyles(sorted, kayoDefaults.pip);
}

function setNUpLayout(visibleLiEls: Array<HTMLElement>, defaultStyles) {
  const mainVideo = getMainVideo(visibleLiEls);
  const sideVideos = sortVideosTopToBottom(removeItem(visibleLiEls, mainVideo));
  const sorted = [mainVideo, ...sideVideos];
  setStyles(sorted, defaultStyles);
}

function setStdLayout(visibleLiEls: Array<HTMLElement>) {
  setStyles(visibleLiEls, kayoDefaults.standard);
}

function setGridLayout(visibleLiEls: Array<HTMLElement>) {
  setStyles(sortVideosGrid(visibleLiEls), kayoDefaults.grid);
}

export function setStyles(videos: Array<HTMLElement>, defaultStyles) {
  videos.forEach((video, i) => {
    const style = defaultStyles[i];
    for (const key in style) {
      video.style[key] = style[key];
    }
  });
}
