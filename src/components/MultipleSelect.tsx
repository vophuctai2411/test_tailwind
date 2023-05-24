import React from "react";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

type MultipleSelectPropType = {
  filterTaskStatus: (statusArray: string[]) => void;
};

const options = [
  { value: "true", label: "done", color: "green" },
  { value: "false", label: "in progress", color: "cyan" },
];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const selectedItem = options.find((i) => i.value == value);
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={selectedItem?.color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const MultipleSelect = ({ filterTaskStatus }: MultipleSelectPropType) => (
  <Select
    mode="multiple"
    showArrow
    tagRender={tagRender}
    style={{ width: "100%" }}
    options={options}
    onChange={(value) => filterTaskStatus(value)}
  />
);

export default MultipleSelect;
