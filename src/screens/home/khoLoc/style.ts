import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
    },
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
    },
    background_3btn: {
        width: 335,
        height: 52,
        flexDirection: 'row',
        padding: 5,
        gap: 0,
    },
    background_phu: {
        width: 335,
        height: 551,
        padding: 20
    },
    logo_Vinh_Tuong: {
        width: 105,
        height: 32,
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
        marginTop: Dimensions.get('window').height * 0.64
    },
    poseImg: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5,
        marginTop: Dimensions.get('window').height * 0.24,
        marginLeft: Dimensions.get('window').width * 0.18,
        position: 'absolute',
    },
    btnTab: {
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '33%',
        justifyContent: 'center',
    },
    txtBtn: {
        fontFamily: 'SVN-Cookies',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#B30D00',
    },
    // kho
    listContainer: {
        //alignItems: "center",
        width: 335,
        height: 500,
        //backgroundColor: 'blue'
    },
    giftItem: {
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        margin: 4,
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').height * 0.2,
        //backgroundColor: 'blue'
    },
    giftImage: {
        width: 40,
        height: 50,
        resizeMode: "contain",
    },
    giftName: {
        fontSize: 10,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        marginVertical: 5,
    },
    giftStock: {
        fontSize: 10,
        color: "#732F2F",
    },
    giftStatus: {
        fontSize: 10,
        fontWeight: "bold",
    },
    unclaimedText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginVertical: 10,
        fontFamily: 'SVN-Gotham',
    },
    unclaimedNumber: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#C2030B",
        textAlign: "center",
        marginVertical: 10,
        fontFamily: 'SVN-Gotham',
    },
});
