import React, { useState, useRef } from "react";
import { View, Text, Pressable, Dimensions, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Heart, Shield, Zap, ArrowRight } from "lucide-react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Donate Blood, Save Lives",
    subtitle: "Powered by Blockchain Transparency",
    description:
      "Join a decentralized network where every donation is tracked, verified, and makes a real difference in saving lives.",
    icon: Heart,
    gradient: ["#DC143C", "#8A2BE2"],
  },
  {
    id: 2,
    title: "Track Your Impact",
    subtitle: "Earn Verified Donor Badges",
    description:
      "Every donation is recorded on-chain. Build your donor reputation and earn exclusive badges for your life-saving contributions.",
    icon: Zap,
    gradient: ["#8A2BE2", "#DC143C"],
  },
  {
    id: 3,
    title: "Your Data, Secured",
    subtitle: "Encrypted and Private",
    description:
      "Your health data is encrypted and stored securely. You control who sees what, when, and how your information is used.",
    icon: Shield,
    gradient: ["#DC143C", "#0D0D0D"],
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
    } else {
      router.push("/connect-wallet");
    }
  };

  const handleSkip = () => {
    router.push("/connect-wallet");
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
      <StatusBar style="light" />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#0D0D0D", "#1A1A1A", "#0D0D0D"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: screenHeight,
        }}
      />

      {/* Skip Button */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 20,
          right: 20,
          zIndex: 10,
        }}
      >
        <Pressable onPress={handleSkip}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              opacity: 0.7,
            }}
          >
            Skip
          </Text>
        </Pressable>
      </View>

      {/* Main Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {onboardingData.map((item, index) => (
          <View
            key={item.id}
            style={{
              width: screenWidth,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 40,
              paddingTop: insets.top + 80,
              paddingBottom: insets.bottom + 120,
            }}
          >
            {/* Icon with Glow Effect */}
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                delay: index === currentIndex ? 200 : 0,
                duration: 800,
              }}
              style={{
                marginBottom: 60,
                padding: 30,
                borderRadius: 100,
                backgroundColor: "rgba(220, 20, 60, 0.1)",
                borderWidth: 2,
                borderColor: "rgba(220, 20, 60, 0.3)",
              }}
            >
              <LinearGradient
                colors={item.gradient}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 100,
                  opacity: 0.2,
                }}
              />
              <item.icon size={80} color="#DC143C" />
            </MotiView>

            {/* Title */}
            <MotiView
              from={{ translateY: 50, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: index === currentIndex ? 400 : 0,
                duration: 600,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  textAlign: "center",
                  marginBottom: 10,
                  lineHeight: 38,
                }}
              >
                {item.title}
              </Text>
            </MotiView>

            {/* Subtitle */}
            <MotiView
              from={{ translateY: 30, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: index === currentIndex ? 600 : 0,
                duration: 600,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#8A2BE2",
                  textAlign: "center",
                  marginBottom: 30,
                  fontWeight: "600",
                }}
              >
                {item.subtitle}
              </Text>
            </MotiView>

            {/* Description */}
            <MotiView
              from={{ translateY: 30, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: index === currentIndex ? 800 : 0,
                duration: 600,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#FFFFFF",
                  textAlign: "center",
                  lineHeight: 24,
                  opacity: 0.8,
                }}
              >
                {item.description}
              </Text>
            </MotiView>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 40,
          paddingBottom: insets.bottom + 40,
          paddingTop: 20,
        }}
      >
        {/* Page Indicators */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          {onboardingData.map((_, index) => (
            <MotiView
              key={index}
              animate={{
                width: index === currentIndex ? 30 : 8,
                backgroundColor:
                  index === currentIndex
                    ? "#DC143C"
                    : "rgba(255, 255, 255, 0.3)",
              }}
              transition={{
                type: "timing",
                duration: 300,
              }}
              style={{
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {/* Next Button */}
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 1000,
          }}
        >
          <Pressable
            onPress={handleNext}
            style={{
              backgroundColor: "#DC143C",
              paddingVertical: 18,
              paddingHorizontal: 40,
              borderRadius: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#DC143C",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "bold",
                marginRight: 10,
              }}
            >
              {currentIndex === onboardingData.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </Pressable>
        </MotiView>
      </View>
    </View>
  );
}
