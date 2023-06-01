import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const CircularProgress = ({ size, progress, strokeWidth, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.2)', color],
  });

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: color,
            transform: [{ rotate: '-90deg' }],
            opacity: progress === 0 ? 0 : 1,
          },
        ]}
      />
      <View
        style={[
          styles.background,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'rgba(255,255,255,0.2)',
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'rgba(255,255,255,0.2)',
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
});

export default CircularProgress;
