import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    vHeader: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-around',
        marginTop: 44,
        marginBottom: 30,
    },
    btnBack: {
        width: 60,
        height: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        color: '#C2030B',
        fontFamily: 'SVN-Gotham',
    },
    poseImg: {
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').height * 0.75,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    // btn 
    btn_tet_tranh_tai: {
        //backgroundColor: 'green',
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 150,
        left: 65,
    },
    btn_home_thanh_li_xi: {
        //backgroundColor: 'blue',
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 50,
        right: 60,
    }
});
