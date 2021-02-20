import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebage from "grapesjs-preset-webpage";
import "./styles/main.scss";

function App() {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [gjsPresetWebage],
      pluginsOpts: {
        gjsPresetWebage: {},
      },
    });
    setEditor(editor);
  }, []);

  return (
    <div className="App">
      <div id="editor"></div>
    </div>
  );
}

export default App;
