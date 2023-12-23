import React from "react";
import Button from "./Button";
import moment from "moment";
import {
  formatTime,
  startTimeSelectOptions,
  endTimeSelectOptions,
} from "../helpers/bookingForm";
import { Radio, Space } from "antd";

function FilterElement({
  onSetCategoryParam,
  onToggleFeature,
  onToggleCapacity,
  onSetAvailabilityParam,
  categoryParam,
  filterParams,
  capacityParams,
  availabilityParam,
  date,
}) {
  const renderGroupItems = () =>
    [
      "Cleanroom",
      "Mask Making",
      "Thin Film Deposition",
      "Oven",
      "Etching",
      "Mechanical Inspection",
      "Electrical Inspection",
      "Actuator Lab",
      "all",
    ].map((category) => {
      return (
        <Radio key={category} value={category}>
          {category == "all" ? "All" : category}
        </Radio>
      );
    });
  return (
    <div className="sidebar__box--filter filter">
      <h3 className="header__heading header__heading--sidebar">Filter</h3>
      <div className="form form--filter">
        <h4 className="form__heading form__heading--filter">Category</h4>
        <Radio.Group
          onChange={(event) => onSetCategoryParam(event.target.value)}
          value={categoryParam}
        >
          <Space direction="vertical">{renderGroupItems()}</Space>
        </Radio.Group>
      </div>
    </div>
  );
}

export default FilterElement;
