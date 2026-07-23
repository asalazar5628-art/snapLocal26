import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { colors } from "../../assets/themes/colors";


const SUBTABS = ["Trending", "Local"];
const TRENDING_TOPICS = [
  { id: "Love Island", name: "#LoveIsland", imageUrl: "https://loremflickr.com/140/140", mutuals: 10, recentlyActive: 2039 },
  { id: "Major League BaseBall", name: "#MLB", imageUrl: "https://loremflickr.com/140/140", mutuals: 5, recentlyActive: 844 },
  { id: "World Cup 2026", name: "#WorldCup26", imageUrl: "https://loremflickr.com/140/140", mutuals: 100, recentlyActive: 6187 },
];
const LOCAL_TOPICS = [
  { id: "SMFoodies", name: "#SMFoodies", imageUrl: "https://loremflickr.com/140/140", mutuals: 38, recentlyActive: 234 },
  { id: "vtahikes", name: "#vtahikes", imageUrl: "https://loremflickr.com/140/140", mutuals: 12, recentlyActive: 109 },
];

export default function TopicsTab(){
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

            {currTab === "Trending" ? <View><Text>hell</Text></View> : LOCAL_TOPICS.map((topic) => (
                <TouchableOpacity key={topic.id} style={styles.topicRow}>
                    <Image source={{ uri: topic.imageUrl }} style={styles.topicImage} />
                    <View style={styles.topicInfo}>
                        <Text style={styles.topicName}>{topic.name}</Text>
                        <Text style={styles.topicMeta}>{topic.mutuals} mutuals</Text>
                        <Text style={styles.topicMeta}>{topic.recentlyActive} recently active</Text>
                    </View>
                </TouchableOpacity>
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
  topicRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
  },
  topicImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  topicInfo: {
    flex: 1,
    justifyContent: "center",
  },
  topicName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  topicMeta: {
    fontSize: 13,
    color: colors.tertiary,
  },
});