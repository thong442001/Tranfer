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
    txtSieuChongAm: {
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
    vKhien: {
        //position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        // left: width * 0.12,
        // bottom: height * 0.12,
    },
    img_anh_hung_sieu_bao_ve: {
        width: width * 0.8,
        height: height * 0.5,
    },
    img_score: {
        width: 80, // Mặc định, nhưng sẽ được random trong `handleShoot`
        height: 80,
    },
});
