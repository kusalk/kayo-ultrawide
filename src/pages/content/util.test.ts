import {
  clearBordersAndPadding,
  filterVisibleVideos,
  getMainVideo,
  h2w169,
  h2w169Css,
  isLayoutButton,
  removeItem,
  setElWTL,
  sortVideosTopToBottom,
  w2h169,
  w2h169Css,
} from "@pages/content/util";

describe("removeItem", () => {
  it("should remove an item from an array", () => {
    const arr = [1, 2, 3];
    removeItem(arr, 2);
    expect(arr).toEqual([1, 3]);
  });
});

describe("w2h169", () => {
  it("should convert width to height", () => {
    expect(w2h169(100)).toEqual(56.25);
  });
});

describe("h2w169", () => {
  it("should convert height to width", () => {
    expect(h2w169(56.25)).toEqual(100);
  });
});

describe("w2h169Css", () => {
  it("should convert width to height", () => {
    expect(w2h169Css("100px")).toEqual("calc(100px / 16 * 9)");
  });
});

describe("h2w169Css", () => {
  it("should convert height to width", () => {
    expect(h2w169Css("56.25px")).toEqual("calc(56.25px * 16 / 9)");
  });
});

describe("filterVisibleVideos", () => {
  it("should filter visible videos", () => {
    const liVidEls = document.createElement("div");
    liVidEls.innerHTML = `
      <li style="opacity: 0"></li>
      <li style="opacity: 1"></li>
    `;
    expect(filterVisibleVideos(liVidEls.querySelectorAll("li"))).toEqual([
      liVidEls.querySelector("li:nth-child(2)"),
    ]);
  });
});

describe("getMainVideo", () => {
  it("should get the main video", () => {
    const videoLiEls = document.createElement("div");
    videoLiEls.innerHTML = `
      <li style="left: 10px"></li>
      <li style="left: 20px"></li>
    `;
    expect(
      getMainVideo(
        Array.prototype.slice.call(videoLiEls.querySelectorAll("li"))
      )
    ).toEqual(videoLiEls.querySelector("li:nth-child(1)"));
  });
});

describe("sortVideosTopToBottom", () => {
  it("should sort videos top to bottom", () => {
    const videoLiEls = document.createElement("div");
    videoLiEls.innerHTML = `
      <li style="top: 30px"></li>
      <li style="top: 10px"></li>
      <li style="top: 20px"></li>
    `;
    videoLiEls.querySelectorAll("li").forEach(li => {
      li.getBoundingClientRect = () =>
        ({
          y: parseInt(li.style.top),
        } as DOMRect);
    });
    expect(
      sortVideosTopToBottom(
        Array.prototype.slice.call(videoLiEls.querySelectorAll("li"))
      )
    ).toEqual([
      videoLiEls.querySelector("li:nth-child(2)"),
      videoLiEls.querySelector("li:nth-child(3)"),
      videoLiEls.querySelector("li:nth-child(1)"),
    ]);
  });
});

describe("clearBordersAndPadding", () => {
  it("should clear borders and padding", () => {
    const videoLiEls = document.createElement("div");
    videoLiEls.innerHTML = `
      <li style="border: 1px solid black">
        <video style="padding: 10px"></video>
      </li>
    `;
    clearBordersAndPadding(
      Array.prototype.slice.call(videoLiEls.querySelectorAll("li"))
    );
    expect(videoLiEls.querySelector("li").style.border).toEqual("0px");
    expect(videoLiEls.querySelector("video").style.padding).toEqual("0px");
  });
});

describe("setElWTL", () => {
  it("should set element width, top, and left", () => {
    const videoLiEls = document.createElement("div");
    videoLiEls.innerHTML = `
      <li></li>
    `;
    const li = videoLiEls.querySelector("li");
    setElWTL(li, "100px", "10px", "20px");
    expect(li.style.width).toEqual("100px");
    expect(li.style.top).toEqual("10px");
    expect(li.style.left).toEqual("20px");
  });
});

describe("isLayoutButton", () => {
  it("should return true if element is a layout button", () => {
    const el = document.createElement("button");
    el.classList.add("layout-selector");
    expect(isLayoutButton(el)).toEqual(true);
  });

  it("should return false if element is not a button", () => {
    const el = document.createElement("div");
    el.classList.add("layout-selector");
    expect(isLayoutButton(el)).toEqual(false);
  });

  it("should return false if element does not have the correct class", () => {
    const el = document.createElement("button");
    el.classList.add("layout-button");
    expect(isLayoutButton(el)).toEqual(false);
  });
});
