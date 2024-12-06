import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Sharing from "expo-sharing";
import { cacheDirectory, downloadAsync } from "expo-file-system";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NasaPictureType } from "../types/NasaPictureType";

type Props = {
  image: NasaPictureType;
  showImageViewer: boolean;
  setShowImageViewer: (show: boolean) => void;
};

export default function ImageViewer(props: Props) {
  const {
    image: { url, hdurl, title, explanation },
    showImageViewer,
    setShowImageViewer,
  } = props;

  const shareImage = async () => {
    try {
      const uri = await downloadAsync(url, cacheDirectory + "tmp.png");
      await Sharing.shareAsync(uri.uri, { dialogTitle: title });
    } catch (e) {
      console.log(e);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => shareImage()} style={styles.iconButton}>
        <MaterialCommunityIcons name="share-variant" color="#fff" size={23} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowImageViewer(false)}
        style={styles.iconButton}
      >
        <MaterialCommunityIcons name="close" color="#fff" size={26} />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text adjustsFontSizeToFit style={styles.explanation}>
        {explanation}
      </Text>
    </View>
  );

  return (
    <View
      testID="imageViewer"
      style={{ flex: 1, height: "100%", width: "100%" }}
    >
      <ImageView
        images={[{ uri: hdurl || url }]}
        imageIndex={0}
        visible={showImageViewer}
        onRequestClose={() => setShowImageViewer(false)}
        animationType="slide"
        doubleTapToZoomEnabled
        swipeToCloseEnabled
        FooterComponent={renderFooter}
        HeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    justifyContent: "space-between",
    backgroundColor: "#1d1c1c64",
    flexDirection: "row",
  },
  iconButton: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#1d1c1c64",
  },
  title: {
    fontSize: 15,
    fontFamily: "Cochin",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  explanation: {
    fontSize: 10,
    fontFamily: "Cochin",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
