import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#A00000",
        borderWidth: 4,
        borderColor: "gold",
        alignItems: "center",
        justifyContent: "center",
    },
    timerText: {
        fontSize: 28,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham',
        alignSelf: 'center',
        color: "#FFD700",
    },
});
