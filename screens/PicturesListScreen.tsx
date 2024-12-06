import { fetchPictureFromDate, fetchPicturesList } from "@/actions/NasaActions";
import LayoutContainer from "@/components/LayoutContainer";
import { NasaPictureType } from "@/types/NasaPictureType";
import { substractDays } from "@/utils/DateUtils";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import NasaPicture from "@/components/NasaPicture";
import ImageViewer from "@/components/ImageViewer";
import DatePickerButton from "@/components/DatePickerButton";

export default function PicturesListScreen() {
  const today = new Date();
  const picturesNumber = 8;

  const [startDate, setStartDate] = useState<Date>(
    substractDays(today, picturesNumber - 1)
  );
  const [endDate, setEndDate] = useState<Date>(today);
  const [picturesList, setPicturesList] = useState<NasaPictureType[]>([]);
  const [showError, setShowError] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<
    NasaPictureType | undefined
  >(undefined);

  const handleFetchPictures = (newStartDate: Date, newEndDate: Date) => {
    fetchPicturesList(newStartDate, newEndDate).then((pictures) => {
      if (pictures && pictures.length > 0) {
        setPicturesList(
          picturesList.concat(
            pictures.filter((picture) => picture.media_type === "image")
          )
        );
      } else setShowError(true);
    });
  };

  const fetchNextPictures = useCallback(() => {
    const newEndDate = substractDays(startDate, 1);
    const newStartDate = substractDays(startDate, picturesNumber);

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    handleFetchPictures(newStartDate, newEndDate);
  }, [picturesList, startDate, endDate]);

  const onRefresh = () => {
    // Display refresh control
    setRefreshing(true);

    // Reset dates and list
    const resetStartDate = substractDays(today, picturesNumber - 1);
    const resetEndDate = today;
    setStartDate(resetStartDate);
    setEndDate(resetEndDate);
    setPicturesList([]);

    // Fetch starting list
    handleFetchPictures(resetStartDate, resetEndDate);

    // Hide refresh control after 2000ms
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    handleFetchPictures(startDate, endDate);
  }, []);

  const fetchSelectedPicture = (selectedDate: Date) => {
    fetchPictureFromDate(selectedDate).then((selectedPicture) => {
      if (!selectedPicture || selectedPicture.media_type !== "image") {
        Alert.alert(
          "Erreur",
          "Il n'y a pas d'image pour cette date. Veuillez sélectionner une autre date.",
          [{ text: "OK" }]
        );
        return;
      }
      setShowImageViewer(true);
      setSelectedPicture(selectedPicture);
    });
  };

  // Render functions

  const _renderPicturesList = () => (
    <View style={styles.listContainer}>
      <DatePickerButton onSelect={fetchSelectedPicture} />
      <FlatList
        data={picturesList}
        renderItem={({ item }: { item: NasaPictureType }) => (
          <NasaPicture nasaPicture={item} />
        )}
        onEndReached={fetchNextPictures}
        onEndReachedThreshold={1}
        keyExtractor={(item) => item.date}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );

  const _renderError = () => (
    <ScrollView
      style={styles.errorContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.error}>
        Une erreur s'est produite, veuillez actualiser.
      </Text>
    </ScrollView>
  );

  return (
    <LayoutContainer>
      {!showError ? (
        picturesList && picturesList.length > 0 ? (
          <>
            {_renderPicturesList()}
            {selectedPicture && showImageViewer && (
              <ImageViewer
                image={selectedPicture}
                showImageViewer={showImageViewer}
                setShowImageViewer={setShowImageViewer}
              />
            )}
          </>
        ) : (
          !refreshing && <ActivityIndicator size="large" color="#3131ff" />
        )
      ) : (
        _renderError()
      )}
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    padding: 25,
    paddingBottom: 0,
  },
  errorContainer: {
    flex: 1,
    textAlign: "center",
    marginTop: 100,
  },
  error: {
    fontSize: 30,
    fontFamily: "Cochin",
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
});
