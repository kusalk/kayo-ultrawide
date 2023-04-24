import { setStyles } from "@pages/content/default-layouts";

describe("setStyles", () => {
  let videos: Array<HTMLElement>;
  let defaultStyles;

  beforeEach(() => {
    videos = [
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
    ];
  });

  test("should apply styles to elements", () => {
    defaultStyles = [
      { color: "red", fontSize: "20px" },
      { color: "blue", fontSize: "24px" },
      { color: "green", fontSize: "18px" },
    ];

    setStyles(videos, defaultStyles);

    videos.forEach((video, i) => {
      expect(video.style.color).toBe(defaultStyles[i].color);
      expect(video.style.fontSize).toBe(defaultStyles[i].fontSize);
    });
  });

  test("should remove styles with null values", () => {
    videos[0].style.fontSize = "20px";
    videos[1].style.color = "blue";
    videos[2].style.fontSize = "20px";

    defaultStyles = [
      { color: "red", fontSize: null },
      { color: null, fontSize: "24px" },
      { color: "green", fontSize: null },
    ];

    setStyles(videos, defaultStyles);

    expect(videos[0].style.color).toBe("red");
    expect(videos[0].style.fontSize).toBe("");
    expect(videos[1].style.color).toBe("");
    expect(videos[1].style.fontSize).toBe("24px");
    expect(videos[2].style.color).toBe("green");
    expect(videos[2].style.fontSize).toBe("");
  });
});
