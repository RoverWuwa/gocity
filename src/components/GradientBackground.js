import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function QuestionBox({ currentStep }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        alignSelf: 'center',
      }}
    >
      <LinearGradient
        colors={['#FFA500', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 12,
          paddingHorizontal: 20,
          paddingVertical: 12,
          width: textSize.width + 40, // se adapta al texto
          height: textSize.height + 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={styles.question}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setTextSize({ width, height });
          }}
        >
          {currentStep.question}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});