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
    vInform: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.13,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue',
    },
    img_vs: {
        width: 69,
        height: 50,
        //alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 25,

    },
    backGround12: {
        width: Dimensions.get('window').width * 0.35,
        height: Dimensions.get('window').height * 0.1,
    },
    avt: {
        width: 42,
        height: 34,
        marginTop: 25,
        marginHorizontal: 10
    },
    diem2: {
        color: '#FFE995',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: 13,
        left: 30,
    },
    diem1: {
        color: '#FFE995',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: 13,
        right: 30,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'SVN-Cookies',
        textAlign: 'center',
    },
    // game
    drill: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    screwWrapper: {
        position: 'absolute',
        top: 200,
    },
    screw: {
        width: 30,
        height: 30,
    },
    button: {
        backgroundColor: 'gold',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    titleGame: {
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham bold',
        textAlign: 'center',
        margin: 10,
    },
});
