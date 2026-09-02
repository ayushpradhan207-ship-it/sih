import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const dictionary = {
  en: {
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

    "dashboard.title": "Student Skill Passport",
    "dashboard.mySecurePassport": "My Secure Passport",
    "dashboard.ncrf": "NCrF Credits Earned",
    "dashboard.verifiedSkills": "Verified Skills",
    "dashboard.syncApaar": "Sync with APAAR ID / DigiLocker",
    "dashboard.uploadCert": "Upload Certificate (Vision-AI Scan)",
    "dashboard.emptyStateTitle": "No credentials uploaded yet",
    "dashboard.emptyStateSub": "Click 'Import from DigiLocker' or upload a certificate to begin your verifiable skill journey.",

    "scan.overlayTitle": "Scanning Credential via Vision-AI Engine...",
    "scan.step1": "[1] Extracting Document OCR & Metadata...",
    "scan.step2": "[2] Verifying Digital Signature & Issuer Seal...",
    "scan.step3": "[3] Computing SHA-256 Payload Hash Matching...",
    "scan.step4": "[4] Executing Ethical AI Fraud & Anomaly Audit...",
    "scan.reportTitle": "AI Authenticity & Audit Report",
    "scan.fraudScore": "99.4% Authenticity Score (Passed)",
    "scan.cryptoCheck": "SHA-256 Fingerprint Matches Issued Payload",
    "scan.revocationStatus": "ACTIVE (Status List Check Passed)",

    "verify.title": "Verifiable Skill Passport Authenticated",
    "verify.status": "Cryptographically Verified",
    "verify.hashLabel": "SHA-256 Data Integrity Check",
    "verify.hashExpl": "SHA-256 is used as a one-way tamper-proof fingerprint for payload verification."
  },
  hi: {
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

    "dashboard.title": "छात्र कौशल पासपोर्ट",
    "dashboard.mySecurePassport": "मेरा सुरक्षित पासपोर्ट",
    "dashboard.ncrf": "NCrF क्रेडिट प्राप्त हुए",
    "dashboard.verifiedSkills": "सत्यापित कौशल",
    "dashboard.syncApaar": "अपार (APAAR) / डिजिलॉकर से सिंक करें",
    "dashboard.uploadCert": "प्रमाणपत्र अपलोड करें (विज़न-एआई स्कैन)",
    "dashboard.emptyStateTitle": "अभी तक कोई प्रमाणपत्र अपलोड नहीं किया गया",
    "dashboard.emptyStateSub": "शुरू करने के लिए 'डिजिलॉकर से आयात करें' पर क्लिक करें या प्रमाणपत्र अपलोड करें।",

    "scan.overlayTitle": "विज़न-एआई इंजन द्वारा क्रेडेंशियल स्कैनिंग जारी...",
    "scan.step1": "[1] दस्तावेज़ ओसीआर एवं मेटाडेटा निकाला जा रहा है...",
    "scan.step2": "[2] डिजिटल हस्ताक्षर एवं जारीकर्ता सील का सत्यापन...",
    "scan.step3": "[3] SHA-256 पेलोड हैश मिलान की गणना...",
    "scan.step4": "[4] नैतिक एआई धोखाधड़ी एवं विसंगति ऑडिट निष्पादन...",
    "scan.reportTitle": "एआई प्रामाणिकता एवं ऑडिट रिपोर्ट",
    "scan.fraudScore": "99.4% प्रामाणिकता स्कोर (उत्तीर्ण)",
    "scan.cryptoCheck": "SHA-256 फिंगरप्रिंट जारी किए गए पेलोड से मेल खाता है",
    "scan.revocationStatus": "सक्रिय (स्टेटस लिस्ट जांच सफल)",

    "verify.title": "सत्यापनीय कौशल पासपोर्ट प्रमाणित",
    "verify.status": "क्रिप्टोग्राफिक रूप से सत्यापित",
    "verify.hashLabel": "SHA-256 डेटा अखंडता जांच",
    "verify.hashExpl": "डेटा अखंडता जांच के लिए SHA-256 वन-वे फिंगरप्रिंट का उपयोग किया जाता है।"
  },
  or: {
    "navbar.home": "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    "navbar.dashboard": "ଡ୍ୟାସବୋର୍ଡ",
    "navbar.passport": "ଦକ୍ଷତା ପାସପୋର୍ଟ",
    "navbar.match": "ମ୍ୟାଚ୍",
    "navbar.evidence": "ପ୍ରମାଣ ଏବଂ ଗ୍ୟାପ୍",
    "navbar.teams": "ଦଳ",
    "navbar.audit": "ଅଡିଟ୍",
    "navbar.verify": "ପ୍ରମାଣପତ୍ର ଯାଞ୍ଚ",
    "navbar.login": "ଲଗ୍ ଇନ୍",
    "navbar.signup": "ସାଇନ୍ ଅପ୍",
    "navbar.logout": "ଲଗ୍ ଆଉଟ୍",
    "navbar.poweredByBhashini": "ଭାଷିଣୀ ଏଆଇ ଇଞ୍ଜିନ ଦ୍ୱାରା ପରିଚାଳିତ",

    "dashboard.title": "ଛାତ୍ର ଦକ୍ଷତା ପାସପୋର୍ଟ",
    "dashboard.mySecurePassport": "ମୋର ସୁରକ୍ଷିତ ପାସପୋର୍ଟ",
    "dashboard.ncrf": "NCrF କ୍ରେଡିଟ୍ ପ୍ରାପ୍ତ",
    "dashboard.verifiedSkills": "ଯାଞ୍ଚ ହୋଇଥିବା ଦକ୍ଷତା",
    "dashboard.syncApaar": "APAAR / ଡିଜିଲକର ସହିତ ସିଙ୍କ୍ କରନ୍ତୁ",
    "dashboard.uploadCert": "ସାର୍ଟିଫିକେଟ୍ ଅପଲୋଡ୍ (Vision-AI)",
    "dashboard.emptyStateTitle": "କୌଣସି ପ୍ରମାଣପତ୍ର ଏପର୍ଯ୍ୟନ୍ତ ଅପଲୋଡ୍ ହୋଇନାହିଁ",
    "dashboard.emptyStateSub": "ଆରମ୍ଭ କରିବା ପାଇଁ 'DigiLocker ରୁ ଆମଦାନୀ' କରନ୍ତୁ କିମ୍ବା ଏକ ସାର୍ଟିଫିକେଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ।",

    "scan.overlayTitle": "Vision-AI ଇଞ୍ଜିନ ଦ୍ୱାରା ସାର୍ଟିଫିକେଟ୍ ସ୍କାନିଂ ଜାରି ରହିଛି...",
    "scan.step1": "[1] ଡକ୍ୟୁମେଣ୍ଟ୍ OCR ଏବଂ ମେଟାଡାଟା ବାହାର କରାଯାଉଛି...",
    "scan.step2": "[2] ଡିଜିଟାଲ୍ ଦସ୍ତଖତ ଏବଂ ପ୍ରଦାନକାରୀ ସିଲ୍ ଯାଞ୍ଚ...",
    "scan.step3": "[3] SHA-256 ପେଲୋଡ୍ ହ୍ୟାସ୍ ମେଳଣ ଗଣନା...",
    "scan.step4": "[4] ନୈତିକ AI ଫ୍ରଡ୍ ଏବଂ ଅନୋମାଲି ଅଡିଟ୍ ସଂପାଦନ...",
    "scan.reportTitle": "AI ପ୍ରାମାଣିକତା ଏବଂ ଅଡିଟ୍ ରିପୋର୍ଟ",
    "scan.fraudScore": "୯୯.୪% ପ୍ରାମାଣିକତା ସ୍କୋର (ସଫଳ)",
    "scan.cryptoCheck": "SHA-256 ଫିଙ୍ଗରପ୍ରିଣ୍ଟ ପ୍ରଦତ୍ତ ପେଲୋଡ୍ ସହିତ ମେଳ ଖାଉଛି",
    "scan.revocationStatus": "ସକ୍ରିୟ (Status List ଯାଞ୍ଚ ସଫଳ)",

    "verify.title": "ଯାଞ୍ଚଯୋଗ୍ୟ ଦକ୍ଷତା ପାସପୋର୍ଟ ପ୍ରମାଣିତ",
    "verify.status": "କ୍ରିପ୍ଟୋଗ୍ରାଫିକାଲି ଯାଞ୍ଚ ହୋଇଛି",
    "verify.hashLabel": "SHA-256 ଡାଟା ଅଖଣ୍ଡତା ଯାଞ୍ଚ",
    "verify.hashExpl": "ଡାଟା ଅଖଣ୍ଡତା ନିଶ୍ଚିତ କରିବାକୁ SHA-256 ଫିଙ୍ଗରପ୍ରିଣ୍ଟ ବ୍ୟବହାର କରାଯାଏ।"
  },
  ta: {
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

    "dashboard.title": "மாணவர் திறன் கடவுச்சீட்டு",
    "dashboard.mySecurePassport": "என் பாதுகாப்பான கடவுச்சீட்டு",
    "dashboard.ncrf": "NCrF கல்வி கிரெடிட்கள்",
    "dashboard.verifiedSkills": "சரிபார்க்கப்பட்ட திறன்கள்",
    "dashboard.syncApaar": "APAAR / DigiLocker உடன் ஒத்திசைக்கவும்",
    "dashboard.uploadCert": "சான்றிதழ் பதிவேற்றவும் (Vision-AI)",
    "dashboard.emptyStateTitle": "இன்னும் சான்றிதழ்கள் பதிவேற்றப்படவில்லை",
    "dashboard.emptyStateSub": "தொடங்க 'DigiLocker இலிருந்து இறக்குமதி' செய்க அல்லது சான்றிதழைப் பதிவேற்றவும்.",

    "scan.overlayTitle": "Vision-AI இயந்திரம் மூலம் சான்றிதழ் ஸ்கேன் செய்யப்படுகிறது...",
    "scan.step1": "[1] ஆவண OCR மற்றும் மெட்டாடேட்டா பிரித்தெடுக்கப்படுகிறது...",
    "scan.step2": "[2] டிஜிட்டல் கையொப்பம் மற்றும் முத்திரை சரிபார்ப்பு...",
    "scan.step3": "[3] SHA-256 ஹாஷ் பொருத்தம் கணக்கிடப்படுகிறது...",
    "scan.step4": "[4] நெறிமுறை AI மோசடி மற்றும் தணிக்கை செயல்படுத்தல்...",
    "scan.reportTitle": "AI நம்பகத்தன்மை & தணிக்கை அறிக்கை",
    "scan.fraudScore": "99.4% நம்பகத்தன்மை மதிப்பெண் (வெற்றி)",
    "scan.cryptoCheck": "SHA-256 கைரேகை வழங்கப்பட்ட பேலோடுடன் பொருந்துகிறது",
    "scan.revocationStatus": "செயலில் உள்ளது (Status List சரிபார்ப்பு வெற்றி)",

    "verify.title": "சரிபார்க்கக்கூடிய திறன் கடவுச்சீட்டு அங்கீகரிக்கப்பட்டது",
    "verify.status": "மறைகுறியாக்க சரிபார்க்கப்பட்டது",
    "verify.hashLabel": "SHA-256 தரவு ஒருமைப்பாடு சரிபார்ப்பு",
    "verify.hashExpl": "தரவு ஒருமைப்பாட்டிற்காக SHA-256 பயன்படுத்தப்படுகிறது."
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    return localStorage.getItem('veriskill_lang') || 'en';
  });

  const setLanguage = (lang) => {
    if (!dictionary[lang]) lang = 'en';
    setCurrentLanguageState(lang);
    localStorage.setItem('veriskill_lang', lang);
  };

  const t = (key, fallback = '') => {
    const lang = currentLanguage || 'en';
    const dict = dictionary[lang] || dictionary['en'];
    return dict[key] || dictionary['en'][key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, translations: dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
