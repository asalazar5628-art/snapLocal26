import React, { useState, useEffect, useRef } from "react";
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

// Hooks & Components
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { supabase } from "../../utils/hooks/supabase";
import AnonModal from "../components/AnonModal";

export default function GroupchatScreen({ route }) {
  // Extract params or fall back to default room defaults
  const { groupId, chatbotName } = route.params || {};
  const targetGroupId = groupId || chatbotName || "SMFoodies";

  const { user } = useAuthentication();
  const [showModal, setShowModal] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Determine user's fallback username
  const defaultUsername =
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "ME";

  const [activeUsername, setActiveUsername] = useState(defaultUsername);
  const listRef = useRef(null);

  // ------------------------------------------------------------------
  // Realtime & Initial Data Fetch
  // ------------------------------------------------------------------
  useEffect(() => {
    // 1. Fetch initial message history from Supabase
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("group_messages")
        .select("*")
        .eq("group_id", targetGroupId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching initial messages:", error.message);
      } else if (data) {
        setMessages(data);
      }
    }

    fetchMessages();

    // 2. Subscribe to REALTIME insert changes for this specific group room
    const channel = supabase
      .channel(`group-chat:${targetGroupId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "group_messages",
          filter: `group_id=eq.${targetGroupId}`,
        }, // realtime any time database updated reading it and refresh
        (payload) => {
          // Append incoming live message to state
          setMessages((prevMessages) => {
            // Prevent duplicate rendering if already in state
            if (prevMessages.some((msg) => msg.id === payload.new.id)) {
              return prevMessages;
            }
            return [...prevMessages, payload.new];
          });
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [targetGroupId]);

  // ------------------------------------------------------------------
  // Message Handlers
  // ------------------------------------------------------------------
  function handleModalChoice(selectedName) {
    setActiveUsername(selectedName);
    setShowModal(false);
  }

  async function sendMessage() {
    if (!message.trim()) return;

    const textToSend = message.trim();
    setMessage(""); // Clear input bar immediately

    // Insert message into Supabase
    // (Supabase Realtime will automatically broadcast it back to setMessages)
    const { error } = await supabase.from("group_messages").insert([
      {
        group_id: targetGroupId,
        sender_id: user?.id,
        sender_name: activeUsername,
        text: textToSend,
        color: "#FF2D55",
      },
    ]);

    if (error) {
      console.error("Error sending message to Supabase:", error.message);
    }
  }

  // ------------------------------------------------------------------
  // UI Renderers
  // ------------------------------------------------------------------
  function renderMessage({ item }) {
    const isMe = item.sender_id === user?.id;

    return (
      <View style={styles.messageWrapper}>
        <Text style={[styles.sender, { color: isMe ? "#FF2D55" : item.color || "#00A7B5" }]}>
          {item.sender_name || item.name}
        </Text>

        <View style={[styles.messageRow, { borderLeftColor: isMe ? "#FF2D55" : item.color || "#00A7B5" }]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Name Selection Popup Modal */}
      <AnonModal
        visible={showModal}
        currentUsername={defaultUsername}
        onSelectChoice={handleModalChoice}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Chat Messages List */}
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => listRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity>
            <Ionicons name="camera" size={27} color="#000" />
          </TouchableOpacity>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Chat"
            style={styles.input}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />

          {message.length > 0 ? (
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name="arrow-up" size={22} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Ionicons name="mic" size={24} color="#000" />
            </TouchableOpacity>
          )}

          <TouchableOpacity>
            <Text style={styles.emoji}>🙂</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ------------------------------------------------------------------
// Styles
// ------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messages: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 10,
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
    backgroundColor: "#fff",
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
