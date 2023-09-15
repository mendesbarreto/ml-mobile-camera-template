import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useSharedValue } from "react-native-worklets-core";

export function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;
  const tick = useSharedValue(0);

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    if (tick.value % 30 === 0) {
      console.log(
        `tick: ${tick} frame w:${frame.width} h:${frame.height} t:${frame.timestamp} `
      );
    }
    tick.value += 1;
  }, []);

  if (device == null) {
    console.log("Dang! No camera access or camera loading");
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <Camera
      device={device}
      isActive
      style={StyleSheet.absoluteFill}
      frameProcessor={frameProcessor}
    ></Camera>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
