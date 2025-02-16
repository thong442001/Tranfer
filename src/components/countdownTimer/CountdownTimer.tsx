import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { useCountdownTimer } from './useCountdownTimer';

const CountdownTimer = ({ initialSeconds = 15 }) => {
    const {
        seconds,
        setSeconds,
    } = useCountdownTimer({ initialSeconds });


    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>
                {String(Math.floor(seconds / 60)).padStart(2, "0")}:
                {String(seconds % 60).padStart(2, "0")}
            </Text>
        </View>
    );
};

export default CountdownTimer;
