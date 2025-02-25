import { StyleSheet, Dimensions } from "react-native";
import LiXiVang from "../../screens/home/liXiVang/LiXiVang";
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        height: height * 0.07,
        //flex: 1,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        zIndex: 0,
    },
    vTong: {
        flex: 1,
        //backgroundColor: 'white',
        flexDirection: 'row',
    },
    vID: {
        height: '100%',
        width: "15%",
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    vName: {
        height: '100%',
        width: "50%",
        //backgroundColor: 'green'
        //alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    vLixi: {
        width: "20%",
        height: '100%',
        //backgroundColor: 'black'
        justifyContent: 'center',
    },
    id: {
        color: '#FFE933',
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        textAlign: 'center',
    },
    avt2: {
        width: 20,
        height: 17,
        //flex: 1,
        zIndex: 1,
        marginLeft: 6,
        marginTop: 11,
    },
    avt3: {
        width: 26,
        height: 26,
        //flex: 1,
        zIndex: 1,
        marginLeft: 5,
        marginTop: 5,
    },
    name: {
        color: '#FFE933',
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        textAlign: 'left',
    },
    lixi: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'SVN-Gotham Bold',
        textAlign: 'right',
    },
});
