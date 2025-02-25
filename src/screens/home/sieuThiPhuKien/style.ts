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
        marginTop: 44,
        marginBottom: 10,
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
        fontFamily: 'SVN-Cookies',
    },
    background_phu: {
        //flex: 1,
        //alignItems: "center",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
        position: "absolute",
        bottom: -100,
    },
    img_2may: {
        flex: 1,
        zIndex: 2,
        //alignItems: "center",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
        position: "absolute",
        bottom: -20,
    },
    quantity: {
        color: 'yellow',
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'SVN-Gotham',
    },
    txt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'SVN-Gotham',
    },
    btn: {
        width: 132,
        height: 44,
        zIndex: 4,
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 3,
        gap: 10,
        marginVertical: 10,
    }
});
