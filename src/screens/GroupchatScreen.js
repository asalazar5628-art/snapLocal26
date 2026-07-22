import React, { useState, useRef } from "react";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import AnonModal from "../components/AnonModal";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function GroupchatScreen({ route }) {
  const { chatbotName } = route.params;
  const { user } = useAuthentication();
  const [showModal, setShowModal] = useState(true);
    

  const [message, setMessage] = useState("");

  const defaultUsername = 
  user?.user_metadata?.username || 
  user?.user_metadata?.full_name || 
  user?.email?.split('@')[0] || 
  "ME";
    const [responseIndex,setResponseIndex] = useState(0);
  const [premadeResponses,setpremadeResponses] = useState(
    ["I recommend Provecho CaliMex! It's got authentic flavors and it's not that expensive!","YEEESSSS","dude do not go there the food took forever to come out",
        "There's a little cafe on the way that is usually really quiet","My wife left me and took the kids"

  ]);

  const [responses, setResponses] = useState([
    {
      id: "1",
      sender: "bot1",
      name: "Bob",
      text: "",
      color: "#00A7B5",
    },
    {
      id: "2",
      sender: "bot2",
      name: "Sarah",
      text: "",
      color: "#CA48D1",
    },
    {
        id: "3",
        sender: "bot3",
        name: "David",
        text: "",
        color: "#2AF706"
    },
    {
        id: "4",
        sender: "bot4",
        name: "Alex",
        text: "",
        color: "#AF8B7D"
    },
    {
        id: "5",
        sender: "bot5",
        name: "Viola",
        text: "Lets go there sometime!",
        color: "#ffcd61"
    }
  ]);
    
  const [activeUsername, setActiveUsername] = useState(defaultUsername);

  
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot1",
      name: "Bob",
      text: "yo have you tried Big Sur Grill?",
      color: "#00A7B5",
    },
    {
      id: "2",
      sender: "bot2",
      name: "Sarah",
      text: "yeah that place is soooo affortable",
      color: "#CA48D1",
    },
    {
        id: "3",
        sender: "bot3",
        name: "David",
        text: "That place has the best staff!",
        color: "#2AF706"
    },
    {
        id: "4",
        sender: "bot4",
        name: "Alex",
        text: " I prefer The Curious Palate they have some good burgers!",
        color: "#AF8B7D"
    },
    {
        id: "5",
        sender: "bot5",
        name: "Viola",
        text: "Lets go there sometime!",
        color: "#ffcd61"
    }
  ]);

  const listRef = useRef();

  function handleModalChoice(selectedName) {
    setActiveUsername(selectedName);
    setShowModal(false);

  }

  function sendMessage() {
    if (!message.trim()) return;

    const userMsg = {
    id: Date.now().toString(),
    sender: "me",
    name: activeUsername,
    text: message,
    color: "#FF2D55",
  }; // the format the user message is in

    setMessages((prev) => [...prev, userMsg]); // updates the user message
        setMessage("");
        
    if(responseIndex < premadeResponses.length) // this function is meant to give a reponse based on if I have any premade responses left
    {
        const currentBot = responses[responseIndex % responses.length]; // we choose a bot from a premade list
        const botText = premadeResponses[responseIndex]; // we choose the text from a premade response array
        setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: currentBot.sender,
        name: currentBot.name,
        text: botText,
        color: currentBot.color,
      };

      setMessages((prev) => [...prev, botMsg])
      setResponseIndex((prevIndex)=> prevIndex +1);
      },1000) // this function will make a variable botMsg that will set its id, sender, name, txtmsg, and color based on the attrbutes of the bot list
                //then set that message, add one to the index to choose the next response msg added timeout to feel more "real"
    }
  }
  
  function renderMessage({ item }) {
    return (
      <View style={styles.messageWrapper}>
        <Text
          style={[
            styles.sender,
            {
              color: item.color,
            },
          ]}
        >
          {item.name}
        </Text>

        <View
          style={[
            styles.messageRow,
            {
              borderLeftColor: item.color,
            },
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* POPUP MODAL */}
      <AnonModal
        visible={showModal}
        currentUsername={defaultUsername}
        onSelectChoice={handleModalChoice}
      />
      {/* HEADER */}

      {/* <View style={styles.header}>
        <Ionicons name="chevron-back" size={32} />

        <View style={styles.avatar}>
          <Text>🙂</Text>
        </View>

        <Text style={styles.username}>{chatbotName}</Text>

        <View style={styles.headerIcons}>
          <Ionicons name="call" size={23} />

          <Ionicons name="videocam" size={25} />
        </View>
      </View> */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messages}
        />

        {/* INPUT AREA */}

        {/* INPUT AREA */}

        <View style={styles.inputBar}>
          {/* Camera */}
          <TouchableOpacity>
            <Ionicons name="camera" size={27} color="#000" />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Chat"
            style={styles.input}
            onSubmitEditing={sendMessage}
          />

          {/* Dynamic Button */}
          {message.length > 0 ? (
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name="arrow-up" size={22} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Ionicons name="mic" size={24} />
            </TouchableOpacity>
          )}

          {/* Emoji */}
          <TouchableOpacity>
            <Text style={styles.emoji}>🙂</Text>
          </TouchableOpacity>

          {/* Plus */}
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={28} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  avatar: {
    height: 38,
    width: 38,
    borderRadius: 19,
    backgroundColor: "#FFFC00",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  username: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
    flex: 1,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 18,
  },

  messages: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  messageWrapper: {
    marginVertical: 7,
  },

  sender: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 3,
  },

  messageRow: {
    borderLeftWidth: 3,
    paddingLeft: 8,
  },

  messageText: {
    fontSize: 18,
    color: "#222",
  },

  inputBar: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F1F1F5",
    borderRadius: 20,
    paddingHorizontal: 18,
    fontSize: 17,
  },

  emoji: {
    fontSize: 25,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#0A84FF",
    justifyContent: "center",
    alignItems: "center",
  },
});

