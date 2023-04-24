import {
  getMainVideo,
  h2w169,
  h2w169Css,
  removeItem,
  setElWTL,
  sortVideosTopToBottom,
  w2h169Css,
} from "@pages/content/util";

export function setPipLayout(videos: Array<HTMLElement>) {
  if (videos.length != 2) {
    throw new Error("Incorrect number of videos to set PIP layout");
  }

  const mainVideo = getMainVideo(videos);
  const pipVideo = removeItem(videos, mainVideo)[0];

  const mainVideoWidth = `${h2w169(100)}vh`;
  const pipVideoMinRatio = 2;
  const pipVideoMinWidth = `calc(${mainVideoWidth} / ${pipVideoMinRatio})`;

  const remainingWidth = `calc(100vw - ${mainVideoWidth})`;
  const pipVideoWidth = `clamp(${pipVideoMinWidth}, ${remainingWidth}, ${mainVideoWidth})`;
  const pipVideoHeight = w2h169Css(pipVideoWidth);

  const mainVideoLeft = `max(0px, calc((100vw - ${mainVideoWidth} - ${pipVideoWidth}) / 2))`;

  setElWTL(mainVideo, mainVideoWidth, "0", mainVideoLeft);
  setElWTL(
    pipVideo,
    pipVideoWidth,
    `calc((100vh - ${pipVideoHeight}) / 2)`,
    `min(calc(100vw - ${pipVideoWidth}), calc(${mainVideoLeft} + ${mainVideoWidth}))`
  );
}

export function setSbsLayout(videos: Array<HTMLElement>) {
  if (videos.length != 2) {
    throw new Error("Incorrect number of videos to set SBS layout");
  }

  const leftVideo = getMainVideo(videos);
  const rightVideo = removeItem(videos, leftVideo)[0];

  const videoWidth = `min(50vw, ${h2w169(100)}vh)`;
  const videoHeight = w2h169Css(videoWidth);

  setElWTL(
    leftVideo,
    videoWidth,
    `calc((100vh - ${videoHeight}) / 2)`,
    `calc(50vw - ${videoWidth})`
  );
  setElWTL(
    rightVideo,
    videoWidth,
    `calc((100vh - ${videoHeight}) / 2)`,
    "50vw"
  );
}

export function setNUpLayout(videos: Array<HTMLElement>) {
  if (videos.length < 2) {
    throw new Error("Insufficient videos to set NUp layout");
  }

  const mainVideo = getMainVideo(videos);
  const sideVideos = sortVideosTopToBottom(removeItem(videos, mainVideo));

  const mainVideoWidth = `${h2w169(100)}vh`;
  const maxSideVideoWidth = `calc(100vw - ${mainVideoWidth})`;
  const maxSideVideoHeight = `${100 / sideVideos.length}vh`;

  const sideVideoWidth = `min(${maxSideVideoWidth}, ${h2w169Css(
    maxSideVideoHeight
  )})`;
  const sideVideoHeight = w2h169Css(sideVideoWidth);

  const mainVideoLeft = `calc((100vw - ${mainVideoWidth} - ${sideVideoWidth}) / 2)`;

  setElWTL(mainVideo, mainVideoWidth, "0", mainVideoLeft);
  sideVideos.forEach((v, i) => {
    setElWTL(
      v,
      sideVideoWidth,
      `calc((100vh - (${sideVideoHeight} * ${sideVideos.length})) / 2 + (${sideVideoHeight} * ${i}))`,
      `calc(${mainVideoLeft} + ${mainVideoWidth})`
    );
  });
}
