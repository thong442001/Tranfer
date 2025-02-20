import React from 'react';
import { View, Text } from 'react-native';
import { useCountdownTimer } from './useCountdownTimer';
import { styles } from "./style";

interface CountdownTimerProps {
    initialSeconds?: number;
    onTimeEnd?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds = 180, onTimeEnd }) => {
    const { seconds } = useCountdownTimer({ initialSeconds, onTimeEnd });

    const formatTime = (time: number): string => String(time).padStart(2, '0');

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>
                {formatTime(Math.floor(seconds / 60))}:{formatTime(seconds % 60)}
            </Text>
        </View>
    );
};

export default CountdownTimer;
