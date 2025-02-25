import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    vBack: {
        width: 60,
        height: 50,
        marginTop: 65,
        marginLeft: 20,
        //backgroundColor: 'white'
    },
    btnBack: {
        width: 60,
        height: 50,
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
        marginTop: Dimensions.get('window').height * 0.6
    },
    poseImg: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5,
        marginTop: Dimensions.get('window').height * 0.24,
        marginLeft: Dimensions.get('window').width * 0.18,
        position: 'absolute',
    },
    // dialog
    overlay: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    background_1: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',// trong suốt
    },
    dialog_1: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 20,
    },
    txt_dialog_1: {
        width: Dimensions.get('window').width * 0.45,
        color: '#FFD600D9',
        fontSize: 11,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'SVN-Gotham',
    },
    name_dialog_1: {
        width: Dimensions.get('window').width * 0.5,
        color: '#C2030B',
        fontSize: 11,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'SVN-Cookies',
    },
    giftImage: {
        width: 50,
        height: 50,
    },
    dialog_10: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 20,
    },
    txt_dialog_10: {
        width: Dimensions.get('window').width * 0.45,
        color: '#FFF3F4',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'SVN-Gotham',
    },
    title_dialog_10: {
        marginTop: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.5,
        color: '#FFE933',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'SVN-Cookies',
    },
    name_dialog_10: {
        width: Dimensions.get('window').width * 0.5,
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'SVN-Cookies',
    },
});
