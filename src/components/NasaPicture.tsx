import { useState } from "react";
import { TouchableHighlight, Image, StyleSheet } from "react-native";
import { NasaPictureType } from "../types/NasaPictureType";
import ImageViewer from "./ImageViewer";

type Props = {
  nasaPicture: NasaPictureType;
};

export default function NasaPicture(props: Props) {
  const { nasaPicture } = props;
  const { url, hdurl } = nasaPicture;

  const [showImageViewer, setShowImageViewer] = useState(false);

  return (
    <>
      <TouchableHighlight
        testID="nasaPicture"
        onPress={() => {
          setShowImageViewer(true);
        }}
      >
        <Image
          source={{ uri: url || hdurl }}
          resizeMode="cover"
          style={styles.image}
        />
      </TouchableHighlight>
      {nasaPicture && showImageViewer && (
        <ImageViewer
          image={nasaPicture}
          showImageViewer={showImageViewer}
          setShowImageViewer={setShowImageViewer}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});
