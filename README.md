# ScholarSpot (स्कॉलरस्पॉट) 🇮🇳
### India's Premier Scholarship & Government Scheme Portal for Students

ScholarSpot is a high-performance, dark-themed single-page web application (SPA) designed to help Indian students (Class 9–12, Undergraduate, Postgraduate, Diploma, and Professional courses) discover every government scheme and scholarship they are eligible for.

---

## 🌟 Key Features

1. **AI Chatbot Assistant (ScholarBot)**:
   - Floating interactive assistant answering queries on scheme rules, mandatory certificates, bank NPCI seeding, and application deadlines.
   - Evaluates the student's live profile to recommend top matched grants with 1-click details.

2. **Multilingual Bharat & Regional Languages Section**:
   - Comprehensive regional language support across **7 languages**:
     - English
     - Hindi (हिंदी)
     - Marathi (मराठी) — Supporting MahaDBT students
     - Kannada (ಕನ್ನಡ) — Supporting SSP Karnataka students
     - Bengali (বাংলা) — Supporting SVMCM West Bengal students
     - Telugu (తెలుగు)
     - Tamil (தமிழ்)
   - One-click language switching from both the top navigation bar and the dedicated language section.

3. **Eligibility-First Matching Engine**:
   - Evaluates multi-factor criteria: annual family income cap, social category (SC/ST/OBC/EWS/General/Minority), state of domicile, gender quotas, and PwD disability status.
   - Outputs ranked results with explicit reasons for each match (`Income ≤ ₹2.5L ✓`, `Category: OBC ✓`, `Domicile: Maharashtra ✓`).

4. **Cyber-Civic Dark Theme & Animated Interactions**:
   - Fluid spring physics using `framer-motion` and `canvas-confetti`.
   - Dynamic animated Gender cards (Female, Male, All) with exclusive scheme hints.
   - Interactive Age Dial with live birth year estimation and dynamic academic cohort badges.

5. **Student Profile, Authentication & e-KYC**:
   - DigiLocker Direct Connect simulation for instant Aadhaar verification and credential auto-fill.
   - Mobile OTP 6-digit login.
   - Student dashboard in the navigation bar displaying e-KYC status and NPCI bank seeding indicators.

6. **High-Fidelity Dataset (26+ Real Schemes)**:
   - **Central Government**: National Scholarship Portal (NSP), PM-YASASVI, Post-Matric SC/ST, Begum Hazrat Mahal, AICTE Pragati, AICTE Saksham, Ishan Uday, DST INSPIRE SHE, NMMSS.
   - **State Government**: Maharashtra MahaDBT (EBC Fee Waiver, Panjabrao Deshmukh Hostel Grant), Uttar Pradesh Dashmottar Scholarship, Karnataka SSP, West Bengal SVMCM & Kanyashree K2, Kerala Suvarna Jubilee, Rajasthan Chief Minister Scholarship.
   - **Corporate & CSR Grants**: Reliance Foundation UG & PG, SBI Asha, HDFC Parivartan ECSS, Kotak Kanya, Tata Trusts Healthcare, Aditya Birla Capital, Santoor Women's Scholarship.

7. **Universal Document Locker & CSC Print Mode**:
   - Real-time document tracker (Aadhaar, Tahsildar Income Certificate, Caste Validity, Bonafide, Domicile, Bank Passbook).
   - Single-click print view (`@media print`) designed for students visiting an Internet Cyber Cafe or Common Service Centre (CSC / Jan Seva Kendra).

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build

# Preview production build
npm run preview -- --port 3000
```

The application is accessible at `http://localhost:3000/`.
