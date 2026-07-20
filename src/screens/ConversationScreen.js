import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text, View } from "react-native";
import BasicChatbot from "../chatbots/BasicChatbot";

// prettier-ignore
// export const CHATBOTS = {
//   "BasicChatbot": {
//     id: "BasicChatbot",
//     name: "React Native Chatbot",
//     imageUrl: "https://loremflickr.com/140/140",
//     component: BasicChatbot,
//   },

// };

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;



  return (
    <View className=" chatWrappe">
       <Text>Hi from convo screen</Text>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 4,
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif-medium",
    }),
    fontWeight: Platform.select({
      ios: "600",
      android: "700",
    }),
  },
  username: {
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: "100%",
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    backgroundColor: "#EDEEEF",
  },
  senderText: {
    color: "#f54242",
  },
  otherText: {
    color: "#3391f5",
  },
});
