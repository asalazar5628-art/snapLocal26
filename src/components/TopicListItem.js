import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../assets/themes/colors";

export default function TopicListItem({ topic, navigation }) {
    function handleJoinPress() {
        if (!topic.groupchatScreen) return;
        navigation.navigate(topic.groupchatScreen, { chatbotName: topic.name });
    }

    return (
        <View style={styles.topicRow}>
            <Image source={{ uri: topic.imageUrl }} style={styles.topicImage} />
            <View style={styles.topicInfo}>
                <Text style={styles.topicName}>{topic.name}</Text>
                <Text style={styles.topicMeta}>{topic.mutuals} mutuals</Text>
                <Text style={styles.topicMeta}>{topic.recentlyActive} recently active</Text>
            </View>
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinPress}>
                <Ionicons name="chatbubble-outline" size={14} color="#000" />
                <Text style={styles.joinButtonText}>Join the Chat</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
