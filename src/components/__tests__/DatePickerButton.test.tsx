import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DatePickerButton from "../DatePickerButton";

const mockProps = { onSelect: () => {} };

jest.mock("expo-font");

const setup = () => {
  return render(<DatePickerButton {...mockProps} />);
};

describe("Date Picker Button", () => {
  it("Should render button without date picker", () => {
    const { getAllByTestId, queryAllByTestId } = setup();

    expect(getAllByTestId("datePickerButton")).toHaveLength(1);
    expect(queryAllByTestId("dateTimePicker")).toHaveLength(0);
  });

  it("Should render date picker on press", () => {
    const { getByTestId, getAllByTestId } = setup();

    fireEvent(getByTestId("datePickerButton"), "onPress");
    expect(getAllByTestId("dateTimePicker")).toHaveLength(1);
  });
});
