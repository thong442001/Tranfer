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
        justifyContent: 'center',
    },
    logo_vinh_tuong: {
        width: 210,
        height: 60,
        marginTop: -10,
    },
    backGround_phu: {
        width: 335,
        height: 530,
        marginTop: 30,
    },
    vContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        gap: 10,
    },
    title_phu: {
        color: '#C2030B',
        fontSize: 16,
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
    btn_chiaSe_nhanLoc: {
        width: 136,
        height: 44,
    },
    vBtnChiaSe: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 85,
    },
    vBtnNhanLoc: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 30,
    },
});
