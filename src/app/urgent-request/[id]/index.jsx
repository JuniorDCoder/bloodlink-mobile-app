import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import {
  ArrowLeft,
  Droplet,
  MapPin,
  Phone,
  Clock,
  User,
  AlertCircle,
  Heart,
  Shield,
  Calendar,
  Info,
  ExternalLink,
} from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/utils/localization";

// Mock data for urgent requests
const urgentRequestsData = {
  1: {
    id: 1,
    bloodType: "O+",
    hospital: "City General Hospital",
    hospitalAddress: "123 Medical Center Dr, San Francisco, CA 94102",
    distance: "2.3 km",
    urgency: "Critical",
    timeLeft: "4 hours",
    unitsNeeded: 3,
    patientAge: 45,
    condition: "Emergency Surgery",
    contactPhone: "+1 (555) 123-4567",
    description:
      "Patient requires immediate blood transfusion for emergency cardiac surgery. Compatible O+ donors needed urgently.",
    requesterType: "Medical Facility",
    verificationLevel: "Verified Hospital",
    estimatedArrivalTime: "15-20 minutes",
    compensation: "Standard donation benefits apply",
  },
  2: {
    id: 2,
    bloodType: "O-",
    hospital: "Metro Medical Center",
    hospitalAddress: "456 Healthcare Ave, San Francisco, CA 94103",
    distance: "5.1 km",
    urgency: "Urgent",
    timeLeft: "12 hours",
    unitsNeeded: 2,
    patientAge: 28,
    condition: "Post-Accident Care",
    contactPhone: "+1 (555) 987-6543",
    description:
      "Young adult requires blood transfusion following traffic accident. O- universal donors preferred for safe transfusion.",
    requesterType: "Emergency Department",
    verificationLevel: "Verified Medical Center",
    estimatedArrivalTime: "25-30 minutes",
    compensation: "Express processing + priority scheduling",
  },
};

