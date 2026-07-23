import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// --- MOCK DATA ---
const LOCAL_TOPICS = [
  { id: "SMFoodies", name: "#SMFoodies", imageUrl: "https://loremflickr.com/140/140", mutuals: 3, recentlyActive: "12.4k", groupchatScreen: "SMFoodies" },
  { id: "SMCollege", name: "#SMCollege", imageUrl: "https://loremflickr.com/140/140", mutuals: 12, recentlyActive: "8.2k" },
  { id: "SMThrift", name: "#SMThrift", imageUrl: "https://loremflickr.com/140/140", mutuals: 1, recentlyActive: "45.1k" },
  { id: "SMEvents", name: "#SMEvents", imageUrl: "https://loremflickr.com/140/140", mutuals: 5, recentlyActive: "3.5k" },
  { id: "sm-events", name: "#sm-events", imageUrl: "https://loremflickr.com/140/140", mutuals: 2, recentlyActive: "89.3k" },
  { id: "SMHikes", name: "#SM~Hikes", imageUrl: "https://loremflickr.com/140/140", mutuals: 8, recentlyActive: "21.0k" },
  { id: "SMViews", name: "#SMViews", imageUrl: "https://loremflickr.com/140/140", mutuals: 4, recentlyActive: "15.8k" },
];

// Snapchat brand palette
const SNAP_YELLOW = "#FFFC00";
const SNAP_BLACK = "#0D0D0D";

export default function LocalSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = LOCAL_TOPICS.filter((topic) => { // render the array of items we want to display after they search something
    // If the search is empty, this naturally returns all items
    return topic.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  function handleJoinPress(item) {
    if (!item.groupchatScreen) return;
    navigation.navigate(item.groupchatScreen, { chatbotName: item.name });
  }

  const renderTopicChat = ({ item }) => (
    <TouchableOpacity style={styles.chatRow} activeOpacity={0.7}>
      {/* Squircle Avatar / Icon */}
      <Image source={{ uri: item.imageUrl }} style={styles.avatarPlaceholder} />

      {/* Chat Info */}
      <View style={styles.chatInfo}>
        <Text style={styles.chatTopic}>{item.name}</Text>
        <Text style={styles.chatMembers}>{item.mutuals} mutuals</Text>
        {/* NEW: Stacked directly underneath the mutuals */}
        <Text style={styles.chatMembers}>{item.recentlyActive} recently active</Text>
      </View>

      {/* Join Button */}
      <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinPress(item)}>
        <Ionicons name="chatbubble-outline" size={14} color="#000" />
        <Text style={styles.joinButtonText}>Join the Chat</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER & SEARCH BAR */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <View style={styles.searchBarContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a chat"
              placeholderTextColor="#8A8A8A"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        {/* TOPIC CHATS SECTION */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Topic Chats</Text>
          <View style={styles.fireBadge}>
            <Text style={styles.fireBadgeText}>📍 Local</Text>
          </View>
        </View>

        <View style={styles.listCard}>
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={renderTopicChat}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

// --- STYLING ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: SNAP_BLACK,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: SNAP_BLACK,
    height: "100%",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingLeft: 4,
    paddingRight: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: SNAP_BLACK,
    letterSpacing: -0.3,
  },
  fireBadge: {
    backgroundColor: SNAP_YELLOW,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  fireBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: SNAP_BLACK,
  },
  listCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
  },
  listContent: {
    paddingBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginLeft: 16,
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  avatarPlaceholder: {
    width: 46,
    height: 46,
    borderRadius: 12,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 14,
  },avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#EBECEE", // Light grey placeholder before image loads
  },
  chatTopic: {
    fontSize: 16,
    fontWeight: "700",
    color: SNAP_BLACK,
    marginBottom: 3, // Restored the bottom margin since topicRow was removed
  },
  chatMembers: {
    fontSize: 13,
    fontWeight: "500",
    color: "#8A8A8A",
    marginTop: 2, // Added a tiny bit of spacing between the two subtext lines
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFC00",
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  joinButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },
});