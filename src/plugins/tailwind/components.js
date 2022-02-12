import {
  backgroundAttachment,
  backgroundClip,
  bgColor,
  bgRepeat,
  bgSize,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  fontVariant,
  fontWeight,
  letterSpacing,
  lineHeight,
  tableBorder,
  tableLayout,
  textAlignment,
  textColor,
  textDecoration,
  textFontSize,
  textOpacity,
  textOverflow,
  textTransformation,
  verticalAlign,
  wordBreak,
} from "./tailwind_classes";

/* eslint-disable import/no-anonymous-default-export */
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;

  dc.getTypes().forEach((type) => {
    if (type.id === "text" || type.id === "link") {
      dc.addType(type.id, {
        model: {
          defaults: {
            traits: [
              ...type.model.prototype.defaults.traits,
              {
                type: "class_select",
                options: textColor.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Text Color",
              },
              {
                type: "class_select",
                options: textAlignment.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Text Alignment",
              },
              {
                type: "class_select",
                options: textOpacity.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Text Opacity",
              },
              {
                type: "class_select",
                options: textDecoration.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Text Decoration",
              },
              {
                type: "class_select",
                options: textTransformation.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Text Transformation",
              },
              {
                type: "class_select",
                options: textOverflow.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Text Overflow",
              },
              {
                type: "class_select",
                options: textFontSize.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Font Size",
              },
              {
                type: "class_select",
                options: fontWeight.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Font Weight",
              },
              {
                type: "class_select",
                options: fontVariant.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Font Variant",
              },
              {
                type: "class_select",
                options: letterSpacing.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Letter Spacing",
              },
              {
                type: "class_select",
                options: lineHeight.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Line Height",
              },
              {
                type: "class_select",
                options: verticalAlign.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Vertical Align",
              },
              {
                type: "class_select",
                options: wordBreak.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Word Break",
              },
            ],
          },
        },
      });
    }

    if (type.id === "table") {
      dc.addType(type.id, {
        model: {
          defaults: {
            traits: [
              ...type.model.prototype.defaults.traits,
              {
                type: "class_select",
                options: tableBorder.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Table Border",
              },
              {
                type: "class_select",
                options: tableLayout.map((color) => ({
                  name: color,
                  value: color,
                })),
                label: "Table Layout",
              },
            ],
          },
        },
      });
    }

    const toolbar = [
      {
        attributes: {
          class: "fa fa-arrow-up",
        },
        command: (e) => e.runCommand("core:component-exit", { force: 1 }),
      },
      {
        attributes: {
          class: "fa fa-arrows gjs-no-touch-actions",
          draggable: true,
        },
        command: "tld-move",
      },

      {
        attributes: {
          class: "fa fa-clone",
        },
        command: "tlb-clone",
      },
      {
        attributes: {
          class: "fa fa-trash-o",
        },
        command: "tlb-delete",
      },
      {
        attributes: {
          class: "fa fa-gear",
        },
        command: (e) => {
          console.log("Another way to add toolbar");
          alert("Another way to add toolbar");
        },
      },
    ];

    if (type.id === "svg" || type.id === "svg-in") {
      dc.addType(type.id, {
        model: {
          defaults: {
            traits: [
              ...dc.getType(type.id).model.prototype.defaults.traits,
              {
                type: "class_select",
                options: [{ name: "fill-current", value: "fill-current" }],
                label: "Fill",
              },
              {
                type: "class_select",
                options: [{ name: "stroke-current", value: "stroke-current" }],
                label: "Stroke",
              },
              {
                type: "class_select",
                options: [
                  { name: "stroke-0", value: "stroke-0" },
                  { name: "stroke-1", value: "stroke-1" },
                  { name: "stroke-2", value: "stroke-2" },
                ],
                label: "Stroke Width",
              },
            ],
          },
        },
      });
    }

    let defaultTraits = [];
    if (dc.getType(type.id).model.prototype.defaults.traits) {
      defaultTraits = dc.getType(type.id).model.prototype.defaults.traits;
    }
    dc.addType(type.id, {
      model: {
        defaults: {
          toolbar,
          traits: [
            ...defaultTraits,
            {
              type: "class_select",
              options: backgroundAttachment.map((color) => ({
                name: color,
                value: color,
              })),
              label: "BG Attachment",
            },
            {
              type: "class_select",
              options: backgroundClip.map((color) => ({
                name: color,
                value: color,
              })),
              label: "BG Clip",
            },
            {
              type: "class_select",
              options: bgColor.map((color) => ({
                name: color,
                value: color,
              })),
              label: "BG Color",
            },
            {
              type: "class_select",
              options: bgRepeat.map((color) => ({
                name: color,
                value: color,
              })),
              label: "BG Repeat",
            },
            {
              type: "class_select",
              options: bgSize.map((color) => ({
                name: color,
                value: color,
              })),
              label: "BG Size",
            },

            {
              type: "class_select",
              options: borderRadius.map((color) => ({
                name: color,
                value: color,
              })),
              label: "Border Radius",
            },
            {
              type: "class_select",
              options: borderWidth.map((color) => ({
                name: color,
                value: color,
              })),
              label: "Border Width",
            },
            {
              type: "class_select",
              options: borderColor.map((color) => ({
                name: color,
                value: color,
              })),
              label: "Border Color",
            },
            {
              type: "class_select",
              options: borderStyle.map((color) => ({
                name: color,
                value: color,
              })),
              label: "Border Style",
            },
          ],
        },
      },
    });
  });
};