export default function UrgentRequestDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme, language } = useApp();
  const [responding, setResponding] = useState(false);

  const t = (key) => getTranslation(key, language);
  const request = urgentRequestsData[id];

  if (!request) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.text.primary, fontSize: 18 }}>
          Request not found
        </Text>
      </View>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleCallHospital = () => {
    Linking.openURL(`tel:${request.contactPhone}`);
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(request.hospitalAddress);
    Linking.openURL(`maps://app?daddr=${address}`);
  };

  const handleRespondToDonation = () => {
    setResponding(true);

    // Simulate response processing
    setTimeout(() => {
      setResponding(false);
      Alert.alert(
        "Response Submitted!",
        "Your donation response has been sent to the medical facility. They will contact you shortly with next steps.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    }, 2000);
  };

  const urgencyColor =
    request.urgency === "Critical" ? theme.brand.primary : theme.brand.warning;
  const urgencyBgColor =
    request.urgency === "Critical"
      ? `${theme.brand.primary}20`
      : `${theme.brand.warning}20`;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background.primary }}>
      <StatusBar style={theme.isDarkMode ? "light" : "dark"} />

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

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <Pressable onPress={handleBack} style={{ marginRight: 20 }}>
          <ArrowLeft size={24} color={theme.text.primary} />
        </Pressable>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: theme.text.primary,
          }}
        >
          Urgent Blood Request
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Urgency Header */}
        <MotiView
          from={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", duration: 600 }}
          style={{
            marginHorizontal: 20,
            marginBottom: 25,
            backgroundColor: urgencyBgColor,
            borderRadius: 16,
            padding: 20,
            borderLeftWidth: 4,
            borderLeftColor: urgencyColor,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <AlertCircle size={24} color={urgencyColor} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.text.primary,
                marginLeft: 12,
              }}
            >
              {request.urgency} Priority
            </Text>
          </View>

          <Text
            style={{
              fontSize: 14,
              color: theme.text.secondary,
              lineHeight: 20,
            }}
          >
            Time Remaining: {request.timeLeft} • {request.unitsNeeded} units
            needed
          </Text>
        </MotiView>

        {/* Main Request Card */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", delay: 200, duration: 600 }}
          style={{
            marginHorizontal: 20,
            marginBottom: 25,
          }}
        >
          <LinearGradient
            colors={theme.gradient.brand}
            style={{
              borderRadius: 20,
              padding: 25,
              borderWidth: 1,
              borderColor: theme.surface.border,
            }}
          >
            {/* Blood Type Header */}
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
                  backgroundColor: `${theme.brand.primary}20`,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                  borderWidth: 2,
                  borderColor: theme.brand.primary,
                }}
              >
                <Droplet size={30} color={theme.brand.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: theme.text.primary,
                    marginBottom: 5,
                  }}
                >
                  {request.bloodType} Blood Needed
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.text.secondary,
                  }}
                >
                  {request.condition} • Age {request.patientAge}
                </Text>
              </View>
            </View>

            {/* Description */}
            <Text
              style={{
                fontSize: 16,
                color: theme.text.primary,
                lineHeight: 22,
                marginBottom: 20,
              }}
            >
              {request.description}
            </Text>

            {/* Verification Badge */}
            <View
              style={{
                backgroundColor: `${theme.brand.accent}20`,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Shield size={16} color={theme.brand.accent} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: theme.brand.accent,
                  marginLeft: 6,
                }}
              >
                {request.verificationLevel}
              </Text>
            </View>
          </LinearGradient>
        </MotiView>

        {/* Hospital Information */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", delay: 400, duration: 600 }}
          style={{
            marginHorizontal: 20,
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: theme.text.primary,
              marginBottom: 15,
            }}
          >
            Hospital Information
          </Text>

          <View
            style={{
              backgroundColor: theme.surface.primary,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: theme.surface.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <MapPin size={20} color={theme.brand.secondary} />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.text.primary,
                    marginBottom: 2,
                  }}
                >
                  {request.hospital}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.text.secondary,
                  }}
                >
                  {request.hospitalAddress}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.text.tertiary,
                    marginBottom: 2,
                  }}
                >
                  Distance
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.text.primary,
                  }}
                >
                  {request.distance}
                </Text>
              </View>

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.text.tertiary,
                    marginBottom: 2,
                  }}
                >
                  Estimated Travel
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.text.primary,
                  }}
                >
                  {request.estimatedArrivalTime}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={handleCallHospital}
                style={{
                  flex: 1,
                  backgroundColor: theme.brand.accent,
                  borderRadius: 12,
                  padding: 12,
                  marginRight: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Phone size={16} color={theme.text.inverse} />
                <Text
                  style={{
                    color: theme.text.inverse,
                    fontWeight: "600",
                    marginLeft: 6,
                    fontSize: 14,
                  }}
                >
                  Call
                </Text>
              </Pressable>

              <Pressable
                onPress={handleGetDirections}
                style={{
                  flex: 1,
                  backgroundColor: theme.surface.secondary,
                  borderRadius: 12,
                  padding: 12,
                  marginLeft: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: theme.surface.border,
                }}
              >
                <ExternalLink size={16} color={theme.brand.secondary} />
                <Text
                  style={{
                    color: theme.brand.secondary,
                    fontWeight: "600",
                    marginLeft: 6,
                    fontSize: 14,
                  }}
                >
                  Directions
                </Text>
              </Pressable>
            </View>
          </View>
        </MotiView>

        {/* Blockchain Education */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", delay: 600, duration: 600 }}
          style={{
            marginHorizontal: 20,
            marginBottom: 25,
          }}
        >
          <View
            style={{
              backgroundColor: `${theme.brand.secondary}10`,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: `${theme.brand.secondary}20`,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Info size={20} color={theme.brand.secondary} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: theme.text.primary,
                  marginLeft: 10,
                }}
              >
                How Blockchain Protects You
              </Text>
            </View>

            <Text
              style={{
                fontSize: 14,
                color: theme.text.secondary,
                lineHeight: 20,
                marginBottom: 15,
              }}
            >
              Your donation response is recorded on the blockchain, creating a
              permanent, verifiable record that protects both donors and
              recipients.
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {[
                { icon: Shield, text: "Verified Identity" },
                { icon: Clock, text: "Instant Tracking" },
                { icon: Heart, text: "Impact Proof" },
              ].map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 20,
                    marginBottom: 8,
                  }}
                >
                  <item.icon size={14} color={theme.brand.secondary} />
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.text.secondary,
                      marginLeft: 6,
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </MotiView>
      </ScrollView>

      {/* Response Button */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
          paddingTop: 20,
          backgroundColor: theme.gradient.surface[0],
        }}
      >
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 800 }}
        >
          <Pressable
            onPress={handleRespondToDonation}
            disabled={responding}
            style={{
              backgroundColor: theme.brand.primary,
              paddingVertical: 18,
              paddingHorizontal: 40,
              borderRadius: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: theme.brand.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            {responding ? (
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
                    borderColor: theme.text.inverse,
                    borderTopColor: "transparent",
                  }}
                />
              </MotiView>
            ) : (
              <>
                <Heart size={20} color={theme.text.inverse} />
                <Text
                  style={{
                    color: theme.text.inverse,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  Respond to Donation
                </Text>
              </>
            )}
          </Pressable>
        </MotiView>
      </View>
    </View>
  );
}
