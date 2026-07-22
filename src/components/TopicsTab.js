import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../assets/themes/colors";

export default function TopicsTab(){
    //state variable for the rendered tab
    const [currTab, setCurrTab] = useState("Trending");

    return(
        <View>
            <View>
                <Text>Hello ffrom topics tab</Text>
            </View>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator = {false} 
                style={styles.container}
                contentContainerStyle={styles.content}
            >

            </ScrollView>
        </View>
    )

}