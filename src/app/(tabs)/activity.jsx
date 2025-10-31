import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import {
  Activity,
  Heart,
  Award,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  ExternalLink,
  TrendingUp,
  Hash,
} from "lucide-react-native";

export default function ActivityScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("donations"); // 'donations', 'blockchain', 'badges'

  // Mock donation history
  const donations = [
    {
      id: 1,
      date: "2024-10-15",
      center: "City Blood Center",
      bloodType: "O+",
      amount: "450ml",
      status: "Verified",
      txHash: "0x742d35cc6bf8b4f8a",
      impact: "Helped 3 patients",
    },
    {
      id: 2,
      date: "2024-08-20",
      center: "Metro Health Center",
      bloodType: "O+",
      amount: "450ml",
      status: "Verified",
      txHash: "0x8a3f21bc9de7c5e2b",
      impact: "Helped 2 patients",
    },
    {
      id: 3,
      date: "2024-06-10",
      center: "Community Blood Bank",
      bloodType: "O+",
      amount: "450ml",
      status: "Verified",
      txHash: "0x5c9e84af2b1d6f3a8",
      impact: "Helped 4 patients",
    },
  ];

  // Mock blockchain transactions
  const transactions = [
    {
      id: 1,
      type: "Donation Record",
      hash: "0x742d35cc6bf8b4f8a",
      date: "2024-10-15",
      status: "Confirmed",
      gasUsed: "21,000",
      blockNumber: "18,542,891",
    },
    {
      id: 2,
      type: "Badge Earned",
      hash: "0x9f8e7d6c5b4a3e2f1",
      date: "2024-10-15",
      status: "Confirmed",
      gasUsed: "45,000",
      blockNumber: "18,542,892",
    },
    {
      id: 3,
      type: "Subscription Renewal",
      hash: "0x1a2b3c4d5e6f7g8h9",
      date: "2024-10-01",
      status: "Confirmed",
      gasUsed: "65,000",
      blockNumber: "18,521,456",
    },
  ];

  // Mock badges
  const badges = [
    {
      id: 1,
      name: "Life Saver",
      description: "Donated blood 10+ times",
      earned: "2024-10-15",
      rarity: "Gold",
      icon: "🏆",
    },
    {
      id: 2,
      name: "First Donation",
      description: "Completed your first donation",
      earned: "2024-01-15",
      rarity: "Bronze",
      icon: "🩸",
    },
    {
      id: 3,
      name: "Community Hero",
      description: "Helped 25+ patients",
      earned: "2024-08-20",
      rarity: "Silver",
      icon: "❤️",
    },
  ];

  const renderDonations = () => (
    <View style={{ paddingHorizontal: 20 }}>
      {donations.map((donation, index) => (
        <MotiView
          key={donation.id}
          from={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{
            type: "timing",
            delay: index * 100,
            duration: 600,
          }}
          style={{ marginBottom: 20 }}
        >
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderLeftWidth: 4,
              borderLeftColor: "#DC143C",
            }}
          >
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
                  <Heart size={16} color="#DC143C" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      marginLeft: 8,
                    }}
                  >
                    {donation.bloodType} • {donation.amount}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFF",
                    marginBottom: 5,
                  }}
                >
                  {donation.center}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Calendar size={12} color="rgba(255, 255, 255, 0.6)" />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.6)",
                      marginLeft: 5,
                    }}
                  >
                    {donation.date}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.2)",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(34, 197, 94, 0.3)",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "600",
                    color: "#22C55E",
                  }}
                >
                  {donation.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "rgba(138, 43, 226, 0.1)",
                borderRadius: 8,
                padding: 12,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: "rgba(138, 43, 226, 0.2)",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: 5,
                }}
              >
                Impact: {donation.impact}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Hash size={12} color="#8A2BE2" />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#8A2BE2",
                    marginLeft: 5,
                    fontFamily: "monospace",
                  }}
                >
                  {donation.txHash}
                </Text>
              </View>
            </View>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
              }}
            >
              <ExternalLink size={14} color="#8A2BE2" />
              <Text
                style={{
                  fontSize: 14,
                  color: "#8A2BE2",
                  marginLeft: 5,
                  fontWeight: "600",
                }}
              >
                View on Blockchain
              </Text>
            </Pressable>
          </View>
        </MotiView>
      ))}
    </View>
  );

  const renderBlockchain = () => (
    <View style={{ paddingHorizontal: 20 }}>
      {transactions.map((tx, index) => (
        <MotiView
          key={tx.id}
          from={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{
            type: "timing",
            delay: index * 100,
            duration: 600,
          }}
          style={{ marginBottom: 20 }}
        >
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
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 15,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginBottom: 5,
                  }}
                >
                  {tx.type}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Calendar size={12} color="rgba(255, 255, 255, 0.6)" />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.6)",
                      marginLeft: 5,
                    }}
                  >
                    {tx.date}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.2)",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(34, 197, 94, 0.3)",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "600",
                    color: "#22C55E",
                  }}
                >
                  {tx.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.6)",
                  marginBottom: 5,
                }}
              >
                Transaction Hash
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#8A2BE2",
                  fontFamily: "monospace",
                  marginBottom: 10,
                }}
              >
                {tx.hash}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: 2,
                    }}
                  >
                    Block Number
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                    }}
                  >
                    {tx.blockNumber}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: 2,
                    }}
                  >
                    Gas Used
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                    }}
                  >
                    {tx.gasUsed}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
              }}
            >
              <ExternalLink size={14} color="#8A2BE2" />
              <Text
                style={{
                  fontSize: 14,
                  color: "#8A2BE2",
                  marginLeft: 5,
                  fontWeight: "600",
                }}
              >
                View on Etherscan
              </Text>
            </Pressable>
          </View>
        </MotiView>
      ))}
    </View>
  );

  const renderBadges = () => (
    <View style={{ paddingHorizontal: 20 }}>
      {badges.map((badge, index) => (
        <MotiView
          key={badge.id}
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            delay: index * 100,
            duration: 600,
          }}
          style={{ marginBottom: 20 }}
        >
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor:
                badge.rarity === "Gold"
                  ? "rgba(255, 215, 0, 0.3)"
                  : badge.rarity === "Silver"
                    ? "rgba(192, 192, 192, 0.3)"
                    : "rgba(205, 127, 50, 0.3)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor:
                    badge.rarity === "Gold"
                      ? "rgba(255, 215, 0, 0.2)"
                      : badge.rarity === "Silver"
                        ? "rgba(192, 192, 192, 0.2)"
                        : "rgba(205, 127, 50, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                }}
              >
                <Text style={{ fontSize: 24 }}>{badge.icon}</Text>
              </View>

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
                    {badge.name}
                  </Text>
                  <View
                    style={{
                      backgroundColor:
                        badge.rarity === "Gold"
                          ? "rgba(255, 215, 0, 0.2)"
                          : badge.rarity === "Silver"
                            ? "rgba(192, 192, 192, 0.2)"
                            : "rgba(205, 127, 50, 0.2)",
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "600",
                        color:
                          badge.rarity === "Gold"
                            ? "#FFD700"
                            : badge.rarity === "Silver"
                              ? "#C0C0C0"
                              : "#CD7F32",
                      }}
                    >
                      {badge.rarity.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: 5,
                  }}
                >
                  {badge.description}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Calendar size={12} color="rgba(255, 255, 255, 0.6)" />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.6)",
                      marginLeft: 5,
                    }}
                  >
                    Earned on {badge.earned}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </MotiView>
      ))}
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
            Activity
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Track your donations and blockchain activity
          </Text>
        </MotiView>
      </View>

      {/* Tab Navigation */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginBottom: 30,
        }}
      >
        {[
          { key: "donations", label: "Donations", icon: Heart },
          { key: "blockchain", label: "Blockchain", icon: Activity },
          { key: "badges", label: "Badges", icon: Award },
        ].map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              backgroundColor:
                activeTab === tab.key ? "#DC143C" : "rgba(255, 255, 255, 0.05)",
              borderRadius: 12,
              padding: 12,
              alignItems: "center",
              marginHorizontal: 5,
              borderWidth: 1,
              borderColor:
                activeTab === tab.key ? "#DC143C" : "rgba(255, 255, 255, 0.1)",
            }}
          >
            <tab.icon
              size={20}
              color={
                activeTab === tab.key ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)"
              }
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color:
                  activeTab === tab.key
                    ? "#FFFFFF"
                    : "rgba(255, 255, 255, 0.6)",
                marginTop: 5,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "donations" && renderDonations()}
        {activeTab === "blockchain" && renderBlockchain()}
        {activeTab === "badges" && renderBadges()}
      </ScrollView>
    </View>
  );
}
