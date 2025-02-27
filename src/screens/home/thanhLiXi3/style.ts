import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
    },
    vHeader: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-around',
        marginVertical: 25,
    },
    vTitle: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_back: {
        width: 60,
        height: 50,
    },
    vTxt: {
        position: 'absolute',
        alignSelf: 'center',
        gap: 10,
        top: 210,
    },
    title_phu: {
        color: '#C2030B',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        textAlign: 'center',
    },
    content_title_phu: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
    },
    content_2_user: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.32,
        //backgroundColor: '#333333',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.3,
        flexDirection: 'row',
        gap: Dimensions.get('window').width * 0.05,
    },
    vUser1: {
        width: Dimensions.get('window').width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avt: {
        width: 81,
        height: 85,
    },
    name1: {
        width: Dimensions.get('window').width * 0.3,
        color: '#C2030B',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'SVN-Cookies',
        textAlign: 'center',
    },
    vUser2: {
        width: Dimensions.get('window').width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name2: {
        width: Dimensions.get('window').width * 0.3,
        color: '#F8EC23',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'SVN-Cookies',
        textAlign: 'center',
    },
    vTime: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 245,
    },
    vBtnChoi: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 150,
    },
    vBtnHuy: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 90,
    },
    btn_choi_huy: {
        width: 170,
        height: 44,
    },
});
