import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
    ArrowLeft,
    Bell,
    Droplet,
    Heart,
    AlertCircle,
    CheckCircle,
    Clock,
    MapPin,
    Users,
    Award,
    Shield,
    Trash2,
} from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/utils/localization";

// Mock notifications data
const notificationsData = [
    {
        id: 1,
        type: "urgent_request",
        title: "Urgent Blood Request Nearby",
        message: "Critical need for O+ blood at City General Hospital, 2.3km away",
        time: "5 minutes ago",
        read: false,
        icon: AlertCircle,
        color: "#DC143C",
        action: {
            type: "navigate",
            route: "/urgent-request/1"
        }
    },
    {
        id: 2,
        type: "donation_success",
        title: "Donation Successfully Recorded",
        message: "Your blood donation from January 12th has been verified and recorded on blockchain",
        time: "2 hours ago",
        read: false,
        icon: CheckCircle,
        color: "#22C55E",
        action: {
            type: "navigate",
            route: "/activity"
        }
    },
    {
        id: 3,
        type: "impact_update",
        title: "Impact Milestone Reached!",
        message: "You've helped save 12 lives. Thank you for your contributions!",
        time: "1 day ago",
        read: true,
        icon: Award,
        color: "#8A2BE2",
        action: {
            type: "navigate",
            route: "/profile"
        }
    },
    {
        id: 4,
        type: "matching_request",
        title: "New Matching Blood Request",
        message: "3 patients with O+ blood type need donations in your area",
        time: "1 day ago",
        read: true,
        icon: Droplet,
        color: "#3B82F6",
        action: {
            type: "navigate",
            route: "/requests"
        }
    },
    {
        id: 5,
        type: "verification",
        title: "Profile Verified",
        message: "Your donor profile has been successfully verified",
        time: "2 days ago",
        read: true,
        icon: Shield,
        color: "#10B981",
        action: {
            type: "navigate",
            route: "/profile"
        }
    },
    {
        id: 6,
        type: "community",
        title: "Welcome to BloodChain Community!",
        message: "Join 5,000+ donors making a difference in your city",
        time: "3 days ago",
        read: true,
        icon: Users,
        color: "#F59E0B",
        action: {
            type: "navigate",
            route: "/community"
        }
    }
];

export default function NotificationsScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { theme, language } = useApp();
    const [notifications, setNotifications] = useState(notificationsData);
    const [refreshing, setRefreshing] = useState(false);

    const t = (key) => getTranslation(key, language);

    const handleBack = () => {
        router.back();
    };

    const handleNotificationPress = (notification) => {
        // Mark as read
        setNotifications(prev =>
            prev.map(n =>
                n.id === notification.id ? { ...n, read: true } : n
            )
        );

        // Navigate if there's an action
        if (notification.action?.type === "navigate") {
            router.push(notification.action.route);
        }
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleDeleteNotification = (id, event) => {
        event.stopPropagation(); // Prevent triggering the press event
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false);
            // In a real app, you would fetch new notifications here
        }, 1000);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

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
                            Notifications
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: theme.text.secondary,
                                marginTop: 2,
                            }}
                        >
                            {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
                        </Text>
                    </View>
                </View>

                {notifications.length > 0 && (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Pressable
                            onPress={handleMarkAllAsRead}
                            style={{
                                padding: 8,
                                borderRadius: 12,
                                backgroundColor: theme.surface.secondary,
                                borderWidth: 1,
                                borderColor: theme.surface.border,
                                marginRight: 8,
                            }}
                        >
                            <CheckCircle size={18} color={theme.brand.secondary} />
                        </Pressable>
                        <Pressable
                            onPress={handleClearAll}
                            style={{
                                padding: 8,
                                borderRadius: 12,
                                backgroundColor: theme.surface.secondary,
                                borderWidth: 1,
                                borderColor: theme.surface.border,
                            }}
                        >
                            <Trash2 size={18} color={theme.brand.primary} />
                        </Pressable>
                    </View>
                )}
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.brand.primary}
                    />
                }
            >
                {notifications.length === 0 ? (
                    <MotiView
                        from={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "timing", duration: 500 }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 80,
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
                            <Bell size={32} color={theme.brand.secondary} />
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
                            No Notifications
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: theme.text.secondary,
                                textAlign: "center",
                                lineHeight: 20,
                            }}
                        >
                            You're all caught up! We'll notify you when there's new activity.
                        </Text>
                    </MotiView>
                ) : (
                    <View style={{ paddingHorizontal: 20 }}>
                        {notifications.map((notification, index) => (
                            <MotiView
                                key={notification.id}
                                from={{ translateY: 50, opacity: 0 }}
                                animate={{ translateY: 0, opacity: 1 }}
                                transition={{ type: "timing", delay: index * 100, duration: 500 }}
                                style={{ marginBottom: 12 }}
                            >
                                <Pressable
                                    onPress={() => handleNotificationPress(notification)}
                                    style={{
                                        backgroundColor: notification.read
                                            ? theme.surface.primary
                                            : `${theme.brand.primary}10`,
                                        borderRadius: 16,
                                        padding: 16,
                                        borderWidth: 1,
                                        borderColor: notification.read
                                            ? theme.surface.border
                                            : `${theme.brand.primary}30`,
                                        borderLeftWidth: 4,
                                        borderLeftColor: notification.color,
                                    }}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                                        <View
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                backgroundColor: `${notification.color}20`,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: 12,
                                            }}
                                        >
                                            <notification.icon size={20} color={notification.color} />
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: "600",
                                                        color: theme.text.primary,
                                                        flex: 1,
                                                    }}
                                                    numberOfLines={1}
                                                >
                                                    {notification.title}
                                                </Text>
                                                {!notification.read && (
                                                    <View
                                                        style={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: 4,
                                                            backgroundColor: theme.brand.primary,
                                                            marginLeft: 8,
                                                        }}
                                                    />
                                                )}
                                            </View>

                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: theme.text.secondary,
                                                    lineHeight: 20,
                                                    marginBottom: 8,
                                                }}
                                                numberOfLines={2}
                                            >
                                                {notification.message}
                                            </Text>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Clock size={12} color={theme.text.tertiary} />
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: theme.text.tertiary,
                                                            marginLeft: 4,
                                                        }}
                                                    >
                                                        {notification.time}
                                                    </Text>
                                                </View>

                                                <Pressable
                                                    onPress={(e) => handleDeleteNotification(notification.id, e)}
                                                    style={{
                                                        padding: 4,
                                                        borderRadius: 6,
                                                    }}
                                                >
                                                    <Trash2 size={14} color={theme.text.tertiary} />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            </MotiView>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}