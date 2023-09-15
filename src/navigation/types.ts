import { NavigatorScreenParams } from "@react-navigation/native";

// this should be types from the page container inferred from the screen component
export type RootStackParamList = {
  Home: undefined;
  // farm list
  Camera: undefined;
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;
