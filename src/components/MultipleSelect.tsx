import React, { useState } from "react";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

type MultipleSelectPropType = {
  //filterTaskStatus: (statusArray: string[]) => void;
  setFilterValue: (statusArray: string[]) => void;
};

const options = [
  { value: "true", label: "done", color: "gray" },
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

const MultipleSelect = ({
  // filterTaskStatus,
  setFilterValue,
}: MultipleSelectPropType) => {
  const [open, setOpen] = useState(false);
  return (
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      style={{ width: "100%" }}
      options={options}
      onChange={(value) => {
        //filterTaskStatus(value);
        setFilterValue(value);
        setOpen(false);
      }}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
    />
  );
};

export default MultipleSelect;
