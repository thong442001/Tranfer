import React from 'react';
import {
    View,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import { styles } from "./style";

interface DialogProps {
    visible?: boolean;
    uriBackGround?: string;
    uriBtnConfim?: string;
    onConfirm?: () => void;
}
const DialogXinChao: React.FC<DialogProps> = ({
    visible,
    uriBackGround,
    uriBtnConfim,
    onConfirm
}) => {

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                {
                    (uriBackGround && uriBtnConfim)
                    && (
                        <TouchableWithoutFeedback onPress={onConfirm}>
                            <View style={styles.background} />
                        </TouchableWithoutFeedback>
                    )
                }
                {
                    (uriBackGround && uriBtnConfim)
                    && (
                        <ImageBackground
                            source={{ uri: uriBackGround }}
                            style={styles.dialog}
                            resizeMode="contain"
                        >
                            <TouchableOpacity
                                onPress={onConfirm}
                            >
                                <Image
                                    style={styles.btnConfirm}
                                    source={{ uri: uriBtnConfim }}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                    )
                }
            </View>
        </Modal>
    );
};


export default DialogXinChao;