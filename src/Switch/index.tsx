import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolateColors, spring } from "react-native-reanimated";

interface IRNSwitch {
  handleOnPress: (arg0: boolean) => void;
  value: boolean;
  activeTrackColor?: any;
  inActiveTrackColor?: any;
  thumbColor?: any;
  thumbStyle?: any;
  containerStyle?: any;
}

const RNSwitch: React.FC<IRNSwitch> = ({
  handleOnPress,
  activeTrackColor,
  inActiveTrackColor,
  thumbColor,
  value,
  thumbStyle,
  containerStyle,
}) => {
  const [switchTranslate] = useState(new Animated.Value(0));

  const switchToOff = () =>
    spring(switchTranslate, {
      toValue: 0,
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();

  const switchToOn = () =>
    spring(switchTranslate, {
      toValue: 21,
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();

  useEffect(() => {
    if (value) {
      switchToOn();
    } else {
      switchToOff();
    }
  }, [value, switchTranslate]);

  const interpolateBackgroundColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, 22],
      outputColorRange: [inActiveTrackColor, activeTrackColor],
    }),
  };

  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    handleOnPress(!value);
  }, [handleOnPress, value]);

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback}>
      <Animated.View
        style={[
          styles.containerStyle,
          interpolateBackgroundColor,
          containerStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.circleStyle,
            thumbStyle,
            { backgroundColor: thumbColor },
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
            styles.shadowValue,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  containerStyle: {
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
  },
  shadowValue: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

RNSwitch.defaultProps = {
  activeTrackColor: "#007AFF",
  inActiveTrackColor: "#F2F5F7",
  thumbColor: "#FFF",
};

export default RNSwitch;
