import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Button,
} from "react-native";
import { NavigationProps } from "../../navigation/types";
import { Camera } from "react-native-vision-camera";

export function HomeScreen({ navigation }: NavigationProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraOpened, setCameraOpened] = useState(false);
  const showCamera = isCameraOpened || !hasPermission;

  function requestCameraPermission() {
    Camera.requestCameraPermission()
      .then((value) => {
        if (value === "granted") {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      {!hasPermission && (
        <View style={styles.enableCameraButtonContainer}>
          <Button
            color={"white"}
            title="Enable Camera"
            onPress={() => requestCameraPermission()}
          />
        </View>
      )}
      {!showCamera && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => navigation.navigate("Camera")}
          >
            <Image
              style={styles.floatingButtonStyle}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3687/3687416.png",
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 60,
    height: 60,
  },
  touchableOpacity: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    backgroundColor: "white",
    right: 24,
    bottom: 30,
  },
  enableCameraButtonContainer: {
    backgroundColor: "#159BF9",
    margin: 64,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
