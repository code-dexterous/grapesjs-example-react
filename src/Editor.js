import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import { useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

import "./styles/main.scss";
import { API_HOST } from "./api_utils";
import {
  deviceManager,
  layerManager,
  panels,
  selectorManager,
  styleManager,
  traitManager,
} from "./api_utils/grapesjs_utils";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  let { pageId } = useParams();

  console.log("pageId :>> ", pageId);

  useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await axios.get(`${API_HOST}assets/`);
        setAssets(response.data);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }

    getAllAssets();
  }, []);

  useEffect(() => {
    $(".panel__devices").html("");
    $(".panel__basic-actions").html("");
    const editor = grapesjs.init({
      container: "#editor",
      blockManager: {
        appendTo: "#blocks",
      },
      styleManager: styleManager,
      layerManager: layerManager,
      traitManager: traitManager,
      selectorManager: selectorManager,
      panels: panels,
      deviceManager: deviceManager,
      storageManager: {
        type: "remote",
        stepsBeforeSave: 3,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        headers: {
          "Content-Type": "application/json",
        },
        id: "mycustom-",
        urlStore: `${API_HOST}pages/${pageId}/content`,
        urlLoad: `${API_HOST}pages/${pageId}/content`,
      },
      assetManager: {
        upload: false,
        assets: assets,
        storeOnChange: false,
        storeAfterUpload: false,
      },
      plugins: [gjsBlockBasic],
      pluginsOpts: {
        gjsBlockBasic: {},
      },
    });

    // Commands
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });

    setEditor(editor);
  }, [assets, pageId]);

  return (
    <>
      {" "}
      <div id="navbar" className="sidenav d-flex flex-column overflow-scroll">
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h3 logo">Code Dexterous</span>
          </div>
        </nav>
        <div className="">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="block-tab"
                data-bs-toggle="tab"
                data-bs-target="#block"
                type="button"
                role="tab"
                aria-controls="block"
                aria-selected="true"
              >
                <i className="fa fa-cubes"></i>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="layer-tab"
                data-bs-toggle="tab"
                data-bs-target="#layer"
                type="button"
                role="tab"
                aria-controls="layer"
                aria-selected="false"
              >
                <i className="fa fa-tasks"></i>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="style-tab"
                data-bs-toggle="tab"
                data-bs-target="#style"
                type="button"
                role="tab"
                aria-controls="style"
                aria-selected="false"
              >
                <i className="fa fa-paint-brush"></i>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="trait-tab"
                data-bs-toggle="tab"
                data-bs-target="#trait"
                type="button"
                role="tab"
                aria-controls="trait"
                aria-selected="false"
              >
                <i className="fa fa-cog"></i>
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="block"
              role="tabpanel"
              aria-labelledby="block-tab"
            >
              <div id="blocks"></div>
            </div>
            <div
              className="tab-pane fade"
              id="layer"
              role="tabpanel"
              aria-labelledby="layer-tab"
            >
              <div id="layers-container"></div>
            </div>
            <div
              className="tab-pane fade"
              id="style"
              role="tabpanel"
              aria-labelledby="style-tab"
            >
              <div id="styles-container"></div>
            </div>
            <div
              className="tab-pane fade"
              id="trait"
              role="tabpanel"
              aria-labelledby="trait-tab"
            >
              <div id="trait-container"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <div className="panel__devices"></div>
            <div className="panel__basic-actions"></div>
          </div>
        </nav>
        <div id="editor"></div>
      </div>
    </>
  );
};

export default Editor;
