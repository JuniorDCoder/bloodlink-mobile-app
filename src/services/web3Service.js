// services/web3Service.js
import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Contract ABIs (you'll get these after compiling your smart contracts)
import BloodDonationABI from '../contracts/BloodDonation.json';
import DonorBadgeABI from '../contracts/DonorBadge.json';

// Configuration
const CONFIG = {
    // For testing, use Polygon Mumbai or Sepolia testnet
    RPC_URL: 'https://rpc-mumbai.maticvigil.com', // Polygon Mumbai testnet
    CHAIN_ID: 80001,
    BLOOD_DONATION_CONTRACT: '0x...', // Deploy and add your contract address
    DONOR_BADGE_CONTRACT: '0x...', // Deploy and add your contract address
};

class Web3Service {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.bloodDonationContract = null;
        this.donorBadgeContract = null;
        this.walletAddress = null;
    }

    // Initialize provider
    async initialize() {
        try {
            this.provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);
            return true;
        } catch (error) {
            console.error('Failed to initialize provider:', error);
            return false;
        }
    }

    // Connect wallet (MetaMask or WalletConnect)
    async connectWallet(walletType = 'metamask') {
        try {
            let provider;

            if (walletType === 'metamask') {
                // For mobile, this would use MetaMask mobile deep linking
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
            } else if (walletType === 'walletconnect') {
                // WalletConnect implementation
                const WalletConnectProvider = require('@walletconnect/web3-provider').default;
                const wcProvider = new WalletConnectProvider({
                    rpc: {
                        [CONFIG.CHAIN_ID]: CONFIG.RPC_URL,
                    },
                });

                await wcProvider.enable();
                provider = new ethers.providers.Web3Provider(wcProvider);
            }

            this.signer = provider.getSigner();
            this.walletAddress = await this.signer.getAddress();

            // Initialize contracts
            this.bloodDonationContract = new ethers.Contract(
                CONFIG.BLOOD_DONATION_CONTRACT,
                BloodDonationABI.abi,
                this.signer
            );

            this.donorBadgeContract = new ethers.Contract(
                CONFIG.DONOR_BADGE_CONTRACT,
                DonorBadgeABI.abi,
                this.signer
            );

            // Store wallet address locally
            await AsyncStorage.setItem('walletAddress', this.walletAddress);

            return {
                success: true,
                address: this.walletAddress,
            };
        } catch (error) {
            console.error('Wallet connection failed:', error);
            return {
                success: false,
                error: error.message,
            };
        }
    }

    // Register as donor on blockchain
    async registerDonor(name, bloodType) {
        try {
            if (!this.bloodDonationContract) {
                throw new Error('Contract not initialized');
            }

            const tx = await this.bloodDonationContract.registerDonor(name, bloodType);
            const receipt = await tx.wait();

            return {
                success: true,
                txHash: receipt.transactionHash,
            };
        } catch (error) {
            console.error('Registration failed:', error);
            return {
                success: false,
                error: error.message,
            };
        }
    }

    // Record a donation on blockchain
    async recordDonation(bloodType, units, donationCenter) {
        try {
            const tx = await this.bloodDonationContract.recordDonation(
                bloodType,
                units,
                donationCenter
            );
            const receipt = await tx.wait();

            // Get donation ID from event
            const event = receipt.events?.find(e => e.event === 'DonationRecorded');
            const donationId = event?.args?.donationId?.toString();

            return {
                success: true,
                txHash: receipt.transactionHash,
                donationId,
            };
        } catch (error) {
            console.error('Recording donation failed:', error);
            return {
                success: false,
                error: error.message,
            };
        }
    }

    // Create blood request on blockchain
    async createBloodRequest(bloodType, unitsNeeded, hospitalName) {
        try {
            const tx = await this.bloodDonationContract.createBloodRequest(
                bloodType,
                unitsNeeded,
                hospitalName
            );
            const receipt = await tx.wait();

            const event = receipt.events?.find(e => e.event === 'BloodRequestCreated');
            const requestId = event?.args?.requestId?.toString();

            return {
                success: true,
                txHash: receipt.transactionHash,
                requestId,
            };
        } catch (error) {
            console.error('Creating request failed:', error);
            return {
                success: false,
                error: error.message,
            };
        }
    }

    // Get donor information from blockchain
    async getDonorInfo(address) {
        try {
            const donor = await this.bloodDonationContract.getDonorInfo(
                address || this.walletAddress
            );

            return {
                name: donor.name,
                bloodType: donor.bloodType,
                totalDonations: donor.totalDonations.toNumber(),
                lastDonationDate: new Date(donor.lastDonationDate.toNumber() * 1000),
                isVerified: donor.isVerified,
            };
        } catch (error) {
            console.error('Failed to get donor info:', error);
            return null;
        }
    }

    // Get all active blood requests
    async getActiveRequests() {
        try {
            const requestIds = await this.bloodDonationContract.getActiveRequests();

            const requests = await Promise.all(
                requestIds.map(async (id) => {
                    const request = await this.bloodDonationContract.getBloodRequest(id);
                    return {
                        id: id.toString(),
                        requester: request.requester,
                        bloodType: request.bloodType,
                        unitsNeeded: request.unitsNeeded.toNumber(),
                        unitsFulfilled: request.unitsFulfilled.toNumber(),
                        hospitalName: request.hospitalName,
                        timestamp: new Date(request.timestamp.toNumber() * 1000),
                        active: request.active,
                    };
                })
            );

            return requests;
        } catch (error) {
            console.error('Failed to get requests:', error);
            return [];
        }
    }

    // Get user's badges (NFTs)
    async getUserBadges(address) {
        try {
            const badgeIds = await this.donorBadgeContract.getUserBadges(
                address || this.walletAddress
            );

            const badges = await Promise.all(
                badgeIds.map(async (id) => {
                    const badgeType = await this.donorBadgeContract.badgeTypes(id);
                    return {
                        tokenId: id.toString(),
                        badgeType,
                    };
                })
            );

            return badges;
        } catch (error) {
            console.error('Failed to get badges:', error);
            return [];
        }
    }

    // Disconnect wallet
    async disconnectWallet() {
        this.provider = null;
        this.signer = null;
        this.bloodDonationContract = null;
        this.donorBadgeContract = null;
        this.walletAddress = null;
        await AsyncStorage.removeItem('walletAddress');
    }
}

export default new Web3Service();