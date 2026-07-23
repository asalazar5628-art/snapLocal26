import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../assets/themes/colors";
import TopicListItem from "./TopicListItem";


const SUBTABS = ["Trending", "Local"];
const TRENDING_TOPICS = [
  { id: "Love Island", name: "#LoveIsland", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxssDLDxg8yus9AcjncgzaAIt0kIyox90VR86LUUXoOg&s=10", mutuals: 10, recentlyActive: 2039 },
  { id: "Major League BaseBall", name: "#MLB", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLCGljhCqYEwteTKOPUvpUGHWgqyAmUgpyNGbwgcxHAg&s=10", mutuals: 5, recentlyActive: 844 },
  { id: "World Cup 2026", name: "#WorldCup26", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUzgEU7RfWoeMtJWNB_B0jnfLTwEl3wdiT1Ig7SDYCg&s=10", mutuals: 100, recentlyActive: 6187 },
];
const LOCAL_TOPICS = [
  { id: "SMFoodies", name: "#SMFoodies", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3tZSfcbr01s0QwJeiCl1oukjMRCkBONm7FZ5c7-MqXg&s", mutuals: 3, recentlyActive: "12.4k", groupchatScreen: "SMFoodies" },
  { id: "SMCollege", name: "#SMCollege", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-GZDbngOspl87WUFbbe7JODak1wuSv-7hSwNv8EJUgg&s", mutuals: 12, recentlyActive: "8.2k" },
  { id: "SMThrift", name: "#SMThrift", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXlRfj0E7KJzvN4-KNV6pNNGNhiCvqZFtlJ4ji6sDbnw&s", mutuals: 1, recentlyActive: "45.1k" },
  { id: "SMEvents", name: "#SMEvents", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa-Qsh1WAATc2GR1kV6KXgKChXcfB0vVnWGa6zrjoiBQ&s=10", mutuals: 5, recentlyActive: "3.5k" },
  { id: "sm-events", name: "#sm-events", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-eNimjWONltkcgk_wtJ4Q-Q59tNSKcVc-1_ECUVsawQ&s=10", mutuals: 2, recentlyActive: "89.3k" },
  { id: "SMHikes", name: "#SM~Hikes", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4YncgVwA9N3i6Qwo_lHNwoBp7dfI6hzbJAMT783tgJg&s=10", mutuals: 8, recentlyActive: "21.0k" },
  { id: "SMViews", name: "#SMViews", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRQttmT0lgUvH_bsfcQc8akQVxrGwERR78luVLXB3e6w&s=10", mutuals: 4, recentlyActive: "15.8k" },
];

export default function TopicsTab({ navigation }){
    //state variable for the rendered tab
    const [currTab, setCurrTab] = useState("Trending");

    return(
        <View style={styles.wrapper}>

            <ScrollView
                horizontal 
                showsHorizontalScrollIndicator = {false} 
                style={styles.container}
                contentContainerStyle={styles.content}
            >
                {SUBTABS.map((subTab) =>(
                    <TouchableOpacity
                        key={subTab}
                        style={[styles.tab, currTab === subTab && styles.tabActive]}
                        onPress={() => setCurrTab(subTab)}
                    >
                        <Text style={[styles.tabText, currTab === subTab && styles.tabTextActive]}>
                            {subTab}
                        </Text>
                    </TouchableOpacity>
                ) )}
            </ScrollView>

            {currTab === "Trending"
                ? TRENDING_TOPICS.map((topic) => (
                    <TopicListItem key={topic.id} topic={topic} navigation={navigation} />
                ))
                : LOCAL_TOPICS.map((topic) => (
                    <TopicListItem key={topic.id} topic={topic} navigation={navigation} />
                ))}

            <TouchableOpacity
                style={styles.findTopicButton}
                onPress={() => navigation.navigate("LocalSearch")}
            >
                <Text style={styles.findTopicIcon}>🔍</Text>
                <Text style={styles.findTopicText}>Find a Topic</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  tabActive: {
    backgroundColor: colors.interactionGraySubtle,
  },
  tabText: {
    color: colors.tertiary,
    fontWeight: "500",
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "#EFEFEF",
    marginHorizontal: 4,
  },
  emojiButton: {
    paddingHorizontal: 4,
  },
  emojiText: {
    fontSize: 20,
  },
  findTopicButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(35, 35, 35, 0.9)",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 100,
  },
  findTopicIcon: {
    fontSize: 16,
  },
  findTopicText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});