import "./styles/style.css";
import "./assets/index.js";
import "./script/components/index.js";
import "./script/layout/index.js";
import view from "./script/view/view.js";

document.addEventListener("DOMContentLoaded", () => {
  view();
  console.log(document.querySelector("nav-bar"));
});
