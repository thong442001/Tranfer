import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.55,
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    txtBenMau: {
        position: 'absolute',
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'SVN-Cookies',
        alignSelf: 'center',
        color: "#C4040B",
        bottom: 170,
    },
    backGround_time: {
        position: 'absolute',
        width: 120,
        height: 60,
        //backgroundColor: 'blue',
        top: 10,
        paddingTop: 5,
        paddingLeft: 10,
    },
    screw: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vNhan: {
        position: 'absolute',
        width: width * 0.9,
        height: height * 0.55,
        alignSelf: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
    },
    img_score: {
        width: 80, // Mặc định, nhưng sẽ được random trong `handleShoot`
        height: 80,
    },
});
