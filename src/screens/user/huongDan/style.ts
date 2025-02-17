import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
    },
    background: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
    },
    vHeader: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-around',
        marginVertical: 44,
    },
    btn_back: {
        width: 61,
        height: 52,
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        color: '#C2030B',
        fontFamily: 'SVN-Gotham',
    },
    img_chinh: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.4,
        alignItems: "center",
        margin: 20,
    },
    backGroundTxt: {
        width: 335,
        height: 151,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginBottom: 20,
    },
    content: {
        width: 250,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'SVN-Gotham',
    },
    boc: {
        alignItems: "center",
        alignContent: "center",
    },
    btn_tham_gia_ngay: {
        width: 179,
        height: 44,
        alignItems: "center",
        alignContent: "center",
    },
    // 4 btn tron
    vBtnTron: {
        width: 44,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10
    },
    btn_tron: {
        width: 8,
        height: 8,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#C2030B',
    },
    btn_tron_chon: {
        backgroundColor: '#C2030B',
    },
});
