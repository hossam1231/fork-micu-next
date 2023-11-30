import React from "react";

type Props = {
  element: any;
  options: any;
  close?: any;
  targetRef?: any;
  width?: string;
};

function ElementMenuWrapper({ element, options, close, targetRef, width }: Props) {
  const [renderedIndex, setRenderedIndex] = React.useState(0);

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          right: 200,
          top: 300,
          // top: targetRef ? targetRef.current?.offsetTop + "px" : "0px",
          zIndex: 9999,
        }}
      >
        <div
          style={{ bottom: "200px", width: width || "330px" }}
          className=" slideLeft relative  items-center overflow-hidden overflow-hidden rounded-md border border-gray-200 bg-white p-2 drop-shadow-lg "
        >
          <div className="flex flex-row items-center ">
            {options.map((option: any, i: number) => {
              return (
                <div
                  key={option.key}
                  className={`flex flex-row mx-1  ${
                    renderedIndex === i ? "text-indigo-500 font-semibold border-b-1 border-indigo-500 border-indigo-500 transition-all duration-200" : ""
                  }`}
                  onClick={() => {
                    setRenderedIndex(i);
                  }}
                >
                  <div className="flex flex-row items-center">
                    {option.icon}
                    <span className="ml-[10px]">{option.key}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <hr />

          <div className="flex-column mt-2 flex w-full min-w-[255px] p-2">{options[renderedIndex].component}</div>
        </div>
      </div>
      <div className="z-9998 fixed inset-0 bg-gray-100 opacity-10" onClick={() => close(null)} />
    </>
  );
}

export default ElementMenuWrapper;
