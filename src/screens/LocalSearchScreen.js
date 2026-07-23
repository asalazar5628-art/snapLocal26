import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

// --- MOCK DATA ---
const TOPIC_CHATS = [
  { id: "1", topic: "#SMFoodies", members: "12.4k", color: "#FF5252", mutuals: 3 },
  { id: "2", topic: "#SMCollege", members: "8.2k", color: "#FF4081", mutuals: 12 },
  { id: "3", topic: "#SMThrift", members: "45.1k", color: "#7C4DFF", mutuals: 1 },
  { id: "4", topic: "#SMEvents", members: "3.5k", color: "#536DFE", mutuals: 5 },
  { id: "5", topic: "#sm-events", members: "89.3k", color: "#00BCD4", mutuals: 2 },
  { id: "6", topic: "#SM~Hikes", members: "21.0k", color: "#69F0AE", mutuals: 8 },
  { id: "7", topic: "#SMViews", members: "15.8k", color: "#FFAB40", mutuals: 4 },
];

// Snapchat brand palette
const SNAP_YELLOW = "#FFFC00";
const SNAP_BLACK = "#0D0D0D";

export default function LocalSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = TOPIC_CHATS.filter((chat) => { // render the array of items we want to display after they search something
    // If the search is empty, this naturally returns all items
    return chat.topic.toLowerCase().includes(searchQuery.toLowerCase());
  }); 

  const renderTopicChat = ({ item }) => (
    <TouchableOpacity style={styles.chatRow} activeOpacity={0.7}>
      {/* Squircle Avatar / Icon */}
      <View style={[styles.avatarPlaceholder, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>{item.topic.charAt(1)}</Text>
      </View>

      {/* Chat Info */}
      <View style={styles.chatInfo}>
        <Text style={styles.chatTopic}>{item.topic}</Text>
        <Text style={styles.chatMembers}>{item.members} joined</Text>
        {/* NEW: Stacked directly underneath the active members */}
        <Text style={styles.chatMembers}>{item.mutuals} mutuals</Text>
      </View>

      {/* Join Button */}
      <View style={styles.joinButton}>
        <Text style={styles.joinButtonIcon}>💬</Text>
        <Text style={styles.joinButtonText}>Join the Chat</Text>
      </View>
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
            // data={TOPIC_CHATS}
            data = {filteredChats}
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
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatInfo: {
    flex: 1,
    marginLeft: 14,
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
    backgroundColor: SNAP_YELLOW,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 6,
  },
  joinButtonIcon: {
    fontSize: 12,
  },
  joinButtonText: {
    fontSize: 11,
    fontWeight: "800",
    color: SNAP_BLACK,
  },
});