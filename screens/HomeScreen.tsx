import React, { useEffect, useState } from "react";
import LayoutContainer from "@/components/LayoutContainer";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { fetchDailyPicture } from "@/actions/NasaActions";
import { NasaPictureType } from "@/types/NasaPictureType";
import NasaPicture from "@/components/NasaPicture";

export default function HomeScreen() {
  const [dailyPicture, setDailyPicture] = useState<NasaPictureType>();
  const [showError, setShowError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const handleFetchDailyPicture = () => {
    fetchDailyPicture().then((picture) =>
      picture ? setDailyPicture(picture) : setShowError(true)
    );
  };

  useEffect(() => {
    handleFetchDailyPicture();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleFetchDailyPicture();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderFormatError = () => (
    <Text style={styles.error}>
      L'archive du jour n'est pas une image, revenez demain !
    </Text>
  );

  const renderError = () => (
    <Text style={styles.error}>
      Une erreur est survenue, veuillez réessayer.
    </Text>
  );

  const renderPictureDetails = (dailyPicture: NasaPictureType) => (
    <>
      <View style={styles.textContainer}>
        <Text adjustsFontSizeToFit style={styles.title}>
          {dailyPicture.title}
        </Text>
        <Text adjustsFontSizeToFit={true} style={styles.explanation}>
          {dailyPicture.explanation}
        </Text>
      </View>
      <NasaPicture nasaPicture={dailyPicture} />
    </>
  );

  return (
    <LayoutContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!showError && dailyPicture ? (
          <View style={styles.container}>
            {dailyPicture.media_type === "image"
              ? renderPictureDetails(dailyPicture)
              : renderFormatError()}
          </View>
        ) : (
          <ActivityIndicator size="large" color="#3131ff" />
        )}

        {showError && renderError()}
      </ScrollView>
    </LayoutContainer>
  );
}

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
      padding: 25,
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    textContainer: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 20 / fontScale,
      fontFamily: "Cochin",
      color: "#FFFFFF",
      fontWeight: "bold",
      textAlign: "center",
    },
    explanation: {
      fontSize: 15 / fontScale,
      fontFamily: "Cochin",
      color: "#FFFFFF",
      textAlign: "center",
    },
    error: {
      fontSize: 20 / fontScale,
      fontFamily: "Cochin",
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "center",
    },
    dailyImage: {
      flex: 1,
    },
  });
