import { PhotoIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { Sliders, SlidersHorizontal } from "lucide-react";
import { SetStateAction } from "react";
import { Edit, Grid, Image, Layers, Video } from "react-feather";

export const ToolbarOptions = (
  setElements: { (value: any): void; (arg0: any[]): any },
  elements: any,
  clickPosition: { x: any; y?: number },
  setClickPosition: { (value: SetStateAction<{ x: number; y: number }>): void; (arg0: { x: number; y: number }): any }
) => {
  return [
    // this is pop up if you wanted to create a new element
    {
      label: "Text",
      icon: <Edit className="w-[14px]" />,
      onClick: () => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "text",
            data: {},
            size: { width: "40%", height: "40%" },
            position: {
              x: clickPosition.x + "px",
              y: "50%",
            },
          },
        ]),
          setClickPosition({ x: 0, y: 0 });
      },
    },
    {
      label: "Background",
      icon: <Grid className="w-[14px]" />,
      onClick: () => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "background",
            data: {
              color: "black",
              borderRadius: "0",
              gradientDeg: "0",
              gradientLeft: "black",
              gradientRight: "white",
              isGradient: false,
            },
            size: {
              width: "40%",
              height: "40%",
            },
            position: {
              x: clickPosition.x + "px",
              y: "50%",
            },
          },
        ]),
          setClickPosition({ x: 0, y: 0 });
      },
    },
    {
      label: "Image",
      icon: <Image className="w-[14px]" />,
      onClick: () => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "image",
            data: {
              borderRadius: "0",
              isUrl: false,
              altText: "",
              url: "",
            },
            size: {
              width: "40%",
              height: "40%",
            },
            position: {
              x: clickPosition.x + "px",
              y: "50%",
            },
          },
        ]),
          setClickPosition({ x: 0, y: 0 });
      },
    },
    {
      label: "Video",
      icon: <Video className="w-[14px]" />,
      onClick: () => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "video",
            data: {
              borderRadius: "0",
              isUrl: false,
              altText: "",
              url: "",
            },
            size: {
              width: "40%",
              height: "40%",
            },
            position: {
              x: clickPosition.x + "px",
              y: "50%",
            },
          },
        ]),
          setClickPosition({ x: 0, y: 0 });
      },
    },
    {
      label: "Emded",
      icon: <Layers className="w-[14px]" />,
      onClick: () => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "embed",
            data: {},
            position: {
              x: clickPosition.x + "px",
              y: "50%",
            },
            size: { width: "40%", height: "40%" },
          },
        ]),
          setClickPosition({ x: 0, y: 0 });
      },
    },
    {
      label: "Button", //@ts-ignore
      icon: <ChatBubbleBottomCenterIcon className="w-[14px]" />,
      onClick: () => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "button",
            data: {
              borderRadius: "0",
              color: "white",
            },
            size: {
              width: "40%",
              height: "40%",
            },
            position: {
              x: clickPosition.x + "px",
              y: "50%",
            },
          },
        ]),
          setClickPosition({ x: 0, y: 0 });
      },
    },
    {
      label: "Slider", //@ts-ignore
      icon: <PhotoIcon className="w-[14px]" />,
      onClick: () => {
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "slider",
            data: {
              borderRadius: "0",
              options: [
                { type: "image", url: "https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
              ],
            },
            size: {
              width: "40%",
              height: "40%",
            },
            position: {
              x: clickPosition.x + "px",
              y: "50%",
            },
          },
        ]),
          setClickPosition({ x: 0, y: 0 });
      },
    },

    {
      label: "Form",
      icon: <Edit className="w-[14px]" />,
      onClick: () =>
        setElements([
          ...elements,
          {
            id: Date.now(),
            type: "form",
            width: "100%",
            fields: [
              {
                id: "input" + Math.random(),
                type: "input",
                placeholder: "Input",
                name: "name2",
                width: "45%",
              },
              {
                id: "input" + Date.now(),
                type: "input",
                placeholder: "Input2",
                name: "name",
                width: "45%",
              },
            ],
          },
        ]),
    },

    // { label: 'Delete', type: 'delete', onClick: () => {} },
  ];
};
