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
    background_phu: {
        width: 335,
        height: 593,
        alignItems: 'center',
        paddingVertical: 10,
        gap: 20,
    },
    title1: {
        color: '#C2030B',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'SVN-Gotham Bold',
    },
    vTxt_phu: {
        width: '100%',
        height: 75,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        gap: 5,
        paddingHorizontal: 20,
    },
    title_phu: {
        color: '#C2030B',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'SVN-Gotham Bold',
    },
    content_title_phu: {
        color: '#333333',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'SVN-Gotham',
    },

    img_chinh: {
        width: 303,
        height: 204
    },
    btn: {
        width: 153,
        height: 44
    },
    note: {
        width: 294,
        height: 78
    }
});
