// scrollUtils.js

export function setScrollbarWidth() {
  const scrollDiv = document.createElement("div");
  scrollDiv.style.visibility = "hidden";
  scrollDiv.style.overflow = "scroll";
  scrollDiv.style.width = "100px";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";

  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}
