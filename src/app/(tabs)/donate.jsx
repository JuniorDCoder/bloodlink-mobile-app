import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
  Heart,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  Star,
  Navigation,
  Phone,
  Info,
  Award,
} from "lucide-react-native";

export default function DonateScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [bookingStep, setBookingStep] = useState("centers"); // 'centers', 'booking', 'confirmation'

  // Mock donation centers
  const donationCenters = [
    {
      id: 1,
      name: "City Blood Center",
      address: "123 Main St, Downtown",
      distance: "1.2 km",
      rating: 4.8,
      openHours: "8:00 AM - 6:00 PM",
      nextSlot: "Today 2:30 PM",
      verified: true,
      urgentNeeds: ["O+", "AB-"],
    },
    {
      id: 2,
      name: "Metro Health Donation Center",
      address: "456 Health Ave, Midtown",
      distance: "2.8 km",
      rating: 4.6,
      openHours: "9:00 AM - 5:00 PM",
      nextSlot: "Tomorrow 10:00 AM",
      verified: true,
      urgentNeeds: ["O-", "A+"],
    },
    {
      id: 3,
      name: "Community Blood Bank",
      address: "789 Care Blvd, Uptown",
      distance: "4.1 km",
      rating: 4.9,
      openHours: "7:00 AM - 7:00 PM",
      nextSlot: "Today 4:00 PM",
      verified: true,
      urgentNeeds: ["B+", "AB+"],
    },
  ];

  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
    setBookingStep("booking");
  };

  const handleBookAppointment = () => {
    setBookingStep("confirmation");

    // Simulate booking confirmation
    setTimeout(() => {
      Alert.alert(
        "Appointment Booked!",
        "Your donation appointment has been confirmed. You will receive a reminder notification.",
        [{ text: "OK", onPress: () => router.push("/(tabs)") }],
      );
    }, 2000);
  };

  const renderCenters = () => (
    <View>
      {/* Header */}
      <MotiView
        from={{ translateY: 30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          type: "timing",
          duration: 600,
        }}
        style={{
          alignItems: "center",
          marginBottom: 30,
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
          <Heart size={40} color="#DC143C" />
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
          Find Donation Centers
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
            lineHeight: 22,
          }}
        >
          Choose a verified center near you to schedule your blood donation
        </Text>
      </MotiView>

      {/* Centers List */}
      <View style={{ paddingHorizontal: 20 }}>
        {donationCenters.map((center, index) => (
          <MotiView
            key={center.id}
            from={{ translateX: -50, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
              type: "timing",
              delay: 200 + index * 100,
              duration: 600,
            }}
            style={{ marginBottom: 20 }}
          >
            <Pressable
              onPress={() => handleSelectCenter(center)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Header Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
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
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        marginRight: 10,
                      }}
                    >
                      {center.name}
                    </Text>
                    {center.verified && (
                      <CheckCircle size={16} color="#22C55E" />
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Star size={14} color="#FFA500" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#FFA500",
                        marginLeft: 5,
                        marginRight: 15,
                      }}
                    >
                      {center.rating}
                    </Text>
                    <MapPin size={14} color="rgba(255, 255, 255, 0.6)" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "rgba(255, 255, 255, 0.6)",
                        marginLeft: 5,
                      }}
                    >
                      {center.distance}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 14,
                      color: "rgba(255, 255, 255, 0.7)",
                      marginBottom: 10,
                    }}
                  >
                    {center.address}
                  </Text>
                </View>
              </View>

              {/* Info Row */}
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
                    <Clock size={14} color="#8A2BE2" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(255, 255, 255, 0.6)",
                        marginLeft: 5,
                      }}
                    >
                      Open Hours
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                      fontWeight: "600",
                    }}
                  >
                    {center.openHours}
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
                    <Calendar size={14} color="#DC143C" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(255, 255, 255, 0.6)",
                        marginLeft: 5,
                      }}
                    >
                      Next Available
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#DC143C",
                      fontWeight: "600",
                    }}
                  >
                    {center.nextSlot}
                  </Text>
                </View>
              </View>

              {/* Urgent Needs */}
              {center.urgentNeeds.length > 0 && (
                <View
                  style={{
                    backgroundColor: "rgba(220, 20, 60, 0.1)",
                    borderRadius: 8,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: "rgba(220, 20, 60, 0.2)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.7)",
                      marginBottom: 5,
                    }}
                  >
                    Urgent Need:
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {center.urgentNeeds.map((bloodType, idx) => (
                      <View
                        key={idx}
                        style={{
                          backgroundColor: "#DC143C",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 12,
                          marginRight: 8,
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#FFFFFF",
                            fontWeight: "600",
                          }}
                        >
                          {bloodType}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </Pressable>
          </MotiView>
        ))}
      </View>
    </View>
  );

  const renderBooking = () => (
    <View style={{ paddingHorizontal: 20 }}>
      {/* Header */}
      <MotiView
        from={{ translateY: 30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          type: "timing",
          duration: 600,
        }}
        style={{
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Book Appointment
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
          }}
        >
          {selectedCenter?.name}
        </Text>
      </MotiView>

      {/* Selected Center Info */}
      <MotiView
        from={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "timing",
          delay: 200,
          duration: 600,
        }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
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
          Appointment Details
        </Text>

        <View style={{ marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: 5,
            }}
          >
            Date & Time
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#DC143C",
              fontWeight: "600",
            }}
          >
            {selectedCenter?.nextSlot}
          </Text>
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: 5,
            }}
          >
            Location
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            {selectedCenter?.address}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(138, 43, 226, 0.1)",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "rgba(138, 43, 226, 0.3)",
            }}
          >
            <Navigation size={16} color="#8A2BE2" />
            <Text
              style={{
                fontSize: 14,
                color: "#8A2BE2",
                marginLeft: 5,
                fontWeight: "600",
              }}
            >
              Directions
            </Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "rgba(34, 197, 94, 0.3)",
            }}
          >
            <Phone size={16} color="#22C55E" />
            <Text
              style={{
                fontSize: 14,
                color: "#22C55E",
                marginLeft: 5,
                fontWeight: "600",
              }}
            >
              Call Center
            </Text>
          </Pressable>
        </View>
      </MotiView>

      {/* Pre-Donation Checklist */}
      <MotiView
        from={{ translateY: 30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          type: "timing",
          delay: 400,
          duration: 600,
        }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 30,
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
          <Info size={20} color="#8A2BE2" />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginLeft: 10,
            }}
          >
            Pre-Donation Checklist
          </Text>
        </View>

        {[
          "Eat a healthy meal 3 hours before donation",
          "Drink plenty of water (16 oz recommended)",
          "Get a good night's sleep",
          "Bring a valid ID and donation card",
          "Avoid alcohol 24 hours before donation",
        ].map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <CheckCircle size={16} color="#22C55E" style={{ marginTop: 2 }} />
            <Text
              style={{
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.7)",
                marginLeft: 10,
                flex: 1,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </MotiView>

      {/* Blockchain Reward Info */}
      <MotiView
        from={{ translateY: 30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          type: "timing",
          delay: 600,
          duration: 600,
        }}
        style={{
          backgroundColor: "rgba(138, 43, 226, 0.1)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "rgba(138, 43, 226, 0.2)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Award size={20} color="#8A2BE2" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginLeft: 10,
            }}
          >
            Blockchain Rewards
          </Text>
        </View>

        <Text
          style={{
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 20,
          }}
        >
          This donation will be recorded on-chain and you'll earn verified donor
          badges. Your contribution will be permanently tracked for transparency
          and impact measurement.
        </Text>
      </MotiView>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <Pressable
          onPress={() => setBookingStep("centers")}
          style={{
            flex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 16,
            padding: 18,
            alignItems: "center",
            marginRight: 10,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            Back
          </Text>
        </Pressable>

        <Pressable
          onPress={handleBookAppointment}
          style={{
            flex: 2,
            backgroundColor: "#DC143C",
            borderRadius: 16,
            padding: 18,
            alignItems: "center",
            marginLeft: 10,
            shadowColor: "#DC143C",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            Confirm Appointment
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderConfirmation = () => (
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
          Appointment Confirmed!
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
            lineHeight: 22,
          }}
        >
          Your donation appointment has been booked. You'll receive a
          confirmation and reminder notifications.
        </Text>
      </MotiView>
    </View>
  );

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
        contentContainerStyle={{
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 100,
          flexGrow: bookingStep === "confirmation" ? 1 : 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        {bookingStep === "centers" && renderCenters()}
        {bookingStep === "booking" && renderBooking()}
        {bookingStep === "confirmation" && renderConfirmation()}
      </ScrollView>
    </View>
  );
}
