import { Scheme, UserProfile, MatchResult, CriterionResult } from '../types';
import { formatIndianCurrency } from './formatters';

export function evaluateEligibility(user: UserProfile, scheme: Scheme): MatchResult {
  const criteriaBreakdown: CriterionResult[] = [];
  const matchedReasons: string[] = [];
  const failedReasons: string[] = [];
  let isDisqualified = false;
  let hasMissingInfo = false;

  // 1. Domicile / State Check
  if (scheme.state !== 'All India') {
    if (!user.state) {
      criteriaBreakdown.push({
        label: 'State / Domicile',
        passed: false,
        neutral: true,
        reason: `Requires domicile in ${scheme.state} (Select your state to verify)`
      });
      hasMissingInfo = true;
    } else if (user.state.toLowerCase() === scheme.state.toLowerCase()) {
      criteriaBreakdown.push({
        label: 'State / Domicile',
        passed: true,
        reason: `Domicile: ${user.state} qualifies for ${scheme.state} state scheme`
      });
      matchedReasons.push(`State: ${scheme.state} ✓`);
    } else {
      criteriaBreakdown.push({
        label: 'State / Domicile',
        passed: false,
        reason: `Requires domicile of ${scheme.state}; your profile is ${user.state}`
      });
      failedReasons.push(`Only for ${scheme.state} domicile`);
      isDisqualified = true;
    }
  } else {
    criteriaBreakdown.push({
      label: 'Geographic Scope',
      passed: true,
      reason: 'Pan-India scheme (All states and UTs eligible)'
    });
  }

  // 2. Education Level Check
  if (!user.educationLevel) {
    criteriaBreakdown.push({
      label: 'Education Level',
      passed: false,
      neutral: true,
      reason: `Applicable for: ${scheme.educationLevels.join(', ')} (Select your level)`
    });
    hasMissingInfo = true;
  } else if (scheme.educationLevels.includes(user.educationLevel)) {
    criteriaBreakdown.push({
      label: 'Education Level',
      passed: true,
      reason: `Education: ${user.educationLevel} is covered`
    });
    matchedReasons.push(`Education: ${user.educationLevel} ✓`);
  } else {
    criteriaBreakdown.push({
      label: 'Education Level',
      passed: false,
      reason: `Requires ${scheme.educationLevels.join(' or ')}; your level is ${user.educationLevel}`
    });
    failedReasons.push(`Requires ${scheme.educationLevels.join('/')}`);
    isDisqualified = true;
  }

  // 3. Social Category Check
  if (!user.category) {
    criteriaBreakdown.push({
      label: 'Category',
      passed: false,
      neutral: true,
      reason: `Open to: ${scheme.categories.join(', ')} (Select your category)`
    });
    hasMissingInfo = true;
  } else {
    const isCategoryEligible =
      scheme.categories.includes(user.category) ||
      (scheme.categories.includes('Girls') && user.gender === 'Female') ||
      (scheme.categories.includes('PwD') && user.isDisability);

    if (isCategoryEligible) {
      criteriaBreakdown.push({
        label: 'Social Category',
        passed: true,
        reason: `Category: ${user.category} is accepted for this grant`
      });
      matchedReasons.push(`Category: ${user.category} ✓`);
    } else {
      criteriaBreakdown.push({
        label: 'Social Category',
        passed: false,
        reason: `Restricted to ${scheme.categories.join(', ')}; you selected ${user.category}`
      });
      failedReasons.push(`Only for ${scheme.categories.join(', ')}`);
      isDisqualified = true;
    }
  }

  // 4. Gender Check
  if (scheme.gender !== 'Any') {
    if (user.gender === 'Any') {
      criteriaBreakdown.push({
        label: 'Gender Eligibility',
        passed: false,
        neutral: true,
        reason: `Reserved for ${scheme.gender} candidates`
      });
      hasMissingInfo = true;
    } else if (user.gender === scheme.gender) {
      criteriaBreakdown.push({
        label: 'Gender Eligibility',
        passed: true,
        reason: `Candidate gender matches reserved ${scheme.gender} quota`
      });
      matchedReasons.push(`Gender: ${scheme.gender} ✓`);
    } else {
      criteriaBreakdown.push({
        label: 'Gender Eligibility',
        passed: false,
        reason: `Exclusive to ${scheme.gender} students`
      });
      failedReasons.push(`Reserved for ${scheme.gender} candidates`);
      isDisqualified = true;
    }
  }

  // 5. Annual Family Income Check
  if (scheme.maxFamilyIncome !== null) {
    if (user.annualFamilyIncome === null) {
      criteriaBreakdown.push({
        label: 'Annual Family Income',
        passed: false,
        neutral: true,
        reason: `Income limit is ${formatIndianCurrency(scheme.maxFamilyIncome)}/yr (Provide income to verify)`
      });
      hasMissingInfo = true;
    } else if (user.annualFamilyIncome <= scheme.maxFamilyIncome) {
      criteriaBreakdown.push({
        label: 'Annual Family Income',
        passed: true,
        reason: `Family income ${formatIndianCurrency(user.annualFamilyIncome)} is within limit (${formatIndianCurrency(scheme.maxFamilyIncome)})`
      });
      matchedReasons.push(`Income ≤ ${formatIndianCurrency(scheme.maxFamilyIncome, true)} ✓`);
    } else {
      criteriaBreakdown.push({
        label: 'Annual Family Income',
        passed: false,
        reason: `Family income ${formatIndianCurrency(user.annualFamilyIncome)} exceeds the ceiling of ${formatIndianCurrency(scheme.maxFamilyIncome)}`
      });
      failedReasons.push(`Income exceeds ${formatIndianCurrency(scheme.maxFamilyIncome, true)} limit`);
      isDisqualified = true;
    }
  } else {
    criteriaBreakdown.push({
      label: 'Family Income',
      passed: true,
      reason: 'No family income ceiling for this scheme'
    });
  }

  // 6. Disability (PwD) Criteria
  if (scheme.disabilityRequired) {
    if (user.isDisability) {
      criteriaBreakdown.push({
        label: 'Disability Status (PwD)',
        passed: true,
        reason: 'Candidate meets PwD qualification criteria'
      });
      matchedReasons.push('PwD Eligible ✓');
    } else {
      criteriaBreakdown.push({
        label: 'Disability Status (PwD)',
        passed: false,
        reason: 'This scheme is specifically reserved for Specially-Abled (PwD) students'
      });
      failedReasons.push('Reserved for PwD (Specially Abled) candidates');
      isDisqualified = true;
    }
  }

  // 7. Academic Marks Check
  if (scheme.minMarksPercent !== null) {
    if (user.marksPercent === null) {
      criteriaBreakdown.push({
        label: 'Minimum Qualifying Marks',
        passed: false,
        neutral: true,
        reason: `Requires minimum ${scheme.minMarksPercent}% in previous exam`
      });
    } else if (user.marksPercent >= scheme.minMarksPercent) {
      criteriaBreakdown.push({
        label: 'Academic Performance',
        passed: true,
        reason: `Marks scored (${user.marksPercent}%) meet minimum required (${scheme.minMarksPercent}%)`
      });
      matchedReasons.push(`Marks ≥ ${scheme.minMarksPercent}% ✓`);
    } else {
      criteriaBreakdown.push({
        label: 'Academic Performance',
        passed: false,
        reason: `Requires min ${scheme.minMarksPercent}%; student has ${user.marksPercent}%`
      });
      failedReasons.push(`Requires ≥ ${scheme.minMarksPercent}% marks`);
      isDisqualified = true;
    }
  }

  // 8. Age Criteria
  if (user.age !== null) {
    if (scheme.ageMin && user.age < scheme.ageMin) {
      criteriaBreakdown.push({
        label: 'Age Restriction',
        passed: false,
        reason: `Applicant age (${user.age}) is below minimum age (${scheme.ageMin})`
      });
      failedReasons.push(`Age < ${scheme.ageMin} yrs`);
      isDisqualified = true;
    } else if (scheme.ageMax && user.age > scheme.ageMax) {
      criteriaBreakdown.push({
        label: 'Age Restriction',
        passed: false,
        reason: `Applicant age (${user.age}) exceeds maximum age (${scheme.ageMax})`
      });
      failedReasons.push(`Age > ${scheme.ageMax} yrs`);
      isDisqualified = true;
    } else if (scheme.ageMin || scheme.ageMax) {
      criteriaBreakdown.push({
        label: 'Age Eligibility',
        passed: true,
        reason: `Age ${user.age} falls within allowed bracket (${scheme.ageMin || 0} - ${scheme.ageMax || 'No upper limit'} yrs)`
      });
    }
  }

  // Compute final status and match score (0-100)
  let status: 'Eligible' | 'Possibly Eligible' | 'Not Eligible';
  let score = 0;

  const totalCriteria = criteriaBreakdown.length;
  const passedCriteria = criteriaBreakdown.filter(c => c.passed).length;

  if (isDisqualified) {
    status = 'Not Eligible';
    score = Math.max(10, Math.round((passedCriteria / totalCriteria) * 40));
  } else if (hasMissingInfo) {
    status = 'Possibly Eligible';
    score = Math.min(85, Math.max(50, Math.round((passedCriteria / totalCriteria) * 90)));
  } else {
    status = 'Eligible';
    score = 100;
  }

  return {
    scheme,
    status,
    score,
    criteriaBreakdown,
    matchedReasons,
    failedReasons
  };
}
