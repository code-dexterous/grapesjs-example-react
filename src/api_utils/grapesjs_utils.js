export const styleManager = {
  appendTo: "#styles-container",
  sectors: [
    {
      name: "Dimension",
      open: false,
      buildProps: ["width", "min-height", "padding"],
      properties: [
        {
          type: "integer",
          name: "The width",
          property: "width",
          units: ["px", "%"],
          defaults: "auto",
          min: 0,
        },
      ],
    },
  ],
};

export const layerManager = {
  appendTo: "#layers-container",
};
export const traitManager = {
  appendTo: "#trait-container",
};
export const selectorManager = {
  appendTo: "#styles-container",
};
export const panels = {
  defaults: [
    {
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: '<i class="fa fa-clone"></i>',
          command: "sw-visibility", // Built-in command
        },
      ],
    },
    {
      id: "panel-devices",
      el: ".panel__devices",
      buttons: [
        {
          id: "device-desktop",
          label: '<i class="fa fa-television"></i>',
          command: "set-device-desktop",
          active: true,
          togglable: false,
        },
        {
          id: "device-mobile",
          label: '<i class="fa fa-mobile"></i>',
          command: "set-device-mobile",
          togglable: false,
        },
      ],
    },
  ],
};
export const deviceManager = {
  devices: [
    {
      name: "Desktop",
      width: "",
    },
    {
      name: "Mobile",
      width: "320px",
      widthMedia: "480px",
    },
  ],
};
