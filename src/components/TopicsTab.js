import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../assets/themes/colors";
import TopicListItem from "./TopicListItem";


const SUBTABS = ["Trending", "Local"];
const TRENDING_TOPICS = [
  { id: "Love Island", name: "#LoveIsland", imageUrl: "https://loremflickr.com/140/140", mutuals: 10, recentlyActive: 2039 },
  { id: "Major League BaseBall", name: "#MLB", imageUrl: "https://loremflickr.com/140/140", mutuals: 5, recentlyActive: 844 },
  { id: "World Cup 2026", name: "#WorldCup26", imageUrl: "https://loremflickr.com/140/140", mutuals: 100, recentlyActive: 6187 },
];
const LOCAL_TOPICS = [
  { id: "SMFoodies", name: "#SMFoodies", imageUrl: "https://loremflickr.com/140/140", mutuals: 3, recentlyActive: "12.4k", groupchatScreen: "SMFoodies" },
  { id: "SMCollege", name: "#SMCollege", imageUrl: "https://loremflickr.com/140/140", mutuals: 12, recentlyActive: "8.2k" },
  { id: "SMThrift", name: "#SMThrift", imageUrl: "https://loremflickr.com/140/140", mutuals: 1, recentlyActive: "45.1k" },
  { id: "SMEvents", name: "#SMEvents", imageUrl: "https://loremflickr.com/140/140", mutuals: 5, recentlyActive: "3.5k" },
  { id: "sm-events", name: "#sm-events", imageUrl: "https://loremflickr.com/140/140", mutuals: 2, recentlyActive: "89.3k" },
  { id: "SMHikes", name: "#SM~Hikes", imageUrl: "https://loremflickr.com/140/140", mutuals: 8, recentlyActive: "21.0k" },
  { id: "SMViews", name: "#SMViews", imageUrl: "https://loremflickr.com/140/140", mutuals: 4, recentlyActive: "15.8k" },
];

export default function TopicsTab({ navigation }){
    //state variable for the rendered tab
    const [currTab, setCurrTab] = useState("Trending");

    return(
        <View>

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
        </View>
    )

}

const styles = StyleSheet.create({
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
});