import {
  getMainVideo,
  h2w169,
  h2w169Css,
  removeItem,
  setElWTL,
  sortVideosGrid,
  sortVideosTopToBottom,
  w2h169Css,
} from "@pages/content/util";

export function setPipLayout(videos: Array<HTMLElement>) {
  if (videos.length != 2) {
    console.error("Incorrect number of videos to set PIP layout");
    return;
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
    console.error("Incorrect number of videos to set SBS layout");
    return;
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
    console.error("Insufficient videos to set NUp layout");
    return;
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

export function setStdLayout(videos: Array<HTMLElement>) {
  if (videos.length != 1) {
    console.error("Incorrect number of videos to set Standard layout");
    return;
  }

  const mainVideo = videos[0];

  const mainVideoWidth = `${h2w169(100)}vh`;
  const mainVideoLeft = `calc((100vw - ${mainVideoWidth}) / 2)`;

  setElWTL(mainVideo, mainVideoWidth, "0", mainVideoLeft);
}

export function setGridLayout(videos: Array<HTMLElement>) {
  if (videos.length != 4) {
    console.error("Incorrect number of videos to set Grid layout");
    return;
  }

  const orderedVideos = sortVideosGrid(videos);

  const topLeftVideo = orderedVideos[0];
  const topRightVideo = orderedVideos[1];
  const botLeftVideo = orderedVideos[2];
  const botRightVideo = orderedVideos[3];

  const videoWidth = `${h2w169(50)}vh`;
  const videoHeight = w2h169Css(videoWidth);

  const leftColLeft = `calc((100vw - 2 * ${videoWidth}) / 2)`;
  const rightColLeft = `calc(${leftColLeft} + ${videoWidth})`;

  setElWTL(topLeftVideo, videoWidth, "0", leftColLeft);
  setElWTL(botLeftVideo, videoWidth, videoHeight, leftColLeft);
  setElWTL(topRightVideo, videoWidth, "0", rightColLeft);
  setElWTL(botRightVideo, videoWidth, videoHeight, rightColLeft);
}
