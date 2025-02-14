import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    btnBack: {
        width: 60,
        height: 50,
        marginTop: 65,
        marginLeft: 20
    },
    quantity: {
        color: 'brown',
        fontWeight: 'bold',
        fontSize: 22
    },
    txt: {
        color: 'black',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: '600',
    },
    btn: {
        width: 190,
        height: 50,
        marginTop: Dimensions.get('window').height * 0.01
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * 0.64
    },
    poseImg: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5,
        marginTop: Dimensions.get('window').height * 0.24,
        marginLeft: Dimensions.get('window').width * 0.18,
        position: 'absolute',
    }
});
