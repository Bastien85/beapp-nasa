import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

type Props = {
  onSelect: (selectedDate: Date) => void;
};

export default function DatePickerButton(props: Props) {
  const { onSelect } = props;

  const today = new Date();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchDate, setSearchDate] = useState(today);

  const handleSelect = (selectedDate: Date) => {
    setShowDatePicker(false);
    setSearchDate(selectedDate);
    onSelect(selectedDate);
  };

  const _renderDatePicker = () => (
    <DateTimePicker
      testID="dateTimePicker"
      value={searchDate}
      mode={"date"}
      is24Hour={true}
      onChange={(event, selectedDate) =>
        selectedDate && handleSelect(selectedDate)
      }
    />
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.searchButon}
        testID="datePickerButton"
      >
        <MaterialCommunityIcons name="calendar-search" color="#fff" size={26} />
      </TouchableOpacity>
      {showDatePicker && _renderDatePicker()}
    </>
  );
}

const styles = StyleSheet.create({
  searchButon: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    right: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#f1c70b",
    borderRadius: 50,
  },
});
