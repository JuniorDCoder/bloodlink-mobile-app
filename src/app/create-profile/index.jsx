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
  User,
  Droplet,
  Calendar,
  MapPin,
  Camera,
  CheckCircle,
} from "lucide-react-native";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CreateProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    age: "",
    location: "",
    emergencyContact: "",
  });
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateProfile = async () => {
    if (!formData.name || !formData.bloodType || !formData.age) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Simulate profile creation
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)");
    }, 2000);
  };

  const isFormValid = formData.name && formData.bloodType && formData.age;

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
            Create Profile
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
                backgroundColor: "rgba(220, 20, 60, 0.1)",
                borderWidth: 2,
                borderColor: "rgba(220, 20, 60, 0.3)",
              }}
            >
              <User size={40} color="#DC143C" />
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
              Complete Your Profile
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
              Help us create your donor profile to connect you with those in
              need
            </Text>
          </MotiView>

          {/* Profile Photo Section */}
          <MotiView
            from={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "timing",
              delay: 200,
              duration: 600,
            }}
            style={{
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Pressable
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: 2,
                borderColor: "rgba(138, 43, 226, 0.3)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 15,
              }}
            >
              <Camera size={30} color="#8A2BE2" />
            </Pressable>

            <Text
              style={{
                fontSize: 14,
                color: "#8A2BE2",
                fontWeight: "600",
              }}
            >
              Add Profile Photo
            </Text>
          </MotiView>

          {/* Form Fields */}
          <View style={{ paddingHorizontal: 20 }}>
            {/* Name Field */}
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
                Full Name *
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                placeholder="Enter your full name"
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

            {/* Blood Type Field */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 400,
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
                Blood Type *
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
                          formData.bloodType === type
                            ? "#DC143C"
                            : "rgba(255, 255, 255, 0.05)",
                        borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor:
                          formData.bloodType === type
                            ? "#DC143C"
                            : "rgba(255, 255, 255, 0.1)",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Droplet
                        size={16}
                        color={
                          formData.bloodType === type ? "#FFFFFF" : "#DC143C"
                        }
                      />
                      <Text
                        style={{
                          color:
                            formData.bloodType === type ? "#FFFFFF" : "#FFFFFF",
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

            {/* Age Field */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 500,
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
                Age *
              </Text>
              <TextInput
                value={formData.age}
                onChangeText={(value) => handleInputChange("age", value)}
                placeholder="Enter your age"
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

            {/* Location Field */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 600,
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
                Location
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
                  value={formData.location}
                  onChangeText={(value) => handleInputChange("location", value)}
                  placeholder="City, State"
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

            {/* Emergency Contact Field */}
            <MotiView
              from={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 700,
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
                Emergency Contact
              </Text>
              <TextInput
                value={formData.emergencyContact}
                onChangeText={(value) =>
                  handleInputChange("emergencyContact", value)
                }
                placeholder="Phone number"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                keyboardType="phone-pad"
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

            {/* Privacy Notice */}
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
                padding: 16,
                marginBottom: 30,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  opacity: 0.7,
                  lineHeight: 20,
                  textAlign: "center",
                }}
              >
                Your personal information is encrypted and stored securely on
                the blockchain. You control who can access your data.
              </Text>
            </MotiView>
          </View>
        </ScrollView>

        {/* Bottom Button */}
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
              delay: 900,
            }}
          >
            <Pressable
              onPress={handleCreateProfile}
              disabled={!isFormValid || loading}
              style={{
                backgroundColor: isFormValid
                  ? "#DC143C"
                  : "rgba(220, 20, 60, 0.3)",
                paddingVertical: 18,
                paddingHorizontal: 40,
                borderRadius: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#DC143C",
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
                  <CheckCircle size={20} color="#FFFFFF" />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginLeft: 10,
                    }}
                  >
                    Create Profile
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
