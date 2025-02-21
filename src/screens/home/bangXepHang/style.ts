import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#C2030B",
    },
    vHeader: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-around',
        marginVertical: 44,
    },
    btn_back: {
        width: 60,
        height: 50,
    },
    vTitle: {
        width: '50%',
        alignItems: 'center',
        //marginBottom: 20,
    },
    backGround_phu: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.75,
        marginTop: 10,
    },
    img_3btn: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.1,
        position: 'absolute',
        top: -15,
    },
    //v top12
    vTop12: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.15,
        flexDirection: 'row',
        marginTop: 65,
        paddingHorizontal: 30,

        //backgroundColor: 'blue'
    },
    vTop1: {
        flex: 1,
        //width: Dimensions.get('window').width * 0.35,
        height: Dimensions.get('window').height * 0.15,
        //backgroundColor: 'red'
    },
    vTop2: {
        flex: 1,
        //width: Dimensions.get('window').width * 0.35,
        height: Dimensions.get('window').height * 0.125,
        marginTop: 22,
        //backgroundColor: 'red'
    },
    avt1: {
        width: 50,
        height: 40,
        position: 'absolute',
        alignSelf: 'center',
        top: 45,
    },
    avt2: {
        width: 50,
        height: 40,
        position: 'absolute',
        alignSelf: 'center',
        top: 20,
    },
    nameTop1: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        width: 80,
        textAlign: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 5,
    },
    nameTop2: {
        color: '#333333',
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        width: 80,
        textAlign: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 5,
    },
    list: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.35,
        marginVertical: 20
    },
    img_hang_cua_toi: {
        width: 87,
        height: 22,
        position: 'absolute',
        alignSelf: 'center',
        top: -5,
        zIndex: 10,
    },
});
