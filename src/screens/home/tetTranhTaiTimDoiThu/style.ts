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
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').height * 0.75,
        alignItems: 'center',
        paddingVertical: 10,
        gap: 20,
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
    img: {
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.3,
    },
    btn_tim_doi_thu: {
        width: 170,
        height: 44,
    },
    vNote: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.08,
        backgroundColor: '#C2030B',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    note: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
    },
    time: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        textAlign: 'center',
    },
});
