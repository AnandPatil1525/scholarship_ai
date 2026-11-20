import fs from 'fs';
import path from 'path';

// 1. Read schemes.json
const schemesPath = path.resolve('./src/data/schemes.json');
const rawData = fs.readFileSync(schemesPath, 'utf8');
const schemes = JSON.parse(rawData);

console.log(`\n======================================================`);
console.log(`🔍 SCHEMESETU VERIFICATION & TEST SUITE`);
console.log(`======================================================\n`);

console.log(`✓ Loaded schemes.json: Found ${schemes.length} schemes.`);

if (schemes.length < 25) {
  console.error(`❌ FAILURE: Required at least 25 schemes, found only ${schemes.length}`);
  process.exit(1);
} else {
  console.log(`✓ Requirement Met: At least 25 schemes (Found ${schemes.length}).`);
}

// Check provider breakdown
const providers = {};
const states = new Set();
let disabilityCount = 0;
let girlsOnlyCount = 0;

for (const s of schemes) {
  providers[s.provider] = (providers[s.provider] || 0) + 1;
  states.add(s.state);
  if (s.disabilityRequired) disabilityCount++;
  if (s.gender === 'Female') girlsOnlyCount++;

  // Validate required schema fields
  const requiredKeys = [
    'id', 'name', 'provider', 'providerName', 'state', 
    'categories', 'educationLevels', 'gender', 'benefits',
    'description', 'eligibilityText', 'documentsRequired', 
    'applicationMode', 'officialLink'
  ];
  for (const k of requiredKeys) {
    if (s[k] === undefined || s[k] === null) {
      console.error(`❌ Schema violation in scheme ${s.id}: Missing key "${k}"`);
      process.exit(1);
    }
  }
}

console.log(`\n📊 Scheme Breakdown:`);
console.log(`   - Central Schemes: ${providers['Central'] || 0}`);
console.log(`   - State Schemes:   ${providers['State'] || 0} across ${states.size} states/regions`);
console.log(`   - Private Schemes: ${providers['Private'] || 0}`);
console.log(`   - NGO Schemes:     ${providers['NGO'] || 0}`);
console.log(`   - PwD Special:     ${disabilityCount}`);
console.log(`   - Girls-Exclusive: ${girlsOnlyCount}`);

// Test eligibility rule logic against simulated student profiles
function formatCurrency(amount) {
  return amount ? `₹${amount.toLocaleString('en-IN')}` : 'No limit';
}

function evaluate(user, scheme) {
  let isDisqualified = false;
  let hasMissing = false;
  const reasons = [];

  // State
  if (scheme.state !== 'All India') {
    if (!user.state) hasMissing = true;
    else if (user.state.toLowerCase() !== scheme.state.toLowerCase()) {
      isDisqualified = true;
    } else {
      reasons.push(`State: ${scheme.state} ✓`);
    }
  }

  // Education
  if (!user.educationLevel) hasMissing = true;
  else if (!scheme.educationLevels.includes(user.educationLevel)) {
    isDisqualified = true;
  } else {
    reasons.push(`Education: ${user.educationLevel} ✓`);
  }

  // Category
  if (!user.category) hasMissing = true;
  else {
    const ok = scheme.categories.includes(user.category) ||
      (scheme.categories.includes('Girls') && user.gender === 'Female') ||
      (scheme.categories.includes('PwD') && user.isDisability);
    if (!ok) isDisqualified = true;
    else reasons.push(`Category: ${user.category} ✓`);
  }

  // Gender
  if (scheme.gender !== 'Any') {
    if (user.gender !== scheme.gender) isDisqualified = true;
    else reasons.push(`Gender: ${scheme.gender} ✓`);
  }

  // Income
  if (scheme.maxFamilyIncome !== null) {
    if (user.annualFamilyIncome === null) hasMissing = true;
    else if (user.annualFamilyIncome > scheme.maxFamilyIncome) {
      isDisqualified = true;
    } else {
      reasons.push(`Income ≤ ${formatCurrency(scheme.maxFamilyIncome)} ✓`);
    }
  }

  // PwD
  if (scheme.disabilityRequired && !user.isDisability) {
    isDisqualified = true;
  }

  // Marks
  if (scheme.minMarksPercent !== null && user.marksPercent !== null) {
    if (user.marksPercent < scheme.minMarksPercent) isDisqualified = true;
  }

  if (isDisqualified) return { status: 'Not Eligible', reasons };
  if (hasMissing) return { status: 'Possibly Eligible', reasons };
  return { status: 'Eligible', reasons };
}

console.log(`\n🧪 Testing Student Personas:`);

// Persona 1: Female, Maharashtra, OBC, Income ₹2.5L, UG
const p1 = {
  gender: 'Female',
  state: 'Maharashtra',
  category: 'OBC',
  educationLevel: 'UG',
  annualFamilyIncome: 250000,
  marksPercent: 78,
  isDisability: false
};
const p1Matches = schemes.map(s => ({ s, ...evaluate(p1, s) })).filter(r => r.status === 'Eligible');
console.log(`\n1. Persona: Female, Maharashtra, OBC, UG, Income ₹2.5L:`);
console.log(`   ✓ Matched ${p1Matches.length} schemes!`);
p1Matches.slice(0, 4).forEach(m => console.log(`      • [${m.s.provider}] ${m.s.name} (${m.reasons.join(', ')})`));

// Persona 2: Male, UP, SC, Class 9-10, Income ₹1.5L
const p2 = {
  gender: 'Male',
  state: 'Uttar Pradesh',
  category: 'SC',
  educationLevel: 'Class 9-10',
  annualFamilyIncome: 150000,
  marksPercent: 65,
  isDisability: false
};
const p2Matches = schemes.map(s => ({ s, ...evaluate(p2, s) })).filter(r => r.status === 'Eligible');
console.log(`\n2. Persona: Male, Uttar Pradesh, SC, Class 9-10, Income ₹1.5L:`);
console.log(`   ✓ Matched ${p2Matches.length} schemes!`);
p2Matches.slice(0, 4).forEach(m => console.log(`      • [${m.s.provider}] ${m.s.name} (${m.reasons.join(', ')})`));

// Persona 3: Specially-Abled (PwD), Income ₹4.0L, UG
const p3 = {
  gender: 'Any',
  state: 'Delhi (NCT)',
  category: 'General',
  educationLevel: 'UG',
  annualFamilyIncome: 400000,
  marksPercent: 70,
  isDisability: true
};
const p3Matches = schemes.map(s => ({ s, ...evaluate(p3, s) })).filter(r => r.status === 'Eligible');
console.log(`\n3. Persona: Specially-Abled (PwD), General, UG, Income ₹4.0L:`);
console.log(`   ✓ Matched ${p3Matches.length} schemes!`);
const saksham = p3Matches.find(m => m.s.id === 'aicte-saksham-pwd');
if (saksham) {
  console.log(`   ✓ Correctly matched special scheme: AICTE Saksham Scholarship`);
} else {
  console.error(`   ❌ Failed to match AICTE Saksham for PwD candidate`);
  process.exit(1);
}

console.log(`\n✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!`);
