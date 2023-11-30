import React from "react";

import SelectComponent from "../Select/Select";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FieldsType } from "@/_types/FormTypes";

import dynamic from "next/dynamic";
import Spinner from "../Spinner/Spinner";
const DataTable = dynamic(() => import("react-data-table-component" as any), { ssr: false, loading: () => <Spinner /> });

type Props = {
  field: FieldsType;
  model: any;
  onChange: (e: any, field: any) => void;
  errors: any;
  fields: FieldsType[];
  setFocusedModels: (focusedModels: any) => void;
  setErrors: (errors: any) => void;
  showFloatingLabel?: boolean;
  submitAction?: () => void;
};

const Fields = ({ field, model, onChange, errors, fields, setFocusedModels, setErrors, showFloatingLabel, submitAction }: Props) => {
  const disabled: boolean = field.disabled ? field.disabled({ model, field, fields }) : false;

  const onBlur = () => {
    setFocusedModels((focusedModels: any) => ({
      ...focusedModels,
      [field.name]: false,
    }));
    field?.onBlur && field.onBlur();
  };

  const onFocus = () => {
    setFocusedModels((focusedModels: any) => ({
      ...focusedModels,
      [field.name]: true,
    }));
    field?.onFocus && field.onFocus();
  };

  switch (field.type) {
    case "input":
      return (
        <>
          {field.subType === "color" && model[field?.name] && (
            <XMarkIcon
              className=" h-4 w-4 absolute right-0 bg-white/90 rounded top-0 text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-100
            "
              onClick={() => onChange("", field)}
            />
          )}
          <input
            key={field.name}
            type={field.subType || "text"}
            name={field.name}
            placeholder={!showFloatingLabel ? field.placeholder + (field.required ? " *" : "") : ""}
            list={field.options ? field.name : undefined}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={field.maxLength}
            min={field.min}
            max={field.max}
            defaultValue={field.defaultValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitAction && submitAction();
            }}
            minLength={field.minLength}
            value={model[field?.name]}
            // defaultValue={field?.defaultValue || ""}
            disabled={disabled}
            className={` ${field.subType == "color" ? "" : "base-input min-w-[140px]"} ${errors[field.name] && "error-input "} ${field.className || ""}`}
            onInput={(e) => onChange(e, field)}
            step={field.step}
          />
          {field.options && (
            <datalist id={field.name}>
              {field.options.map((option) => {
                return <option key={option.value} value={option.value} />;
              })}
            </datalist>
          )}
        </>
      );
    case "textarea":
      return (
        <textarea
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          value={model[field.name] || ""}
          onChange={(e) => onChange(e, field)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitAction && submitAction();
          }}
          onFocus={onFocus}
          onBlur={onBlur} // @ts-expect-error
          disabled={disabled}
          className={`base-input ${errors[field.name] && "error-input"} ${field.className || ""}`}
          placeholder={!showFloatingLabel ? field.placeholder + (field.required ? " *" : "") : ""}
          {...field}
        />
      );
    case "select":
      return (
        <SelectComponent
          multiple={field.multiple}
          value={model[field.name]}
          onChange={(e) => onChange(e, field)}
          placeholder={!showFloatingLabel ? field.placeholder + (field.required ? " *" : "") : ""}
          {...field}
          name={field.name}
        />
      );

    case "nativeSelect":
      return (
        <select
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          value={!field.multiple ? model[field.name] : formatSelctMultipleValue(model[field.name])}
          onFocus={onFocus}
          onBlur={onBlur} // @ts-expect-error
          disabled={disabled}
          className={`base-input  min-w-[140px] ${errors[field.name] && "error-input "} ${field.className || ""}`}
          onChange={(e) => onChange(e, field)}
          {...field}
        >
          {field.options.map((option) => {
            return (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            );
          })}
        </select>
      );

    case "checkbox":
      return (
        <div key={field.name} className={`checkbox-container ${field.className || ""}`}>
          <input
            type="checkbox"
            className="rounded-md border-gray-300 text-blue-600 shadow-sm hover:border-blue-400 focus:ring focus:ring-blue-200 "
            name={field.name}
            checked={model?.[field.name] || false}
            onChange={(e) => {
              console.log(e.target.checked);
              onChange(e.target.checked, field);
            }}
            disabled={disabled}
            {...field}
          />
          <label onClick={(e) => onChange(!model?.[field.name], field)} className="relative bottom-[2px] ml-2 cursor-pointer" htmlFor={field.name}>
            {field.title}
          </label>
        </div>
      );

    case "toggle":
      return (
        <div key={field.name} className={`flex flex-row ${field.className || ""}`}>
          {/* {<LinkIcon className="h-7 w-7 text-white rounded cursor-pointer bg-gray-700 p-1" aria-hidden="true" />} */}

          {field.iconOptions?.map((option, index) => {
            return (
              <div
                key={option.value}
                onClick={(e) => onChange(option.value, field)}
                className={` ${
                  model?.[field.name] === option?.value ? "bg-indigo-600" : "bg-gray-600"
                } h-7 w-7 text-white  cursor-pointer  p-1 border border-gray-300 rounded`}
                title={option.value}
              >
                {option.icon}
              </div>
            );
          })}
        </div>
      );
    case "table":
      return (
        <>
          <div className="flex flex-row justify-between items-center mb-1">
            <label className="text-sm text-gray-500">{field.title}</label>
            {field?.addRow && (
              <button
                onClick={() => {
                  const curModel = { ...model, [field.name]: [...(model[field.name] || []), {}] };
                  onChange(curModel[field.name], field);
                }}
                className="flex flex-row items-center px-2 py-1 rounded-md text-indigo-500  hover:bg-indigo-500 transition-all duration-200 hover:text-white hover:shadow-md"
              >
                <span className="mr-1">Add Row</span>
              </button>
            )}
          </div>
          <div className=" rounded-md shadow-sm p-1 bg-gray-50 max-h-[500px] overflow-y-auto">
            <DataTable
              key={field.name}
              columns={field.columns.map((column, index) => {
                return {
                  name: column.name,
                  width: column.width || "inherit",
                  selector: column.name,
                  sortable: column.sortable,
                  cell: (row, rowIndex) => {
                    return (
                      <div className="flex flex-row justify-between items-center">
                        {column.type === "input" && (
                          <input
                            name={column.name}
                            value={row[column.name] || ""}
                            type={column.subType || "text"}
                            onChange={(e) => {
                              const curModel = { ...model };
                              if (!curModel[field.name][rowIndex]) curModel[field.name][index] = {};
                              curModel[field.name][rowIndex][column.name] = e.target.value;
                              onChange(curModel[field.name], field);
                            }}
                            className={`base-input 
                             ${field.className || ""} base-input`}
                            placeholder={!showFloatingLabel ? field.placeholder + (field.required ? " *" : "") : ""}
                            {...column}
                          />
                        )}
                        {column.type === "select" && (
                          <select
                            name={column.name}
                            value={row[column.name] || ""}
                            onChange={(e) => {
                              const curModel = { ...model };
                              if (!curModel[field.name][rowIndex]) curModel[field.name][index] = {};
                              curModel[field.name][rowIndex][column.name] = e.target.value;
                              onChange(curModel[field.name], field);
                            }}
                            className={`base-input ${errors[field.name] && "error-input"} ${field.className || ""}`}
                            {...column}
                          >
                            {column.options.map((option) => {
                              return (
                                <option key={option.value} value={option.value} disabled={option.disabled}>
                                  {option.label}
                                </option>
                              );
                            })}
                          </select>
                        )}
                      </div>
                    );
                  },
                };
              })}
              data={model[field.name] || []}
              responsive
              highlightOnHover
              noDataComponent={<div className="text-center">No data found</div>}
            />
          </div>
        </>
      );

    case "custom":
      return field.component({
        model,
        field,
        fields,
        onChange,
        errors,
        setFocusedModels,
        setErrors,
      });
    default:
      return null;
  }
};

const formatSelctMultipleValue = (value: any) => {
  console.log(typeof value);
  if (typeof value === "object") return value.join(",");
  return value;
};

// const handleSelectMultipleChange = (e, valueArr) => {
//   const { value } = e.target;

//   if (!valueArr) return [value];
//   else if (!Array.isArray(valueArr)) valueArr = [valueArr];

//   if (valueArr.includes(value)) {
//     return valueArr.filter((v) => v !== value);
//   }

//   return [...valueArr, value];
// };

export default Fields;
