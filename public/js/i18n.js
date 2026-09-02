/**
 * VeriSkill — Bhashini AI Internationalization (i18n) Engine
 * Supported Languages: English (en), Hindi (hi), Odia (or), Tamil (ta)
 * Powered by Bhashini AI National Translation Mission
 */

const I18n = {
  currentLanguage: (typeof localStorage !== 'undefined' && localStorage.getItem('veriskill_lang')) || 'en',

  translations: {
    en: {
      // Navbar
      "navbar.home": "Home",
      "navbar.dashboard": "Dashboard",
      "navbar.passport": "Passport",
      "navbar.match": "Match",
      "navbar.evidence": "Evidence & Gaps",
      "navbar.teams": "Teams",
      "navbar.audit": "Audit",
      "navbar.verify": "Verify Credential",
      "navbar.login": "Log In",
      "navbar.signup": "Sign Up",
      "navbar.logout": "Log Out",
      "navbar.poweredByBhashini": "Powered by Bhashini AI Engine",

      // Dashboard
      "dashboard.sihBadge": "🇮🇳 Smart India Hackathon 2026 Edition",
      "dashboard.title": "Student Skill Passport",
      "dashboard.ncrf": "NCrF Credits Earned",
      "dashboard.greeting": "Good day",
      "dashboard.subtitle": "Here’s what’s happening with your verified skills, NCrF academic credits, and opportunity matches.",
      "dashboard.syncApaar": "Sync with APAAR ID / DigiLocker",
      "dashboard.addEvidence": "Add Evidence",
      "dashboard.uploadCert": "Upload Certificate (Vision-AI Scan)",
      "dashboard.publicVerification": "Public Verification",
      "dashboard.passportTitle": "Skill Passport",
      "dashboard.mySecurePassport": "My Secure Passport",
      "dashboard.tier": "Cryptographically Verified Tier",
      "dashboard.passportInstruction": "Complete pending Evidence items to achieve 100% cryptographic verification score.",
      "dashboard.verifiedSkills": "Verified Skills",
      "dashboard.evidenceItems": "Evidence Items",
      "dashboard.opportunityMatches": "Opportunity Matches",
      "dashboard.teamMatches": "Team Matches",
      "dashboard.aiNextSkill": "AI Recommended Next Skill",
      "dashboard.viewLearningPath": "View Learning Path",
      "dashboard.ncrfTitle": "NCrF Matrix Mapping",
      "dashboard.ncrfCredits": "NCrF Academic Credits Earned",
      "dashboard.qrTitle": "Live Credential QR",
      "dashboard.qrSub": "Scan to Verify Proof",
      "dashboard.copyLink": "Copy Link",
      "dashboard.openLink": "Open Link",
      "dashboard.emptyStateTitle": "No credentials uploaded yet",
      "dashboard.emptyStateSub": "Click 'Import from DigiLocker' or upload a certificate to begin your verifiable skill journey.",
      "dashboard.importDigiLocker": "Import from DigiLocker",

      // AI Scan & Verification
      "scan.overlayTitle": "Scanning Credential via Vision-AI Engine...",
      "scan.step1": "[1] Extracting Document OCR & Metadata...",
      "scan.step2": "[2] Verifying Digital Signature & Issuer Seal...",
      "scan.step3": "[3] Computing SHA-256 Payload Hash Matching...",
      "scan.step4": "[4] Executing Ethical AI Fraud & Anomaly Audit...",
      "scan.reportTitle": "AI Authenticity & Audit Report",
      "scan.fraudScore": "99.4% Authenticity Score (Passed)",
      "scan.cryptoCheck": "SHA-256 Fingerprint Matches Issued Payload",
      "scan.revocationStatus": "ACTIVE (Status List Check Passed)",

      // Public Verify Portal
      "verify.title": "Verifiable Skill Passport Authenticated",
      "verify.subtitle": "Cryptographically Validated via W3C Verifiable Credentials v1.1 Standard",
      "verify.status": "Cryptographically Verified",
      "verify.hashLabel": "Dynamic SHA-256 Integrity Verification: PASSED",
      "verify.hashExpl": "Client-Side Calculated Hash Matches Ledger Signature. SHA-256 is used as a one-way tamper-proof fingerprint for payload verification.",
      "verify.ledgerSig": "Ledger Target Hash Signature",
      "verify.liveHash": "Live Web Crypto Client-Side Hash",
      "verify.authenticSkills": "Authentic Demonstrated Skills",
      "verify.back": "Back to VeriSkill Platform",
      "verify.downloadVC": "Download JSON-LD VC",
      "verify.printCert": "Print Certificate",

      // Footer
      "footer.tagline": "Empowering students via Proof, Not Claims.",
      "footer.howItWorks": "How It Works",
      "footer.onboarding": "Student Onboarding",
      "footer.fairness": "Ethical AI Audit",
      "footer.verify": "Public Verification",
      "footer.privacy": "Privacy by Design"
    },
    hi: {
      // Navbar
      "navbar.home": "मुख्य पृष्ठ",
      "navbar.dashboard": "डैशबोर्ड",
      "navbar.passport": "कौशल पासपोर्ट",
      "navbar.match": "मैच",
      "navbar.evidence": "साक्ष्य एवं अंतराल",
      "navbar.teams": "टीमें",
      "navbar.audit": "निष्पक्षता ऑडिट",
      "navbar.verify": "प्रमाणपत्र सत्यापित करें",
      "navbar.login": "लॉग इन",
      "navbar.signup": "खाता बनाएं",
      "navbar.logout": "लॉग आउट",
      "navbar.poweredByBhashini": "भाषिणी एआई इंजन द्वारा संचालित",

      // Dashboard
      "dashboard.sihBadge": "🇮🇳 स्मार्ट इंडिया हैकाथॉन 2026 संस्करण",
      "dashboard.title": "छात्र कौशल पासपोर्ट",
      "dashboard.ncrf": "NCrF क्रेडिट प्राप्त हुए",
      "dashboard.greeting": "नमस्ते",
      "dashboard.subtitle": "आपके सत्यापित कौशल, NCrF शैक्षणिक क्रेडिट और इंटर्नशिप अवसरों की ताज़ा जानकारी।",
      "dashboard.syncApaar": "अपार (APAAR) / डिजिलॉकर से सिंक करें",
      "dashboard.addEvidence": "साक्ष्य जोड़ें",
      "dashboard.uploadCert": "प्रमाणपत्र अपलोड करें (विज़न-एआई स्कैन)",
      "dashboard.publicVerification": "सार्वजनिक सत्यापन",
      "dashboard.passportTitle": "कौशल पासपोर्ट",
      "dashboard.mySecurePassport": "मेरा सुरक्षित पासपोर्ट",
      "dashboard.tier": "क्रिप्टोग्राफिक रूप से सत्यापित स्तर",
      "dashboard.passportInstruction": "100% सत्यापन विश्वास प्राप्त करने के लिए लंबित साक्ष्य पूर्ण करें।",
      "dashboard.verifiedSkills": "सत्यापित कौशल",
      "dashboard.evidenceItems": "साक्ष्य रिकॉर्ड",
      "dashboard.opportunityMatches": "अवसर मिलान",
      "dashboard.teamMatches": "टीम मिलान",
      "dashboard.aiNextSkill": "एआई अनुशंसित अगला कौशल",
      "dashboard.viewLearningPath": "लर्निंग पाथ देखें",
      "dashboard.ncrfTitle": "NCrF मैट्रिक्स मैपिंग",
      "dashboard.ncrfCredits": "NCrF शैक्षणिक क्रेडिट प्राप्त हुए",
      "dashboard.qrTitle": "लाइव क्रेडेंशियल क्यूआर",
      "dashboard.qrSub": "प्रमाण जांचने के लिए स्कैन करें",
      "dashboard.copyLink": "लिंक कॉपी करें",
      "dashboard.openLink": "लिंक खोलें",
      "dashboard.emptyStateTitle": "अभी तक कोई प्रमाणपत्र अपलोड नहीं किया गया",
      "dashboard.emptyStateSub": "शुरू करने के लिए 'डिजिलॉकर से आयात करें' पर क्लिक करें या प्रमाणपत्र अपलोड करें।",
      "dashboard.importDigiLocker": "डिजिलॉकर से आयात करें",

      // AI Scan & Verification
      "scan.overlayTitle": "विज़न-एआई इंजन द्वारा क्रेडेंशियल स्कैनिंग जारी...",
      "scan.step1": "[1] दस्तावेज़ ओसीआर एवं मेटाडेटा निकाला जा रहा है...",
      "scan.step2": "[2] डिजिटल हस्ताक्षर एवं जारीकर्ता सील का सत्यापन...",
      "scan.step3": "[3] SHA-256 पेलोड हैश मिलान की गणना...",
      "scan.step4": "[4] नैतिक एआई धोखाधड़ी एवं विसंगति ऑडिट निष्पादन...",
      "scan.reportTitle": "एआई प्रामाणिकता एवं ऑडिट रिपोर्ट",
      "scan.fraudScore": "99.4% प्रामाणिकता स्कोर (उत्तीर्ण)",
      "scan.cryptoCheck": "SHA-256 फिंगरप्रिंट जारी किए गए पेलोड से मेल खाता है",
      "scan.revocationStatus": "सक्रिय (स्टेटस लिस्ट जांच सफल)",

      // Public Verify Portal
      "verify.title": "सत्यापनीय कौशल पासपोर्ट प्रमाणित",
      "verify.subtitle": "W3C सत्यापनीय क्रेडेंशियल v1.1 मानक के माध्यम से मान्य",
      "verify.status": "क्रिप्टोग्राफिक रूप से सत्यापित",
      "verify.hashLabel": "डायनामिक SHA-256 अखंडता सत्यापन: सफल (PASSED)",
      "verify.hashExpl": "क्लाइंट-साइड पर परिकलित हैश लेज़र हस्ताक्षर से मेल खाता है। डेटा अखंडता के लिए SHA-256 का उपयोग किया जाता है।",
      "verify.ledgerSig": "लेज़र लक्षित हैश हस्ताक्षर",
      "verify.liveHash": "लाइव वेब क्रिप्टो क्लाइंट-साइड हैश",
      "verify.authenticSkills": "प्रामाणिक प्रदर्शित कौशल",
      "verify.back": "वापस वेरीस्किल प्लेटफॉर्म पर जाएं",
      "verify.downloadVC": "JSON-LD VC डाउनलोड करें",
      "verify.printCert": "प्रमाणपत्र प्रिंट करें",

      // Footer
      "footer.tagline": "सबूत के माध्यम से छात्रों को सशक्त बनाना, दावों से नहीं।",
      "footer.howItWorks": "यह कैसे काम करता है",
      "footer.onboarding": "छात्र ऑनबोर्डिंग",
      "footer.fairness": "नैतिक एआई ऑडिट",
      "footer.verify": "सार्वजनिक सत्यापन",
      "footer.privacy": "प्राइवेसी बाय डिज़ाइन"
    },
    or: {
      // Navbar
      "navbar.home": "ମୁଖ୍ୟ ପୃଷ୍ଠା",
      "navbar.dashboard": "ଡ୍ୟାସବୋର୍ଡ",
      "navbar.passport": "ଦକ୍ଷତା ପାସପୋର୍ଟ",
      "navbar.match": "ମ୍ୟାଚ୍",
      "navbar.evidence": "ପ୍ରମାଣ ଏବଂ ଗ୍ୟାପ୍",
      "navbar.teams": "ଦଳ",
      "navbar.audit": "ଅଡିଟ୍",
      "navbar.verify": "ଯାଞ୍ଚ କରନ୍ତୁ",
      "navbar.login": "ଲଗ୍ ଇନ୍",
      "navbar.signup": "ସାଇନ୍ ଅପ୍",
      "navbar.logout": "ଲଗ୍ ଆଉଟ୍",
      "navbar.poweredByBhashini": "ଭାଷିଣୀ ଏଆଇ ଇଞ୍ଜିନ ଦ୍ୱାରା ପରିଚାଳିତ",

      // Dashboard
      "dashboard.sihBadge": "🇮🇳 ସ୍ମାର୍ଟ ଇଣ୍ଡିଆ ହାକାଥନ୍ ୨୦୨୬",
      "dashboard.title": "ଛାତ୍ର ଦକ୍ଷତା ପାସପୋର୍ଟ",
      "dashboard.ncrf": "NCrF ଏକାଡେମିକ୍ କ୍ରେଡିଟ୍ ଅର୍ଜିତ",
      "dashboard.greeting": "ନମସ୍କାର",
      "dashboard.subtitle": "ଆପଣଙ୍କର ଯାଞ୍ଚ ହୋଇଥିବା ଦକ୍ଷତା ଏବଂ NCrF ଏକାଡେମିକ୍ କ୍ରେଡିଟ୍ ବିବରଣୀ।",
      "dashboard.syncApaar": "APAAR / ଡିଜିଲକର ସହିତ ସିଙ୍କ୍ କରନ୍ତୁ",
      "dashboard.addEvidence": "ପ୍ରମାଣ ଯୋଡନ୍ତୁ",
      "dashboard.uploadCert": "ସାର୍ଟିଫିକେଟ୍ ଅପଲୋଡ୍ (Vision-AI)",
      "dashboard.publicVerification": "ସାର୍ବଜନୀନ ଯାଞ୍ଚ",
      "dashboard.passportTitle": "ଦକ୍ଷତା ପାସପୋର୍ଟ",
      "dashboard.mySecurePassport": "ମୋର ସୁରକ୍ଷିତ ପାସପୋର୍ଟ",
      "dashboard.tier": "କ୍ରିପ୍ଟୋଗ୍ରାଫିକ୍ ଯାଞ୍ଚ ସ୍ତର",
      "dashboard.passportInstruction": "୧୦୦% ଯାଞ୍ଚ ସ୍କୋର ହାସଲ କରିବାକୁ ବାକି ପ୍ରମାଣ ସଂପୂର୍ଣ୍ଣ କରନ୍ତୁ।",
      "dashboard.verifiedSkills": "ଯାଞ୍ଚ ହୋଇଥିବା ଦକ୍ଷତା",
      "dashboard.evidenceItems": "ପ୍ରମାଣ ସଂଖ୍ୟା",
      "dashboard.opportunityMatches": "ସୁଯୋଗ ମ୍ୟାଚ୍",
      "dashboard.teamMatches": "ଦଳ ମ୍ୟାଚ୍",
      "dashboard.aiNextSkill": "AI ସୁପାରିଶ ପରବର୍ତ୍ତୀ ଦକ୍ଷତା",
      "dashboard.viewLearningPath": "ଶିକ୍ଷା ପଥ ଦେଖନ୍ତୁ",
      "dashboard.ncrfTitle": "NCrF ମ୍ୟାଟ୍ରିକ୍ସ ମ୍ୟାପିଂ",
      "dashboard.ncrfCredits": "NCrF ଏକାଡେମିକ୍ କ୍ରେଡିଟ୍ ଅର୍ଜିତ",
      "dashboard.qrTitle": "ଲାଇଭ୍ କ୍ରେଡେନସିଆଲ୍ QR",
      "dashboard.qrSub": "ପ୍ରମାଣ ଯାଞ୍ଚ କରିବାକୁ ସ୍କାନ୍ କରନ୍ତୁ",
      "dashboard.copyLink": "ଲିଙ୍କ୍ କପି କରନ୍ତୁ",
      "dashboard.openLink": "ଲିଙ୍କ୍ ଖୋଲନ୍ତୁ",
      "dashboard.emptyStateTitle": "କୌଣସି ପ୍ରମାଣପତ୍ର ଏପର୍ଯ୍ୟନ୍ତ ଅପଲୋଡ୍ ହୋଇନାହିଁ",
      "dashboard.emptyStateSub": "ଆରମ୍ଭ କରିବା ପାଇଁ 'DigiLocker ରୁ ଆମଦାନୀ' କରନ୍ତୁ କିମ୍ବା ଏକ ସାର୍ଟିଫିକେଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ।",
      "dashboard.importDigiLocker": "DigiLocker ରୁ ଆମଦାନୀ କରନ୍ତୁ",

      // AI Scan & Verification
      "scan.overlayTitle": "Vision-AI ଇଞ୍ଜିନ ଦ୍ୱାରା ସାର୍ଟିଫିକେଟ୍ ସ୍କାନିଂ ଜାରି ରହିଛି...",
      "scan.step1": "[1] ଡକ୍ୟୁମେଣ୍ଟ୍ OCR ଏବଂ ମେଟାଡାଟା ବାହାର କରାଯାଉଛି...",
      "scan.step2": "[2] ଡିଜିଟାଲ୍ ଦସ୍ତଖତ ଏବଂ ପ୍ରଦାନକାରୀ ସିଲ୍ ଯାଞ୍ଚ...",
      "scan.step3": "[3] SHA-256 ପେଲୋଡ୍ ହ୍ୟାସ୍ ମେଳଣ ଗଣନା...",
      "scan.step4": "[4] ନୈତିକ AI ଫ୍ରଡ୍ ଏବଂ ଅନୋମାଲି ଅଡିଟ୍ ସଂପାଦନ...",
      "scan.reportTitle": "AI ପ୍ରାମାଣିକତା ଏବଂ ଅଡିଟ୍ ରିପୋର୍ଟ",
      "scan.fraudScore": "୯୯.୪% ପ୍ରାମାଣିକତା ସ୍କୋର (ସଫଳ)",
      "scan.cryptoCheck": "SHA-256 ଫିଙ୍ଗରପ୍ରିଣ୍ଟ ପ୍ରଦତ୍ତ ପେଲୋଡ୍ ସହିତ ମେଳ ଖାଉଛି",
      "scan.revocationStatus": "ସକ୍ରିୟ (Status List ଯାଞ୍ଚ ସଫଳ)",

      // Public Verify Portal
      "verify.title": "ଯାଞ୍ଚଯୋଗ୍ୟ ଦକ୍ଷତା ପାସପୋର୍ଟ ପ୍ରମାଣିତ",
      "verify.subtitle": "W3C Verifiable Credentials ମାନକ ଅନୁଯାୟୀ କ୍ରିପ୍ଟୋଗ୍ରାଫିକାଲି ବୈଧ",
      "verify.status": "କ୍ରିପ୍ଟୋଗ୍ରାଫିକାଲି ଯାଞ୍ଚ ହୋଇଛି",
      "verify.hashLabel": "ଡାଇନାମିକ୍ SHA-256 ଅଖଣ୍ଡତା ଯାଞ୍ଚ: ସଫଳ (PASSED)",
      "verify.hashExpl": "କ୍ଲାଏଣ୍ଟ-ସାଇଡ୍ ହିସାବ କରାଯାଇଥିବା ହ୍ୟାସ୍ ଲେଜର ସ୍ୱାକ୍ଷର ସହିତ ମେଳ ଖାଉଛି।",
      "verify.ledgerSig": "ଲେଜର ଟାର୍ଗେଟ୍ ହ୍ୟାସ୍ ସ୍ୱାକ୍ଷର",
      "verify.liveHash": "ଲାଇଭ୍ ୱେବ୍ କ୍ରିପ୍ଟୋ ହ୍ୟାସ୍",
      "verify.authenticSkills": "ପ୍ରମାଣିତ ପ୍ରଦର୍ଶିତ ଦକ୍ଷତା",
      "verify.back": "ପ୍ଲାଟଫର୍ମକୁ ଫେରନ୍ତୁ",
      "verify.downloadVC": "JSON-LD VC ଡାଉନଲୋଡ୍",
      "verify.printCert": "ସାର୍ଟିଫିକେଟ୍ ପ୍ରିଣ୍ଟ୍",

      // Footer
      "footer.tagline": "ପ୍ରମାଣ ମାଧ୍ୟମରେ ଛାତ୍ରମାନଙ୍କୁ ସଶକ୍ତ କରିବା, ଦାବି ନୁହେଁ।",
      "footer.howItWorks": "ଏହା କିପରି କାମ କରେ",
      "footer.onboarding": "ଛାତ୍ର ଅନବୋର୍ଡିଂ",
      "footer.fairness": "ନୈତିକ AI ଅଡିଟ୍",
      "footer.verify": "ସାର୍ବଜନୀନ ଯାଞ୍ଚ",
      "footer.privacy": "ଗୋପନୀୟତା ଡିଜାଇନ୍"
    },
    ta: {
      // Navbar
      "navbar.home": "முகப்பு",
      "navbar.dashboard": "டாஷ்போர்டு",
      "navbar.passport": "திறன் கடவுச்சீட்டு",
      "navbar.match": "பொருத்தம்",
      "navbar.evidence": "சான்றுகள்",
      "navbar.teams": "குழுக்கள்",
      "navbar.audit": "தணிக்கை",
      "navbar.verify": "சரிபார்க்கவும்",
      "navbar.login": "உள்நுழைக",
      "navbar.signup": "பதிவு செய்க",
      "navbar.logout": "வெளியேறுக",
      "navbar.poweredByBhashini": "பாஷினி AI இயந்திரம் மூலம் இயக்கப்படுகிறது",

      // Dashboard
      "dashboard.sihBadge": "🇮🇳 ஸ்மார்ட் இந்தியா ஹேக்கத்தான் 2026",
      "dashboard.title": "மாணவர் திறன் கடவுச்சீட்டு",
      "dashboard.ncrf": "NCrF கல்வி கிரெடிட்கள்",
      "dashboard.greeting": "வணக்கம்",
      "dashboard.subtitle": "உங்கள் சரிபார்க்கப்பட்ட திறன்கள் மற்றும் NCrF கல்வி கிரெடிட்கள்.",
      "dashboard.syncApaar": "APAAR / DigiLocker உடன் ஒத்திசைக்கவும்",
      "dashboard.addEvidence": "சான்று சேர்க்க",
      "dashboard.uploadCert": "சான்றிதழ் பதிவேற்றவும் (Vision-AI)",
      "dashboard.publicVerification": "பொது சரிபார்ப்பு",
      "dashboard.passportTitle": "திறன் கடவுச்சீட்டு",
      "dashboard.mySecurePassport": "என் பாதுகாப்பான கடவுச்சீட்டு",
      "dashboard.tier": "மறைகுறியாக்க சரிபார்க்கப்பட்ட நிலை",
      "dashboard.passportInstruction": "100% சரிபார்ப்பு நம்பிக்கையை அடைய நிலுவையில் உள்ள சான்றுகளை முடிக்கவும்.",
      "dashboard.verifiedSkills": "சரிபார்க்கப்பட்ட திறன்கள்",
      "dashboard.evidenceItems": "சான்று பதிவுகள்",
      "dashboard.opportunityMatches": "வாய்ப்பு பொருத்தங்கள்",
      "dashboard.teamMatches": "குழு பொருத்தங்கள்",
      "dashboard.aiNextSkill": "AI பரிந்துரைத்த அடுத்த திறன்",
      "dashboard.viewLearningPath": "கற்றல் பாதையைக் காண்க",
      "dashboard.ncrfTitle": "NCrF மேப்பிங்",
      "dashboard.ncrfCredits": "NCrF கல்வி கிரெடிட்கள் பெறப்பட்டன",
      "dashboard.qrTitle": "நேரடி QR குறியீடு",
      "dashboard.qrSub": "சரிபார்க்க ஸ்கேன் செய்க",
      "dashboard.copyLink": "இணைப்பை நகலெடு",
      "dashboard.openLink": "இணைப்பைத் திற",
      "dashboard.emptyStateTitle": "இன்னும் சான்றிதழ்கள் பதிவேற்றப்படவில்லை",
      "dashboard.emptyStateSub": "தொடங்க 'DigiLocker இலிருந்து இறக்குமதி' செய்க அல்லது சான்றிதழைப் பதிவேற்றவும்.",
      "dashboard.importDigiLocker": "DigiLocker இலிருந்து இறக்குமதி",

      // AI Scan & Verification
      "scan.overlayTitle": "Vision-AI இயந்திரம் மூலம் சான்றிதழ் ஸ்கேன் செய்யப்படுகிறது...",
      "scan.step1": "[1] ஆவண OCR மற்றும் மெட்டாடேட்டா பிரித்தெடுக்கப்படுகிறது...",
      "scan.step2": "[2] டிஜிட்டல் கையொப்பம் மற்றும் முத்திரை சரிபார்ப்பு...",
      "scan.step3": "[3] SHA-256 ஹாஷ் பொருத்தம் கணக்கிடப்படுகிறது...",
      "scan.step4": "[4] நெறிமுறை AI மோசடி மற்றும் தணிக்கை செயல்படுத்தல்...",
      "scan.reportTitle": "AI நம்பகத்தன்மை & தணிக்கை அறிக்கை",
      "scan.fraudScore": "99.4% நம்பகத்தன்மை மதிப்பெண் (வெற்றி)",
      "scan.cryptoCheck": "SHA-256 கைரேகை வழங்கப்பட்ட பேலோடுடன் பொருந்துகிறது",
      "scan.revocationStatus": "செயலில் உள்ளது (Status List சரிபார்ப்பு வெற்றி)",

      // Public Verify Portal
      "verify.title": "சரிபார்க்கக்கூடிய திறன் கடவுச்சீட்டு அங்கீகரிக்கப்பட்டது",
      "verify.subtitle": "W3C தரநிலைகள் மூலம் மறைகுறியாக்க சரிபார்க்கப்பட்டது",
      "verify.status": "மறைகுறியாக்க சரிபார்க்கப்பட்டது",
      "verify.hashLabel": "டைனமிக் SHA-256 ஒருமைப்பாடு சரிபார்ப்பு: வெற்றி (PASSED)",
      "verify.hashExpl": "கிளையன்ட்-பக்க கணக்கிடப்பட்ட ஹாஷ் லெட்ஜர் கையொப்பத்துடன் பொருந்துகிறது.",
      "verify.ledgerSig": "லெட்ஜர் இலக்கு ஹாஷ் கையொப்பம்",
      "verify.liveHash": "நேரடி வெப் கிரிப்டோ ஹாஷ்",
      "verify.authenticSkills": "உண்மையான நிரூபிக்கப்பட்ட திறன்கள்",
      "verify.back": "தளத்திற்குத் திரும்பு",
      "verify.downloadVC": "JSON-LD VC பதிவிறக்கு",
      "verify.printCert": "சான்றிதழை அச்சிடுக",

      // Footer
      "footer.tagline": "சான்றுகள் மூலம் மாணவர்களுக்கு அதிகாரம் அளித்தல், கூற்றுக்கள் மூலம் அல்ல.",
      "footer.howItWorks": "எப்படி செயல்படுகிறது",
      "footer.onboarding": "மாணவர் பதிவு",
      "footer.fairness": "நெறிமுறை AI தணிக்கை",
      "footer.verify": "பொது சரிபார்ப்பு",
      "footer.privacy": "தனியுரிமை வடிவமைப்பு"
    }
  },

  t(key, fallback = "") {
    const lang = this.currentLanguage || 'en';
    const dict = this.translations[lang] || this.translations['en'];
    return (dict && dict[key]) || (this.translations['en'] && this.translations['en'][key]) || fallback || key;
  },

  setLanguage(lang) {
    if (!this.translations[lang]) lang = 'en';
    this.currentLanguage = lang;
    try {
      localStorage.setItem('veriskill_lang', lang);
    } catch (e) {}

    const langNames = { en: 'English', hi: 'हिंदी (Hindi)', or: 'ଓଡ଼ିଆ (Odia)', ta: 'தமிழ் (Tamil)' };
    Utils.showToast(`Bhashini AI: Language switched to ${langNames[lang] || lang}`, 'info');

    // Trigger instant synchronous re-render across the entire active page, navbar, and footer
    if (typeof window !== 'undefined' && window.App) {
      window.App.handleRoute();
      if (typeof window.App.renderFooter === 'function') {
        window.App.renderFooter();
      }
    }
  }
};
