import { Tabs } from "expo-router";
import { Heart, User, Activity, Settings, Plus, Droplets } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#0D0D0D",
                    borderTopWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 90,
                },
                tabBarActiveTintColor: "#DC143C",
                tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size }) => <Heart color={color} size={24} />,
                }}
            />

            <Tabs.Screen
                name="donate"
                options={{
                    title: "Donate",
                    tabBarIcon: ({ color, size }) => <Plus color={color} size={24} />,
                }}
            />

            <Tabs.Screen
                name="requests"
                options={{
                    title: "Requests",
                    tabBarIcon: ({ color, size }) => <Droplets color={color} size={24} />,
                }}
            />

            <Tabs.Screen
                name="activity"
                options={{
                    title: "Activity",
                    tabBarIcon: ({ color, size }) => <Activity color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <User color={color} size={24} />,
                }}
            />
        </Tabs>
    );
}