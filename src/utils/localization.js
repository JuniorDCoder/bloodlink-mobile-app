// Localization system for French and English
export const translations = {
  en: {
    // Common
    welcome: "Welcome",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    continue: "Continue",
    back: "Back",
    submit: "Submit",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    required: "Required",
    optional: "Optional",

    // Dashboard
    dashboard: {
      title: "Dashboard",
      welcomeBack: "Welcome back,",
      quickActions: "Quick Actions",
      donateNow: "Donate Now",
      requestBlood: "Request Blood",
      urgentRequests: "Urgent Requests Nearby",
      viewAll: "View All",
      walletConnected: "Wallet Connected",
      walletDisconnected: "Wallet Disconnected",
      donations: "Donations",
      badges: "Badges",
      impactScore: "Impact Score",
      lastDonation: "Last Donation",
      nextEligible: "Next Eligible",
      donationStatus: "Donation Status",
      blockchainExplainer:
        "Your donations are securely recorded on the blockchain, creating an immutable record of your life-saving contributions.",
    },

    // Blood Request
    bloodRequest: {
      title: "Request Blood",
      subtitle: "Submit Blood Request",
      description:
        "Connect with verified donors in your area through our decentralized network",
      requestingFor: "Requesting For",
      myself: "Myself",
      someoneElse: "Someone Else",
      patientName: "Patient Name",
      bloodTypeNeeded: "Blood Type Needed",
      unitsNeeded: "Units Needed",
      urgencyLevel: "Urgency Level",
      critical: "Critical",
      urgent: "Urgent",
      scheduled: "Scheduled",
      criticalDesc: "Immediate need (within 2 hours)",
      urgentDesc: "Needed within 24 hours",
      scheduledDesc: "Planned procedure (within 1 week)",
      hospital: "Hospital/Medical Facility",
      contactPhone: "Contact Phone",
      additionalInfo: "Additional Information",
      importantNotice: "Important Notice",
      blockchainNotice:
        "Your request will be broadcast to verified donors in your area. All donations are tracked on-chain for transparency and safety. Emergency requests are prioritized automatically.",
      submitRequest: "Submit Request",
      requestSubmitted: "Request Submitted!",
      requestSubmittedDesc:
        "Your blood request has been submitted to the network. Compatible donors in your area will be notified.",
    },

    // Profile
    profile: {
      title: "Profile",
      subtitle: "Manage your account and preferences",
      editProfile: "Edit Profile",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      memberSince: "Member Since",
      settings: "Settings",
      walletSettings: "Wallet Settings",
      notifications: "Notifications",
      privacy: "Privacy & Security",
      appSettings: "App Settings",
      signOut: "Sign Out",
      updateProfile: "Update Your Profile",
      profileDescription:
        "Keep your information up to date for better donor matching",
      basicInfo: "Basic Information",
      medicalInfo: "Medical Information",
      emergencyContact: "Emergency Contact",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      age: "Age",
      location: "Location",
      bloodType: "Blood Type",
      medicalConditions: "Medical Conditions",
      allergies: "Allergies",
      emergencyContactPhone: "Emergency Contact Phone",
      saveChanges: "Save Changes",
      profileUpdated: "Profile Updated!",
      profileUpdatedDesc: "Your profile has been successfully updated.",
      privacyNotice:
        "Your updated information will be encrypted and stored securely on the blockchain. You maintain full control over your data privacy settings.",
    },

    // Blockchain Education
    blockchain: {
      whatIsBlockchain: "What is Blockchain?",
      blockchainExplainer:
        "Blockchain is a secure digital ledger that cannot be changed or deleted. Think of it like a permanent, tamper-proof record book that everyone can verify.",
      whyBlockchain: "Why Use Blockchain for Blood Donation?",
      transparencyTitle: "Complete Transparency",
      transparencyDesc:
        "Every donation is permanently recorded, creating trust between donors and recipients.",
      securityTitle: "Enhanced Security",
      securityDesc:
        "Your medical data is encrypted and protected by advanced cryptography.",
      verificationTitle: "Instant Verification",
      verificationDesc:
        "Donors and medical facilities are verified on the network, ensuring authenticity.",
      immutableTitle: "Permanent Records",
      immutableDesc:
        "Donation history cannot be altered, creating a reliable medical record.",
    },
  },

  fr: {
    // Common
    welcome: "Bienvenue",
    loading: "Chargement...",
    save: "Enregistrer",
    cancel: "Annuler",
    continue: "Continuer",
    back: "Retour",
    submit: "Soumettre",
    edit: "Modifier",
    delete: "Supprimer",
    confirm: "Confirmer",
    required: "Requis",
    optional: "Optionnel",

    // Dashboard
    dashboard: {
      title: "Tableau de bord",
      welcomeBack: "Bon retour,",
      quickActions: "Actions rapides",
      donateNow: "Donner maintenant",
      requestBlood: "Demander du sang",
      urgentRequests: "Demandes urgentes à proximité",
      viewAll: "Voir tout",
      walletConnected: "Portefeuille connecté",
      walletDisconnected: "Portefeuille déconnecté",
      donations: "Dons",
      badges: "Badges",
      impactScore: "Score d'impact",
      lastDonation: "Dernier don",
      nextEligible: "Prochain éligible",
      donationStatus: "Statut du don",
      blockchainExplainer:
        "Vos dons sont enregistrés de manière sécurisée sur la blockchain, créant un enregistrement immuable de vos contributions qui sauvent des vies.",
    },

    // Blood Request
    bloodRequest: {
      title: "Demander du sang",
      subtitle: "Soumettre une demande de sang",
      description:
        "Connectez-vous avec des donneurs vérifiés dans votre région via notre réseau décentralisé",
      requestingFor: "Demande pour",
      myself: "Moi-même",
      someoneElse: "Quelqu'un d'autre",
      patientName: "Nom du patient",
      bloodTypeNeeded: "Type de sang nécessaire",
      unitsNeeded: "Unités nécessaires",
      urgencyLevel: "Niveau d'urgence",
      critical: "Critique",
      urgent: "Urgent",
      scheduled: "Programmé",
      criticalDesc: "Besoin immédiat (dans les 2 heures)",
      urgentDesc: "Nécessaire dans les 24 heures",
      scheduledDesc: "Procédure planifiée (dans la semaine)",
      hospital: "Hôpital/Établissement médical",
      contactPhone: "Téléphone de contact",
      additionalInfo: "Informations supplémentaires",
      importantNotice: "Avis important",
      blockchainNotice:
        "Votre demande sera diffusée aux donneurs vérifiés de votre région. Tous les dons sont suivis sur la chaîne pour la transparence et la sécurité. Les demandes d'urgence sont priorisées automatiquement.",
      submitRequest: "Soumettre la demande",
      requestSubmitted: "Demande soumise!",
      requestSubmittedDesc:
        "Votre demande de sang a été soumise au réseau. Les donneurs compatibles de votre région seront notifiés.",
    },

    // Profile
    profile: {
      title: "Profil",
      subtitle: "Gérez votre compte et vos préférences",
      editProfile: "Modifier le profil",
      contactInfo: "Informations de contact",
      email: "E-mail",
      phone: "Téléphone",
      memberSince: "Membre depuis",
      settings: "Paramètres",
      walletSettings: "Paramètres du portefeuille",
      notifications: "Notifications",
      privacy: "Confidentialité et sécurité",
      appSettings: "Paramètres de l'app",
      signOut: "Se déconnecter",
      updateProfile: "Mettre à jour votre profil",
      profileDescription:
        "Gardez vos informations à jour pour un meilleur appariement des donneurs",
      basicInfo: "Informations de base",
      medicalInfo: "Informations médicales",
      emergencyContact: "Contact d'urgence",
      fullName: "Nom complet",
      emailAddress: "Adresse e-mail",
      phoneNumber: "Numéro de téléphone",
      age: "Âge",
      location: "Emplacement",
      bloodType: "Groupe sanguin",
      medicalConditions: "Conditions médicales",
      allergies: "Allergies",
      emergencyContactPhone: "Téléphone de contact d'urgence",
      saveChanges: "Enregistrer les modifications",
      profileUpdated: "Profil mis à jour!",
      profileUpdatedDesc: "Votre profil a été mis à jour avec succès.",
      privacyNotice:
        "Vos informations mises à jour seront chiffrées et stockées de manière sécurisée sur la blockchain. Vous gardez le contrôle total de vos paramètres de confidentialité.",
    },

    // Blockchain Education
    blockchain: {
      whatIsBlockchain: "Qu'est-ce que la Blockchain?",
      blockchainExplainer:
        "La blockchain est un registre numérique sécurisé qui ne peut pas être modifié ou supprimé. Pensez-y comme un livre de records permanent et infalsifiable que tout le monde peut vérifier.",
      whyBlockchain: "Pourquoi utiliser la Blockchain pour le don de sang?",
      transparencyTitle: "Transparence complète",
      transparencyDesc:
        "Chaque don est enregistré de manière permanente, créant la confiance entre donneurs et receveurs.",
      securityTitle: "Sécurité renforcée",
      securityDesc:
        "Vos données médicales sont chiffrées et protégées par une cryptographie avancée.",
      verificationTitle: "Vérification instantanée",
      verificationDesc:
        "Les donneurs et établissements médicaux sont vérifiés sur le réseau, garantissant l'authenticité.",
      immutableTitle: "Dossiers permanents",
      immutableDesc:
        "L'historique des dons ne peut pas être modifié, créant un dossier médical fiable.",
    },
  },
};

export const getCurrentLanguage = () => "en"; // Default to English
export const getTranslation = (key, lang = getCurrentLanguage()) => {
  const keys = key.split(".");
  let value = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};

export const t = getTranslation;
