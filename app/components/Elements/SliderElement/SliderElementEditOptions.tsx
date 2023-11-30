import React from "react";
import ElementMenuWrapper from "../../_Sites/SiteEditor/area/ElementMenuWrapper";
import FormGroup from "../Form/FormGroup";
import { Trash } from "react-feather";
import { Trash2Icon } from "lucide-react";

type Props = {
  element: any;
  onChange: (v: any) => void;
  setShowEditMenu: (v: boolean) => void;
  targetRef: React.MutableRefObject<HTMLDivElement> | null;
  setTransform: (v: any) => void;
};

function SliderElementEditOptions({ element, onChange, setShowEditMenu, targetRef, setTransform }: Props) {
  const [errors, setErrors] = React.useState({});
  return (
    <ElementMenuWrapper
      close={setShowEditMenu}
      element={element}
      targetRef={targetRef}
      width="600px"
      options={[
        {
          key: "Content",
          component: (
            <FormGroup
              className="w-full"
              altSetModel={true}
              errors={errors}
              setErrors={setErrors}
              fields={[
                {
                  name: "options",
                  title: "Slider options",
                  addRow: true,
                  type: "table", //@ts-ignore
                  columns: [
                    { type: "input", name: "url", placeholder: "Image URL", subType: "url", width: "400px", className: "w-[370px] base-input" },
                    {
                      type: "select",
                      name: "type",
                      placeholder: "Type",
                      options: [
                        { label: "Image", value: "image" },
                        { label: "Video", value: "video" },
                      ],
                    },
                  ],
                },

                {
                  type: "custom",
                  name: "zindex",
                  component: () => (
                    <>
                      <p>Elevation/Z-index</p>
                      <input
                        className="base-input"
                        type="number"
                        max="10"
                        min="0"
                        value={element.position?.z || 0}
                        onChange={(e) => {
                          setTransform({
                            ...element.position,
                            z: parseInt(e.target.value),
                          });
                        }}
                      />
                    </>
                  ),
                },
              ]}
              model={element.data}
              setModel={(model) => {
                onChange(model);
              }}
            />
          ),
        },
        {
          key: "Style",
          component: (
            <FormGroup
              className="w-full"
              altSetModel={true}
              errors={errors}
              setErrors={setErrors}
              fields={[
                {
                  name: "borderRadius",
                  placeholder: "Border radius",
                  type: "input",
                  subType: "number",
                  max: 100,
                  min: 0,
                },
                {
                  name: "opacity",
                  placeholder: "Opacity",
                  type: "input",
                  subType: "number",
                  max: 1,
                  min: 0,
                  step: 0.1,
                },
                {
                  name: "shadowColor",
                  label: "Shadow color",
                  type: "input",
                  subType: "color",
                  className: "w-full",
                },
                {
                  name: "shadowWidth",
                  placeholder: "Shadow width",
                  type: "input",
                  subType: "number",
                  max: 100,
                  hidden: ({ model }) => !model?.shadowColor,
                  min: 0,
                },
                {
                  name: "filter",
                  placeholder: "Filter",
                  type: "nativeSelect",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Blur", value: "blur" },
                    { label: "Brightness", value: "brightness" },
                    { label: "Contrast", value: "contrast" },
                    { label: "Grayscale", value: "grayscale" },
                    { label: "Hue rotate", value: "hue-rotate" },
                    { label: "Invert", value: "invert" },
                    { label: "Saturate", value: "saturate" },
                    { label: "Sepia", value: "sepia" },
                  ],
                },
                {
                  name: "filterValue",
                  placeholder: "Filter percentage",
                  type: "input",
                  subType: "number",
                  max: 1000,
                  min: 0,
                  hidden: ({ model }) => !model.filter || model.filter === "",
                },
              ]}
              model={element.data}
              setModel={(model) => {
                onChange(model);
              }}
            />
          ),
        },
      ]}
    ></ElementMenuWrapper>
  );
}

export default SliderElementEditOptions;
