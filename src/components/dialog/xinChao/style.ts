import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',// trong suốt
    },
    dialog: {
        width: 345,
        height: 205,
        alignItems: 'center',
        //backgroundColor: '#FFFF',
    },
    //btn confirm
    btnConfirm: {
        width: 174,
        height: 47,
        marginTop: 140,
    },
});
