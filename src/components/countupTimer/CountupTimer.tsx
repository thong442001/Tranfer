import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { useCountupTimer } from './useCountupTimer';

const CountupTimer = () => {
    const {
        seconds,
        setSeconds,
    } = useCountupTimer();

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>
                {String(Math.floor(seconds / 60)).padStart(2, "0")}:
                {String(seconds % 60).padStart(2, "0")}
            </Text>
        </View>
    );
};

export default CountupTimer;
