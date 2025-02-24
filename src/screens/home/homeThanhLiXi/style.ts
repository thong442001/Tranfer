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
    quantity: {
        color: 'yellow',
        fontWeight: 'bold',
        fontSize: 22
    },
    txt: {
        color: 'white',
        fontSize: 20,
        //marginLeft: 0,
        fontWeight: '600',
    },
    btn: {
        width: 200,
        height: 50
    },
    wrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 160,
        marginTop: Dimensions.get('window').height * 0.57
    }
});
