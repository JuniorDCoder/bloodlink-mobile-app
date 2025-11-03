import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
  Heart,
  Droplet,
  Wallet,
  Bell,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  ChevronRight,
  Moon,
  Sun,
  Globe,
} from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/utils/localization";

const { width: screenWidth } = Dimensions.get("window");

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme, language, isDarkMode, toggleTheme, changeLanguage } = useApp();
  const [walletConnected] = useState(true);

  const t = (key) => getTranslation(key, language);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    bloodType: "O+",
    donationCount: 12,
    walletAddress: "0x742d...4f8a",
    lastDonation: "2 weeks ago",
    nextEligible: "6 weeks",
    badges: 3,
    impactScore: 850,
  };

  // Mock urgent requests
  const urgentRequests = [
    {
      id: 1,
      bloodType: "O+",
      hospital: "City General Hospital",
      distance: "2.3 km",
      urgency: "Critical",
      timeLeft: "4 hours",
    },
    {
      id: 2,
      bloodType: "O-",
      hospital: "Metro Medical Center",
      distance: "5.1 km",
      urgency: "Urgent",
      timeLeft: "12 hours",
    },
  ];

  const handleDonateNow = () => {
    router.push("/donate");
  };

  const handleRequestBlood = () => {
    router.push("/request-blood");
  };

  const handleUrgentRequestPress = (requestId) => {
    router.push(`/urgent-request/${requestId}`);
  };

    const handleNotificationsPress = () => {
        console.log("Button Pressed")
        router.push("/notifications");
    };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background.primary }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      {/* Background Gradient */}
      <LinearGradient
        colors={theme.gradient.primary}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Theme/Language Toggle */}
        <View
          style={{
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text.secondary,
                  marginBottom: 5,
                }}
              >
                {t("dashboard.welcomeBack")}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: theme.text.primary,
                }}
              >
                {userData.name}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Language Toggle */}
              <Pressable
                onPress={() => changeLanguage(language === "en" ? "fr" : "en")}
                style={{
                  padding: 8,
                  borderRadius: 16,
                  backgroundColor: theme.surface.primary,
                  borderWidth: 1,
                  borderColor: theme.surface.border,
                  marginRight: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Globe size={16} color={theme.brand.secondary} />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: theme.brand.secondary,
                    marginLeft: 4,
                  }}
                >
                  {language.toUpperCase()}
                </Text>
              </Pressable>

              {/* Theme Toggle */}
              <Pressable
                onPress={toggleTheme}
                style={{
                  padding: 8,
                  borderRadius: 16,
                  backgroundColor: theme.surface.primary,
                  borderWidth: 1,
                  borderColor: theme.surface.border,
                  marginRight: 10,
                }}
              >
                {isDarkMode ? (
                  <Sun size={20} color={theme.brand.warning} />
                ) : (
                  <Moon size={20} color={theme.brand.secondary} />
                )}
              </Pressable>

              {/* Notifications */}
                <Pressable
                    onPress={handleNotificationsPress}
                    style={{
                        padding: 12,
                        borderRadius: 20,
                        backgroundColor: theme.surface.primary,
                        borderWidth: 1,
                        borderColor: theme.surface.border,
                    }}
                >
                    <Bell size={24} color={theme.text.primary} />
                </Pressable>
            </View>
          </View>
        </View>

        {/* Profile Card */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            delay: 200,
            duration: 600,
          }}
          style={{
            marginHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <LinearGradient
            colors={["rgba(220, 20, 60, 0.2)", "rgba(138, 43, 226, 0.2)"]}
            style={{
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "rgba(220, 20, 60, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                  borderWidth: 2,
                  borderColor: "#DC143C",
                }}
              >
                <Droplet size={30} color="#DC143C" />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginBottom: 5,
                  }}
                >
                  Blood Type: {userData.bloodType}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Universal Donor
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(138, 43, 226, 0.2)",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "#8A2BE2",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#8A2BE2",
                  }}
                >
                  VERIFIED
                </Text>
              </View>
            </View>

            {/* Stats Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginBottom: 5,
                  }}
                >
                  {userData.donationCount}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  Donations
                </Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginBottom: 5,
                  }}
                >
                  {userData.badges}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  Badges
                </Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginBottom: 5,
                  }}
                >
                  {userData.impactScore}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  Impact Score
                </Text>
              </View>
            </View>
          </LinearGradient>
        </MotiView>

        {/* Quick Actions */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            delay: 400,
            duration: 600,
          }}
          style={{
            marginHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 15,
            }}
          >
            Quick Actions
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={handleDonateNow}
              style={{
                flex: 1,
                backgroundColor: "#DC143C",
                borderRadius: 16,
                padding: 20,
                alignItems: "center",
                marginRight: 10,
                shadowColor: "#DC143C",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <Heart size={24} color="#FFFFFF" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginTop: 10,
                }}
              >
                Donate Now
              </Text>
            </Pressable>

            <Pressable
              onPress={handleRequestBlood}
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 16,
                padding: 20,
                alignItems: "center",
                marginLeft: 10,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <AlertCircle size={24} color="#8A2BE2" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginTop: 10,
                }}
              >
                Request Blood
              </Text>
            </Pressable>
          </View>
        </MotiView>

        {/* Donation Status */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            delay: 600,
            duration: 600,
          }}
          style={{
            marginHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 15,
            }}
          >
            Donation Status
          </Text>

          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Clock size={16} color="#22C55E" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#FFFFFF",
                      marginLeft: 8,
                    }}
                  >
                    Last Donation
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#22C55E",
                    fontWeight: "bold",
                  }}
                >
                  {userData.lastDonation}
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Calendar size={16} color="#8A2BE2" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#FFFFFF",
                      marginLeft: 8,
                    }}
                  >
                    Next Eligible
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#8A2BE2",
                    fontWeight: "bold",
                  }}
                >
                  {userData.nextEligible}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "rgba(138, 43, 226, 0.1)",
                borderRadius: 8,
                padding: 12,
                borderWidth: 1,
                borderColor: "rgba(138, 43, 226, 0.2)",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.7)",
                  textAlign: "center",
                }}
              >
                You're eligible to donate again in 6 weeks. Thank you for your
                life-saving contributions!
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Urgent Requests */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            delay: 800,
            duration: 600,
          }}
          style={{
            marginHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Urgent Requests Nearby
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 14,
                  color: "#8A2BE2",
                  fontWeight: "600",
                }}
              >
                View All
              </Text>
            </Pressable>
          </View>

          {urgentRequests.map((request, index) => (
            <MotiView
              key={request.id}
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 900 + index * 100,
                duration: 600,
              }}
              style={{ marginBottom: 15 }}
            >
              <Pressable
                onPress={() => handleUrgentRequestPress(request.id)}
                style={{
                  backgroundColor: theme.surface.primary,
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor:
                    request.urgency === "Critical"
                      ? "rgba(220, 20, 60, 0.3)"
                      : "rgba(255, 165, 0, 0.3)",
                  borderLeftWidth: 4,
                  borderLeftColor:
                    request.urgency === "Critical" ? "#DC143C" : "#FFA500",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 5,
                      }}
                    >
                      <Droplet size={16} color="#DC143C" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: theme.text.primary,
                          marginLeft: 8,
                        }}
                      >
                        {request.bloodType}
                      </Text>
                      <View
                        style={{
                          backgroundColor:
                            request.urgency === "Critical"
                              ? "rgba(220, 20, 60, 0.2)"
                              : "rgba(255, 165, 0, 0.2)",
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 10,
                          marginLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "600",
                            color:
                              request.urgency === "Critical"
                                ? "#DC143C"
                                : "#FFA500",
                          }}
                        >
                          {request.urgency.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: theme.text.primary,
                        marginBottom: 5,
                      }}
                    >
                      {request.hospital}
                    </Text>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <MapPin size={12} color={theme.text.tertiary} />
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.text.tertiary,
                          marginLeft: 4,
                          marginRight: 15,
                        }}
                      >
                        {request.distance}
                      </Text>
                      <Clock size={12} color={theme.text.tertiary} />
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.text.tertiary,
                          marginLeft: 4,
                        }}
                      >
                        {request.timeLeft} left
                      </Text>
                    </View>
                  </View>

                  <ChevronRight size={20} color={theme.text.tertiary} />
                </View>
              </Pressable>
            </MotiView>
          ))}
        </MotiView>
      </ScrollView>
    </View>
  );
}
