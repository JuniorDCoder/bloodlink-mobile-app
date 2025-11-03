import React, { useState, useEffect } from "react";
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
import { useRouter } from "expo-router";
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
    Filter,
} from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/utils/localization";

// Mock data for blood requests matching user's blood group
const bloodRequestsData = [
    {
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
        description: "Patient requires immediate blood transfusion for emergency cardiac surgery.",
        requesterType: "Medical Facility",
        verificationLevel: "Verified Hospital",
        estimatedArrivalTime: "15-20 minutes",
        compensation: "Standard donation benefits apply",
        timestamp: "2024-01-15T10:30:00Z"
    },
    {
        id: 2,
        bloodType: "O+",
        hospital: "Metro Medical Center",
        hospitalAddress: "456 Healthcare Ave, San Francisco, CA 94103",
        distance: "5.1 km",
        urgency: "Urgent",
        timeLeft: "12 hours",
        unitsNeeded: 2,
        patientAge: 28,
        condition: "Post-Accident Care",
        contactPhone: "+1 (555) 987-6543",
        description: "Young adult requires blood transfusion following traffic accident.",
        requesterType: "Emergency Department",
        verificationLevel: "Verified Medical Center",
        estimatedArrivalTime: "25-30 minutes",
        compensation: "Express processing + priority scheduling",
        timestamp: "2024-01-15T08:15:00Z"
    },
    {
        id: 3,
        bloodType: "O+",
        hospital: "Children's Medical Institute",
        hospitalAddress: "789 Pediatric Way, San Francisco, CA 94104",
        distance: "3.7 km",
        urgency: "High",
        timeLeft: "24 hours",
        unitsNeeded: 1,
        patientAge: 8,
        condition: "Pediatric Leukemia Treatment",
        contactPhone: "+1 (555) 456-7890",
        description: "Child undergoing chemotherapy requires platelet transfusion.",
        requesterType: "Pediatric Oncology",
        verificationLevel: "Verified Specialist",
        estimatedArrivalTime: "20-25 minutes",
        compensation: "Child donor program benefits",
        timestamp: "2024-01-15T14:20:00Z"
    },
    {
        id: 4,
        bloodType: "O+",
        hospital: "Community Health Center",
        hospitalAddress: "321 Wellness St, San Francisco, CA 94105",
        distance: "7.2 km",
        urgency: "Medium",
        timeLeft: "48 hours",
        unitsNeeded: 2,
        patientAge: 62,
        condition: "Chronic Anemia",
        contactPhone: "+1 (555) 234-5678",
        description: "Elderly patient with chronic condition requires regular transfusion.",
        requesterType: "Hematology Department",
        verificationLevel: "Verified Clinic",
        estimatedArrivalTime: "35-40 minutes",
        compensation: "Regular donor program",
        timestamp: "2024-01-14T16:45:00Z"
    }
];

