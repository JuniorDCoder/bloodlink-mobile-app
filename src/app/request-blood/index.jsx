import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
  ArrowLeft,
  AlertCircle,
  Droplet,
  MapPin,
  Phone,
  User,
  Clock,
  Calendar,
  Send,
  CheckCircle,
} from "lucide-react-native";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = [
  {
    id: "critical",
    label: "Critical",
    color: "#DC143C",
    description: "Immediate need (within 2 hours)",
  },
  {
    id: "urgent",
    label: "Urgent",
    color: "#FFA500",
    description: "Needed within 24 hours",
  },
  {
    id: "scheduled",
    label: "Scheduled",
    color: "#22C55E",
    description: "Planned procedure (within 1 week)",
  },
];

export default function RequestBloodScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [requestData, setRequestData] = useState({
    bloodType: "",
    urgency: "",
    patientName: "",
    relationship: "self", // 'self' or 'other'
    hospital: "",
    contactPhone: "",
    additionalInfo: "",
    unitsNeeded: "1",
  });
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field, value) => {
    setRequestData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitRequest = async () => {
    if (
      !requestData.bloodType ||
      !requestData.urgency ||
      !requestData.hospital ||
      !requestData.contactPhone
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Simulate request submission
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Request Submitted!",
        "Your blood request has been submitted to the network. Compatible donors in your area will be notified.",
        [{ text: "OK", onPress: () => router.push("/(tabs)") }],
      );
    }, 2000);
  };

  const isFormValid =
    requestData.bloodType &&
    requestData.urgency &&
    requestData.hospital &&
    requestData.contactPhone;

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
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

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            marginBottom: 30,
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
            Request Blood
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
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
              marginBottom: 40,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                marginBottom: 20,
                padding: 20,
                borderRadius: 60,
                backgroundColor: "rgba(255, 165, 0, 0.1)",
                borderWidth: 2,
                borderColor: "rgba(255, 165, 0, 0.3)",
              }}
            >
              <AlertCircle size={40} color="#FFA500" />
            </View>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#FFFFFF",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Submit Blood Request
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Connect with verified donors in your area through our
              decentralized network
            </Text>
          </MotiView>

          {/* Form Fields */}
          <View style={{ paddingHorizontal: 20 }}>
            {/* Request For */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 200,
                duration: 600,
              }}
              style={{ marginBottom: 25 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  marginBottom: 15,
                }}
              >
                Requesting For *
              </Text>
              <View style={{ flexDirection: "row" }}>
                {[
                  { id: "self", label: "Myself" },
                  { id: "other", label: "Someone Else" },
                ].map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() => handleInputChange("relationship", option.id)}
                    style={{
                      backgroundColor:
                        requestData.relationship === option.id
                          ? "#8A2BE2"
                          : "rgba(255, 255, 255, 0.05)",
                      borderRadius: 12,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      marginRight: 15,
                      borderWidth: 1,
                      borderColor:
                        requestData.relationship === option.id
                          ? "#8A2BE2"
                          : "rgba(255, 255, 255, 0.1)",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <User
                      size={16}
                      color={
                        requestData.relationship === option.id
                          ? "#FFFFFF"
                          : "#8A2BE2"
                      }
                    />
                    <Text
                      style={{
                        color:
                          requestData.relationship === option.id
                            ? "#FFFFFF"
                            : "#FFFFFF",
                        fontWeight: "600",
                        marginLeft: 8,
                      }}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </MotiView>

            {/* Patient Name */}
            {requestData.relationship === "other" && (
              <MotiView
                from={{ translateX: -50, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{
                  type: "timing",
                  delay: 300,
                  duration: 600,
                }}
                style={{ marginBottom: 20 }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}
                >
                  Patient Name *
                </Text>
                <TextInput
                  value={requestData.patientName}
                  onChangeText={(value) =>
                    handleInputChange("patientName", value)
                  }
                  placeholder="Enter patient's full name"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 12,
                    padding: 16,
                    fontSize: 16,
                    color: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </MotiView>
            )}

            {/* Blood Type */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 400,
                duration: 600,
              }}
              style={{ marginBottom: 25 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}
              >
                Blood Type Needed *
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 10 }}
              >
                <View style={{ flexDirection: "row", paddingRight: 20 }}>
                  {bloodTypes.map((type) => (
                    <Pressable
                      key={type}
                      onPress={() => handleInputChange("bloodType", type)}
                      style={{
                        backgroundColor:
                          requestData.bloodType === type
                            ? "#DC143C"
                            : "rgba(255, 255, 255, 0.05)",
                        borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor:
                          requestData.bloodType === type
                            ? "#DC143C"
                            : "rgba(255, 255, 255, 0.1)",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Droplet
                        size={16}
                        color={
                          requestData.bloodType === type ? "#FFFFFF" : "#DC143C"
                        }
                      />
                      <Text
                        style={{
                          color:
                            requestData.bloodType === type
                              ? "#FFFFFF"
                              : "#FFFFFF",
                          fontWeight: "600",
                          marginLeft: 5,
                        }}
                      >
                        {type}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </MotiView>

            {/* Units Needed */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 500,
                duration: 600,
              }}
              style={{ marginBottom: 25 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}
              >
                Units Needed
              </Text>
              <TextInput
                value={requestData.unitsNeeded}
                onChangeText={(value) =>
                  handleInputChange("unitsNeeded", value)
                }
                placeholder="Number of units"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                keyboardType="numeric"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  color: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </MotiView>

            {/* Urgency Level */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 600,
                duration: 600,
              }}
              style={{ marginBottom: 25 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  marginBottom: 15,
                }}
              >
                Urgency Level *
              </Text>
              {urgencyLevels.map((level) => (
                <Pressable
                  key={level.id}
                  onPress={() => handleInputChange("urgency", level.id)}
                  style={{
                    backgroundColor:
                      requestData.urgency === level.id
                        ? `${level.color}20`
                        : "rgba(255, 255, 255, 0.03)",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor:
                      requestData.urgency === level.id
                        ? `${level.color}50`
                        : "rgba(255, 255, 255, 0.1)",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: level.color,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#FFFFFF",
                        marginBottom: 2,
                      }}
                    >
                      {level.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {level.description}
                    </Text>
                  </View>
                  {requestData.urgency === level.id && (
                    <CheckCircle size={20} color={level.color} />
                  )}
                </Pressable>
              ))}
            </MotiView>

            {/* Hospital/Location */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 700,
                duration: 600,
              }}
              style={{ marginBottom: 20 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}
              >
                Hospital/Medical Facility *
              </Text>
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <MapPin size={20} color="#8A2BE2" />
                <TextInput
                  value={requestData.hospital}
                  onChangeText={(value) => handleInputChange("hospital", value)}
                  placeholder="Hospital name and address"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  style={{
                    flex: 1,
                    padding: 16,
                    fontSize: 16,
                    color: "#FFFFFF",
                    marginLeft: 10,
                  }}
                />
              </View>
            </MotiView>

            {/* Contact Phone */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 800,
                duration: 600,
              }}
              style={{ marginBottom: 20 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}
              >
                Contact Phone *
              </Text>
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <Phone size={20} color="#22C55E" />
                <TextInput
                  value={requestData.contactPhone}
                  onChangeText={(value) =>
                    handleInputChange("contactPhone", value)
                  }
                  placeholder="Emergency contact number"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  keyboardType="phone-pad"
                  style={{
                    flex: 1,
                    padding: 16,
                    fontSize: 16,
                    color: "#FFFFFF",
                    marginLeft: 10,
                  }}
                />
              </View>
            </MotiView>

            {/* Additional Information */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 900,
                duration: 600,
              }}
              style={{ marginBottom: 40 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}
              >
                Additional Information
              </Text>
              <TextInput
                value={requestData.additionalInfo}
                onChangeText={(value) =>
                  handleInputChange("additionalInfo", value)
                }
                placeholder="Any additional details about the request..."
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                multiline
                numberOfLines={4}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  color: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  textAlignVertical: "top",
                  minHeight: 100,
                }}
              />
            </MotiView>

            {/* Important Notice */}
            <MotiView
              from={{ translateY: 30, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 1000,
                duration: 600,
              }}
              style={{
                backgroundColor: "rgba(255, 165, 0, 0.1)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 30,
                borderWidth: 1,
                borderColor: "rgba(255, 165, 0, 0.2)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <AlertCircle size={20} color="#FFA500" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginLeft: 10,
                  }}
                >
                  Important Notice
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 20,
                }}
              >
                Your request will be broadcast to verified donors in your area.
                All donations are tracked on-chain for transparency and safety.
                Emergency requests are prioritized automatically.
              </Text>
            </MotiView>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + 20,
            paddingTop: 20,
            backgroundColor: "rgba(13, 13, 13, 0.95)",
          }}
        >
          <MotiView
            from={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              delay: 1100,
            }}
          >
            <Pressable
              onPress={handleSubmitRequest}
              disabled={!isFormValid || loading}
              style={{
                backgroundColor: isFormValid
                  ? "#FFA500"
                  : "rgba(255, 165, 0, 0.3)",
                paddingVertical: 18,
                paddingHorizontal: 40,
                borderRadius: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#FFA500",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: isFormValid ? 0.3 : 0,
                shadowRadius: 20,
                elevation: isFormValid ? 8 : 0,
              }}
            >
              {loading ? (
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
                      borderColor: "#FFFFFF",
                      borderTopColor: "transparent",
                    }}
                  />
                </MotiView>
              ) : (
                <>
                  <Send size={20} color="#FFFFFF" />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginLeft: 10,
                    }}
                  >
                    Submit Request
                  </Text>
                </>
              )}
            </Pressable>
          </MotiView>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
