import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NasaPicture from "../NasaPicture";
import { mockNasaPicture } from "@/src/types/NasaPictureType";

jest.mock("react-native-image-viewing");

const setup = () => {
  return render(<NasaPicture nasaPicture={mockNasaPicture} />);
};

describe("Nasa Picture", () => {
  it("Should render nasa picture component", () => {
    const { getAllByTestId } = setup();

    expect(getAllByTestId("nasaPicture")).toHaveLength(1);
  });

  it("Should display ImageViewer on press", () => {
    const { getByTestId, getAllByTestId } = setup();

    fireEvent(getByTestId("nasaPicture"), "onPress");
    expect(getAllByTestId("imageViewer")).toHaveLength(1);
  });
});
