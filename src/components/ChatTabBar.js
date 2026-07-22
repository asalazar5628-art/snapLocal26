import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../assets/themes/colors";


const TABS = ["My AI", "Topics", "Calls"];


export default function ChatTabBar({activeTab, onTabChange}){
    return(
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator = {false} 
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {TABS.map((tab) =>(
                <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => onTabChange(tab)}>
                    <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}> 
                        {tab} 
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
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