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
    txtThiCongNgon: {
        position: 'absolute',
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'SVN-Cookies',
        alignSelf: 'center',
        color: "#C4040B",
        right: 80,
        top: 120,
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
    img_bao_vit: {
        position: 'absolute',
        width: width * 0.5,
        height: height * 0.12,
        //backgroundColor: 'blue',
        alignItems: 'center',
        bottom: 0,
    },
    screw: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vMayKhoan: {
        position: 'absolute',
        left: width * 0.12,
        bottom: height * 0.12,
    },
    img_may_khoan: {
        width: width * 0.5,
        height: height * 0.25,
    },
    img_vit: {
        width: 80, // Mặc định, nhưng sẽ được random trong `handleShoot`
        height: 80,
    },
});
