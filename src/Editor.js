import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebage from "grapesjs-preset-webpage";
import { useParams } from "react-router-dom";
import "./styles/main.scss";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  let { pageId } = useParams();

  console.log("pageId :>> ", pageId);

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

  return <div id="editor"></div>;
};

export default Editor;
