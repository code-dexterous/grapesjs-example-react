import grapesjs from "grapesjs";
import loadComponents from "./components";
import loadTraits from "./traits";

export default grapesjs.plugins.add(
  "tailwindComponent",
  (editor, opts = {}) => {
    let options = {};
    for (let name in options) {
      if (!(name in opts)) opts[name] = options[name];
    }

    loadTraits(editor, options);
    loadComponents(editor, opts);
  }
);
