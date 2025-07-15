import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabBarsIcons = {
    index: (isFocused: boolean) => {
      return (
        <FontAwesome6
          name="house-chimney"
          size={verticalScale(20)}
          color={isFocused ? colors.primary : colors.neutral300}
        />
      );
    },
    profile: (isFocused: boolean) => {
      return (
        <Feather
          name="user"
          size={verticalScale(20)}
          color={isFocused ? colors.primary : colors.neutral300}
        />
      );
    },
    wallet: (isFocused: boolean) => {
      return (
        <Ionicons
          name="wallet"
          size={verticalScale(20)}
          color={isFocused ? colors.primary : colors.neutral300}
        />
      );
    },
    statistics: (isFocused: boolean) => {
      return (
        <Ionicons
          name="stats-chart"
          size={verticalScale(20)}
          color={isFocused ? colors.primary : colors.neutral300}
        />
      );
    },
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;
        const Icon: (isFocused: boolean) => React.JSX.Element =
          tabBarsIcons[
            route.name as "index" | "wallet" | "statistics" | "profile"
          ];
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            //href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            key={route.key}
          >
            {Icon && Icon(isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    height: verticalScale(100),
    backgroundColor: colors.neutral800,
  },
  tabItem: {
    marginBottom: spacingY._20,
    justifyContent: "center",
    alignItems: "center",
  },
});
