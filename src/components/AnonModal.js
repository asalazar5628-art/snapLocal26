import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AnonModal({ visible, currentUsername, onSelectChoice }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onSelectChoice("anonymous")} // Default fallback on hardware back button
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Join Group Chat</Text>
          <Text style={styles.subtitle}>How would you like to appear to others?</Text>

          {/* Option 1: Join with actual username */}
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => onSelectChoice(currentUsername)}
          >
            <Text style={styles.primaryButtonText}>
              Join as {currentUsername}
            </Text>
          </TouchableOpacity>

          {/* Option 2: Join Anonymously */}
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => onSelectChoice("Anonymous")}
          >
            <Text style={styles.secondaryButtonText}>Join Anonymously</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Dark background overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  primaryButton: {
    backgroundColor: "#FFFC00", 
  },
  primaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#F1F1F5",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});