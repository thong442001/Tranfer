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
    title: {
        color: '#FFE933',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        alignSelf: 'center',
    },
    content: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'SVN-Gotham',
        alignSelf: 'center',
    },
    avt: {
        width: 180,
        height: 180,
        position: 'absolute',
        top: 200,
        alignSelf: 'center',
    },
    vName: {
        position: 'absolute',
        top: 380,
        alignSelf: 'center',
    },
    vTime: {
        position: 'absolute',
        bottom: Dimensions.get('window').height * 0.325,
        alignSelf: 'center',
    },
    note: {
        width: 294,
        height: 66,
        position: 'absolute',
        bottom: 60,
        alignSelf: 'center',
    },
});
