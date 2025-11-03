import React, { useState } from "react";
import { View, Text, Pressable, Dimensions, Alert, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
  Wallet,
  ArrowLeft,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const walletOptions = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect with MetaMask wallet",
    icon: "🦊",
    popular: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect with any WalletConnect wallet",
    icon: "🔗",
    popular: false,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect with Coinbase Wallet",
    icon: "💙",
    popular: false,
  },
];

export default function ConnectWalletScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [connecting, setConnecting] = useState(null);
  const [connected, setConnected] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleConnectWallet = async (walletId) => {
    setConnecting(walletId);

    // Simulate wallet connection
    setTimeout(() => {
      setConnecting(null);
      setConnected(true);

      // Navigate to profile creation after successful connection
      setTimeout(() => {
        router.push("/create-profile");
      }, 1500);
    }, 2000);
  };

  const handleSkipForNow = () => {
    Alert.alert(
      "Skip Wallet Connection?",
      "You can connect your wallet later in settings. Some features may be limited.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Skip", onPress: () => router.push("/create-profile") },
      ],
    );
  };

  if (connected) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
        <StatusBar style="light" />

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

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 40,
          }}
        >
          <MotiView
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 800,
            }}
            style={{
              marginBottom: 40,
              padding: 30,
              borderRadius: 100,
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              borderWidth: 2,
              borderColor: "rgba(34, 197, 94, 0.3)",
            }}
          >
            <CheckCircle size={80} color="#22C55E" />
          </MotiView>

          <MotiView
            from={{ translateY: 30, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{
              type: "timing",
              delay: 400,
              duration: 600,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#FFFFFF",
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              Wallet Connected!
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#FFFFFF",
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              Your wallet is now connected to BloodLink
            </Text>
          </MotiView>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
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

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          marginBottom: 40,
        }}
      >
        <Pressable onPress={handleBack} style={{ marginRight: 20 }}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#FFFFFF",
          }}
        >
          Connect Wallet
        </Text>
      </View>

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        {/* Hero Section */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            duration: 600,
          }}
          style={{
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <View
            style={{
              marginBottom: 30,
              padding: 25,
              borderRadius: 80,
              backgroundColor: "rgba(138, 43, 226, 0.1)",
              borderWidth: 2,
              borderColor: "rgba(138, 43, 226, 0.3)",
            }}
          >
            <Wallet size={60} color="#8A2BE2" />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Connect Your Wallet
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
              textAlign: "center",
              opacity: 0.7,
              lineHeight: 22,
            }}
          >
            Connect your Web3 wallet to access blockchain features and track
            your donations on-chain
          </Text>
        </MotiView>

        {/* Wallet Options */}
        <View style={{ marginBottom: 40 }}>
          {walletOptions.map((wallet, index) => (
            <MotiView
              key={wallet.id}
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 200 + index * 100,
                duration: 600,
              }}
              style={{ marginBottom: 15 }}
            >
              <Pressable
                onPress={() => handleConnectWallet(wallet.id)}
                disabled={connecting !== null}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  flexDirection: "row",
                  alignItems: "center",
                  opacity: connecting && connecting !== wallet.id ? 0.5 : 1,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 15,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{wallet.icon}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: "#FFFFFF",
                        marginRight: 10,
                      }}
                    >
                      {wallet.name}
                    </Text>
                    {wallet.popular && (
                      <View
                        style={{
                          backgroundColor: "#DC143C",
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#FFFFFF",
                            fontWeight: "600",
                          }}
                        >
                          POPULAR
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                      opacity: 0.6,
                      marginTop: 2,
                    }}
                  >
                    {wallet.description}
                  </Text>
                </View>

                {connecting === wallet.id ? (
                  <MotiView
                    from={{ rotate: "0deg" }}
                    animate={{ rotate: "360deg" }}
                    transition={{
                      type: "timing",
                      duration: 1000,
                      loop: true,
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "#8A2BE2",
                        borderTopColor: "transparent",
                      }}
                    />
                  </MotiView>
                ) : (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#8A2BE2",
                    }}
                  />
                )}
              </Pressable>
            </MotiView>
          ))}
        </View>

        {/* Security Features */}
        <MotiView
          from={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            delay: 800,
            duration: 600,
          }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: 12,
            padding: 20,
            marginBottom: 30,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Shield size={20} color="#22C55E" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#FFFFFF",
                marginLeft: 10,
              }}
            >
              Secure & Private
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#8A2BE2",
                marginTop: 8,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "#FFFFFF",
                opacity: 0.7,
                flex: 1,
              }}
            >
              Your wallet stays in your control
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#8A2BE2",
                marginTop: 8,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "#FFFFFF",
                opacity: 0.7,
                flex: 1,
              }}
            >
              Encrypted blockchain transactions
            </Text>
          </View>
        </MotiView>
      </View>

      {/* Bottom Section */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
        }}
      >
        <Pressable
          onPress={handleSkipForNow}
          disabled={connecting !== null}
          style={{
            paddingVertical: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              opacity: 0.6,
            }}
          >
            Skip for now
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