export default function BloodRequestsScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { theme, language, userProfile } = useApp();
    const [filter, setFilter] = useState("all");
    const [filteredRequests, setFilteredRequests] = useState(bloodRequestsData);

    const t = (key) => getTranslation(key, language);

    // Mock user blood group - in real app, this would come from user profile
    const userBloodGroup = "O+";

    useEffect(() => {
        // Filter requests based on selected filter
        let filtered = bloodRequestsData;

        if (filter === "critical") {
            filtered = bloodRequestsData.filter(req => req.urgency === "Critical");
        } else if (filter === "urgent") {
            filtered = bloodRequestsData.filter(req => req.urgency === "Urgent");
        } else if (filter === "nearby") {
            filtered = bloodRequestsData.filter(req => parseFloat(req.distance) <= 5.0);
        }

        setFilteredRequests(filtered);
    }, [filter]);

    const handleBack = () => {
        router.back();
    };

    const handleRequestPress = (requestId) => {
        router.push(`/urgent-request-detail?id=${requestId}`);
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "Critical":
                return theme.brand.primary;
            case "Urgent":
                return theme.brand.warning;
            case "High":
                return "#FFA500";
            default:
                return theme.brand.secondary;
        }
    };

    const getUrgencyBgColor = (urgency) => {
        const color = getUrgencyColor(urgency);
        return `${color}20`;
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);

        if (diffMins < 60) {
            return `${diffMins}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else {
            return `${Math.floor(diffHours / 24)}d ago`;
        }
    };

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
                    justifyContent: "space-between",
                    paddingTop: insets.top + 20,
                    paddingHorizontal: 20,
                    marginBottom: 20,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable onPress={handleBack} style={{ marginRight: 20 }}>
                        <ArrowLeft size={24} color={theme.text.primary} />
                    </Pressable>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: theme.text.primary,
                            }}
                        >
                            Blood Requests
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: theme.text.secondary,
                                marginTop: 2,
                            }}
                        >
                            Matching your {userBloodGroup} blood type
                        </Text>
                    </View>
                </View>

                <Pressable
                    onPress={() => {
                        // Show filter options
                        Alert.alert(
                            "Filter Requests",
                            "Choose how to filter requests:",
                            [
                                { text: "All Requests", onPress: () => setFilter("all") },
                                { text: "Critical Only", onPress: () => setFilter("critical") },
                                { text: "Urgent & Critical", onPress: () => setFilter("urgent") },
                                { text: "Nearby (<5km)", onPress: () => setFilter("nearby") },
                                { text: "Cancel", style: "cancel" },
                            ]
                        );
                    }}
                    style={{
                        padding: 8,
                        borderRadius: 12,
                        backgroundColor: theme.surface.secondary,
                        borderWidth: 1,
                        borderColor: theme.surface.border,
                    }}
                >
                    <Filter size={20} color={theme.text.primary} />
                </Pressable>
            </View>

            {/* Request Count */}
            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "timing", duration: 500 }}
                style={{
                    marginHorizontal: 20,
                    marginBottom: 20,
                }}
            >
                <LinearGradient
                    colors={theme.gradient.brand}
                    style={{
                        borderRadius: 16,
                        padding: 16,
                        borderWidth: 1,
                        borderColor: theme.surface.border,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.text.secondary,
                                    marginBottom: 4,
                                }}
                            >
                                Active requests for {userBloodGroup}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    color: theme.text.primary,
                                }}
                            >
                                {filteredRequests.length}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: `${theme.brand.primary}20`,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 2,
                                borderColor: theme.brand.primary,
                            }}
                        >
                            <Droplet size={24} color={theme.brand.primary} />
                        </View>
                    </View>
                </LinearGradient>
            </MotiView>

            {/* Requests List */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                {filteredRequests.map((request, index) => (
                    <MotiView
                        key={request.id}
                        from={{ translateY: 50, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ type: "timing", delay: index * 100, duration: 500 }}
                        style={{
                            marginHorizontal: 20,
                            marginBottom: 16,
                        }}
                    >
                        <Pressable
                            onPress={() => handleRequestPress(request.id)}
                            style={{
                                backgroundColor: theme.surface.primary,
                                borderRadius: 16,
                                padding: 20,
                                borderWidth: 1,
                                borderColor: theme.surface.border,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                elevation: 3,
                            }}
                        >
                            {/* Urgency Badge */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 12,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: getUrgencyBgColor(request.urgency),
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        borderRadius: 20,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <AlertCircle size={14} color={getUrgencyColor(request.urgency)} />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: "600",
                                            color: getUrgencyColor(request.urgency),
                                            marginLeft: 6,
                                        }}
                                    >
                                        {request.urgency}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: theme.text.tertiary,
                                    }}
                                >
                                    {formatTimeAgo(request.timestamp)}
                                </Text>
                            </View>

                            {/* Hospital Info */}
                            <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 12 }}>
                                <MapPin size={16} color={theme.text.secondary} />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: theme.text.secondary,
                                        marginLeft: 8,
                                        flex: 1,
                                    }}
                                    numberOfLines={2}
                                >
                                    {request.hospital}
                                </Text>
                            </View>

                            {/* Condition and Details */}
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: theme.text.primary,
                                    marginBottom: 8,
                                }}
                                numberOfLines={2}
                            >
                                {request.condition}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.text.secondary,
                                    lineHeight: 20,
                                    marginBottom: 12,
                                }}
                                numberOfLines={2}
                            >
                                {request.description}
                            </Text>

                            {/* Footer Info */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Clock size={14} color={theme.text.tertiary} />
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

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <User size={14} color={theme.text.tertiary} />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: theme.text.tertiary,
                                            marginLeft: 4,
                                        }}
                                    >
                                        Age {request.patientAge}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Droplet size={14} color={theme.brand.primary} />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: theme.brand.primary,
                                            fontWeight: "600",
                                            marginLeft: 4,
                                        }}
                                    >
                                        {request.unitsNeeded} unit{request.unitsNeeded > 1 ? 's' : ''}
                                    </Text>
                                </View>
                            </View>

                            {/* Distance */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 12,
                                    paddingTop: 12,
                                    borderTopWidth: 1,
                                    borderTopColor: theme.surface.border,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: theme.text.tertiary,
                                    }}
                                >
                                    {request.distance} away • {request.estimatedArrivalTime} travel
                                </Text>
                            </View>
                        </Pressable>
                    </MotiView>
                ))}

                {filteredRequests.length === 0 && (
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "timing", duration: 500 }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 60,
                            paddingHorizontal: 40,
                        }}
                    >
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: `${theme.brand.secondary}20`,
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 20,
                            }}
                        >
                            <Heart size={32} color={theme.brand.secondary} />
                        </View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: theme.text.primary,
                                textAlign: "center",
                                marginBottom: 8,
                            }}
                        >
                            No Matching Requests
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: theme.text.secondary,
                                textAlign: "center",
                                lineHeight: 20,
                            }}
                        >
                            {filter === "all"
                                ? "There are currently no blood requests matching your blood type."
                                : `No ${filter} requests match your current filters.`}
                        </Text>
                    </MotiView>
                )}
            </ScrollView>
        </View>
    );
}