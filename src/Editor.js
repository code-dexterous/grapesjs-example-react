import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import { useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import grapesjsBlockBootstrap from "grapesjs-blocks-bootstrap4";

import "./styles/main.scss";
import { API_HOST } from "./api_utils";
import {
  deviceManager,
  layerManager,
  panels,
  selectorManager,
  styleManager,
  traitManager,
} from "./api_utils/geditor_utils";
import tailwindComponent from "./plugins/tailwind";
import swiperComponent from "./plugins/swiper";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const { pageId } = useParams();

  useEffect(() => {
    async function getAllPages() {
      try {
        const response = await axios.get(`${API_HOST}assets/`);
        setAssets(response.data);
      } catch (error) {
        console.log("error :>> ", error);
        setAssets(error.message);
      }
    }
    getAllPages();
  }, []);

  useEffect(() => {
    $(".panel__devices").html("");
    $(".panel__basic-actions").html("");
    $(".panel__editor").html("");
    $("#blocks").html("");
    $("#styles-container").html("");
    $("#layers-container").html("");
    $("#trait-container").html("");
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
      assetManager: { assets: assets, upload: false },
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
      canvas: {
        styles: [
          "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
          "https://unpkg.com/swiper/swiper-bundle.min.css",
          "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
        ],
        scripts: [
          "https://code.jquery.com/jquery-3.5.1.slim.min.js",
          "https://unpkg.com/swiper/swiper-bundle.min.js",
          "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
          "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js",
        ],
      },
      plugins: [
        tailwindComponent,
        gjsBlockBasic,
        swiperComponent,
        grapesjsBlockBootstrap,
      ],
      pluginsOpts: {
        tailwindComponent: {},
        gjsBlockBasic: {},
        swiperComponent: {},
        grapesjsBlockBootstrap: {},
      },
    });
    // Commands
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });

    // Save Button
    editor.Commands.add("saveDb", {
      run: (editor, sender) => {
        sender && sender.set("active");
        editor.store();
      },
    });

    //Clear Button
    editor.Commands.add("cmd-clear", {
      run: (editor) => {
        editor.DomComponents.clear();
        editor.CssComposer.clear();
      },
    });

    //Undo
    editor.Commands.add("undo", {
      run: (editor) => editor.UndoManager.undo(),
    });

    // Redo
    editor.Commands.add("redo", {
      run: (editor) => editor.UndoManager.redo(),
    });

    setTimeout(() => {
      let categories = editor.BlockManager.getCategories();
      categories.each((category) => category.set("open", false));
    }, 1000);

    setEditor(editor);
  }, [pageId]);
  return (
    <div className="App">
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
            <div className="panel__editor"></div>
            <div className="panel__basic-actions"></div>
          </div>
        </nav>
        <div id="editor"></div>
      </div>
    </div>
  );
};

export default Editor;
