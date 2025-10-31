import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
  User,
  Settings,
  Wallet,
  Bell,
  Shield,
  Heart,
  Award,
  Edit,
  LogOut,
  ChevronRight,
  Camera,
  Droplet,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react-native";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [walletConnected] = useState(true);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bloodType: "O+",
    age: 28,
    location: "San Francisco, CA",
    donationCount: 12,
    walletAddress: "0x742d35cc6bf8b4f8a",
    memberSince: "January 2024",
    badges: 3,
    impactScore: 850,
    nextEligible: "6 weeks",
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    router.push("/edit-profile");
  };

  const handleWalletSettings = () => {
    Alert.alert(
      "Wallet Settings",
      "Wallet management functionality would be implemented here.",
    );
  };

  const handleNotificationSettings = () => {
    Alert.alert(
      "Notifications",
      "Notification settings would be implemented here.",
    );
  };

  const handlePrivacySettings = () => {
    Alert.alert(
      "Privacy & Security",
      "Privacy settings would be implemented here.",
    );
  };

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // Handle logout
          router.push("/onboarding");
        },
      },
    ]);
  };

  const menuItems = [
    {
      icon: Wallet,
      title: "Wallet Settings",
      subtitle: walletConnected ? "Connected" : "Not connected",
      onPress: handleWalletSettings,
      color: "#8A2BE2",
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Manage your alerts",
      onPress: handleNotificationSettings,
      color: "#22C55E",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      subtitle: "Control your data",
      onPress: handlePrivacySettings,
      color: "#FFA500",
    },
    {
      icon: Settings,
      title: "App Settings",
      subtitle: "Preferences and more",
      onPress: () =>
        Alert.alert("Settings", "App settings would be implemented here."),
      color: "#6B7280",
    },
  ];

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
          bottom: 0,
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <MotiView
            from={{ translateY: 30, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{
              type: "timing",
              duration: 600,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: 10,
              }}
            >
              Profile
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Manage your account and preferences
            </Text>
          </MotiView>
        </View>

        {/* Profile Card */}
        <MotiView
          from={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
              padding: 25,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Profile Photo and Basic Info */}
            <View
              style={{
                alignItems: "center",
                marginBottom: 25,
              }}
            >
              <View
                style={{
                  position: "relative",
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: "rgba(220, 20, 60, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderColor: "#DC143C",
                  }}
                >
                  <User size={50} color="#DC143C" />
                </View>

                <Pressable
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: "#8A2BE2",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "#0D0D0D",
                  }}
                >
                  <Camera size={16} color="#FFFFFF" />
                </Pressable>
              </View>

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginBottom: 5,
                }}
              >
                {userData.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Droplet size={16} color="#DC143C" />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#DC143C",
                    fontWeight: "600",
                    marginLeft: 5,
                    marginRight: 15,
                  }}
                >
                  {userData.bloodType}
                </Text>
                <MapPin size={16} color="rgba(255, 255, 255, 0.6)" />
                <Text
                  style={{
                    fontSize: 16,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginLeft: 5,
                  }}
                >
                  {userData.location}
                </Text>
              </View>

              <Pressable
                onPress={handleEditProfile}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Edit size={16} color="#FFFFFF" />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFF",
                    fontWeight: "600",
                    marginLeft: 8,
                  }}
                >
                  Edit Profile
                </Text>
              </Pressable>
            </View>

            {/* Stats Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 20,
                borderTopWidth: 1,
                borderTopColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 24,
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
                    fontSize: 24,
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
                    fontSize: 24,
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

        {/* Contact Information */}
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
            Contact Information
          </Text>

          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Mail size={20} color="#8A2BE2" />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: 2,
                  }}
                >
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  {userData.email}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Phone size={20} color="#22C55E" />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: 2,
                  }}
                >
                  Phone
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  {userData.phone}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Calendar size={20} color="#FFA500" />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: 2,
                  }}
                >
                  Member Since
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  {userData.memberSince}
                </Text>
              </View>
            </View>
          </View>
        </MotiView>

        {/* Menu Items */}
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
            Settings
          </Text>

          {menuItems.map((item, index) => (
            <MotiView
              key={index}
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 700 + index * 100,
                duration: 600,
              }}
              style={{ marginBottom: 15 }}
            >
              <Pressable
                onPress={item.onPress}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: `${item.color}20`,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 15,
                  }}
                >
                  <item.icon size={20} color={item.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#FFFFFF",
                      marginBottom: 2,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                <ChevronRight size={20} color="rgba(255, 255, 255, 0.4)" />
              </Pressable>
            </MotiView>
          ))}
        </MotiView>

        {/* Logout Button */}
        <MotiView
          from={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "timing",
            delay: 1000,
            duration: 600,
          }}
          style={{
            marginHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <Pressable
            onPress={handleLogout}
            style={{
              backgroundColor: "rgba(220, 20, 60, 0.1)",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "rgba(220, 20, 60, 0.3)",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogOut size={20} color="#DC143C" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#DC143C",
                marginLeft: 10,
              }}
            >
              Sign Out
            </Text>
          </Pressable>
        </MotiView>

        {/* App Version */}
        <View
          style={{
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            BloodLink v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
