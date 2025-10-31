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
  MapPin,
  Phone,
  Mail,
  Calendar,
  Camera,
  Save,
  CheckCircle,
} from "lucide-react-native";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Initialize with current user data (in real app, this would come from state/context)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bloodType: "O+",
    age: "28",
    location: "San Francisco, CA",
    emergencyContact: "+1 (555) 987-6543",
    medicalConditions: "",
    allergies: "",
  });
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!profileData.name || !profileData.email || !profileData.bloodType) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Simulate profile update
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Profile Updated!",
        "Your profile has been successfully updated.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    }, 2000);
  };

  const isFormValid =
    profileData.name && profileData.email && profileData.bloodType;

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
            Edit Profile
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
                backgroundColor: "rgba(138, 43, 226, 0.1)",
                borderWidth: 2,
                borderColor: "rgba(138, 43, 226, 0.3)",
              }}
            >
              <User size={40} color="#8A2BE2" />
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
              Update Your Profile
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Keep your information up to date for better donor matching
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
                fontSize: 14,
                color: "#8A2BE2",
                fontWeight: "600",
              }}
            >
              Change Photo
            </Text>
          </MotiView>

          {/* Form Fields */}
          <View style={{ paddingHorizontal: 20 }}>
            {/* Basic Information Section */}
            <MotiView
              from={{ translateY: 30, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 300,
                duration: 600,
              }}
              style={{ marginBottom: 30 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginBottom: 20,
                }}
              >
                Basic Information
              </Text>

              {/* Name Field */}
              <View style={{ marginBottom: 20 }}>
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
                  value={profileData.name}
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
              </View>

              {/* Email Field */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}
                >
                  Email Address *
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
                  <Mail size={20} color="#8A2BE2" />
                  <TextInput
                    value={profileData.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    placeholder="your.email@example.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    style={{
                      flex: 1,
                      padding: 16,
                      fontSize: 16,
                      color: "#FFFFFF",
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>

              {/* Phone Field */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}
                >
                  Phone Number
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
                    value={profileData.phone}
                    onChangeText={(value) => handleInputChange("phone", value)}
                    placeholder="+1 (555) 123-4567"
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
              </View>

              {/* Age Field */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}
                >
                  Age
                </Text>
                <TextInput
                  value={profileData.age}
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
              </View>

              {/* Location Field */}
              <View style={{ marginBottom: 20 }}>
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
                    value={profileData.location}
                    onChangeText={(value) =>
                      handleInputChange("location", value)
                    }
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
              </View>
            </MotiView>

            {/* Medical Information Section */}
            <MotiView
              from={{ translateY: 30, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 500,
                duration: 600,
              }}
              style={{ marginBottom: 30 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginBottom: 20,
                }}
              >
                Medical Information
              </Text>

              {/* Blood Type Field */}
              <View style={{ marginBottom: 20 }}>
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
                            profileData.bloodType === type
                              ? "#DC143C"
                              : "rgba(255, 255, 255, 0.05)",
                          borderRadius: 20,
                          paddingVertical: 10,
                          paddingHorizontal: 16,
                          marginRight: 10,
                          borderWidth: 1,
                          borderColor:
                            profileData.bloodType === type
                              ? "#DC143C"
                              : "rgba(255, 255, 255, 0.1)",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Droplet
                          size={16}
                          color={
                            profileData.bloodType === type
                              ? "#FFFFFF"
                              : "#DC143C"
                          }
                        />
                        <Text
                          style={{
                            color:
                              profileData.bloodType === type
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
              </View>

              {/* Medical Conditions */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}
                >
                  Medical Conditions
                </Text>
                <TextInput
                  value={profileData.medicalConditions}
                  onChangeText={(value) =>
                    handleInputChange("medicalConditions", value)
                  }
                  placeholder="List any medical conditions..."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  multiline
                  numberOfLines={3}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 12,
                    padding: 16,
                    fontSize: 16,
                    color: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    textAlignVertical: "top",
                    minHeight: 80,
                  }}
                />
              </View>

              {/* Allergies */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}
                >
                  Allergies
                </Text>
                <TextInput
                  value={profileData.allergies}
                  onChangeText={(value) =>
                    handleInputChange("allergies", value)
                  }
                  placeholder="List any allergies..."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  multiline
                  numberOfLines={3}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 12,
                    padding: 16,
                    fontSize: 16,
                    color: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    textAlignVertical: "top",
                    minHeight: 80,
                  }}
                />
              </View>
            </MotiView>

            {/* Emergency Contact Section */}
            <MotiView
              from={{ translateY: 30, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 700,
                duration: 600,
              }}
              style={{ marginBottom: 40 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginBottom: 20,
                }}
              >
                Emergency Contact
              </Text>

              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}
                >
                  Emergency Contact Phone
                </Text>
                <TextInput
                  value={profileData.emergencyContact}
                  onChangeText={(value) =>
                    handleInputChange("emergencyContact", value)
                  }
                  placeholder="Emergency contact number"
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
              </View>
            </MotiView>

            {/* Privacy Notice */}
            <MotiView
              from={{ translateY: 30, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{
                type: "timing",
                delay: 900,
                duration: 600,
              }}
              style={{
                backgroundColor: "rgba(138, 43, 226, 0.1)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 30,
                borderWidth: 1,
                borderColor: "rgba(138, 43, 226, 0.2)",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 20,
                  textAlign: "center",
                }}
              >
                Your updated information will be encrypted and stored securely
                on the blockchain. You maintain full control over your data
                privacy settings.
              </Text>
            </MotiView>
          </View>
        </ScrollView>

        {/* Save Button */}
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
              delay: 1000,
            }}
          >
            <Pressable
              onPress={handleSaveProfile}
              disabled={!isFormValid || loading}
              style={{
                backgroundColor: isFormValid
                  ? "#8A2BE2"
                  : "rgba(138, 43, 226, 0.3)",
                paddingVertical: 18,
                paddingHorizontal: 40,
                borderRadius: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#8A2BE2",
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
                  <Save size={20} color="#FFFFFF" />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginLeft: 10,
                    }}
                  >
                    Save Changes
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
