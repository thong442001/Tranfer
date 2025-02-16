import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Text, Defs, LinearGradient, Stop, TSpan } from 'react-native-svg';
interface BtnBorderProps {
    title: string | undefined;
    size: number;
    height: number,
}
const LgTxtYellow: React.FC<BtnBorderProps> = ({ title, size, height }) => {
    // Chia các dòng bằng cách sử dụng "\n"
    const lines = title?.split('\n');

    return (
        <View>
            <Svg height={height} width="400">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor="#FAD93C" stopOpacity="1" />
                        <Stop offset="0.2" stopColor="#FFE995" stopOpacity="1" />
                        <Stop offset="0.4" stopColor="#FFF9D1" stopOpacity="1" />
                        <Stop offset="0.6" stopColor="#FFF1AD" stopOpacity="1" />
                        <Stop offset="0.8" stopColor="#FBE592" stopOpacity="1" />
                        <Stop offset="1" stopColor="#FFD053" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Text
                    fill="url(#grad)" // Áp dụng Linear Gradient
                    fontSize={size}
                    fontWeight="bold"
                    x="50"
                    y="25"
                    textAnchor="middle"
                >
                    {lines?.map((line, index) => (
                        <TSpan
                            key={index}
                            x="200" // Đặt lại vị trí x cho từng dòng
                            dy={index === 0 ? 0 : size * 1.2} // Khoảng cách giữa các dòng
                        >
                            {line}
                        </TSpan>
                    ))}
                </Text>
            </Svg>
        </View>
    );
};

export default LgTxtYellow;