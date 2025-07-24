import { DepartmentScorecard } from '@/types/scorecard';

const scorecardData: DepartmentScorecard[] = [
  {
    id: 'customer-support-call',
    name: 'Customer Support - Call',
    sections: {
      mandatory: [
        {
          id: 'greeting',
          category: 'Opening',
          description: 'Greeting',
          score: null,
        },
        {
          id: 'identification',
          category: 'Opening',
          description: 'Identification',
          score: null,
        },
        {
          id: 'purpose',
          category: 'Opening',
          description: 'Purpose of call',
          score: null,
        },
        {
          id: 'listening',
          category: 'Communication',
          description: 'Active Listening',
          score: null,
        },
        {
          id: 'clarity',
          category: 'Communication',
          description: 'Clarity',
          score: null,
        },
        {
          id: 'empathy',
          category: 'Communication',
          description: 'Empathy',
          score: null,
        },
        {
          id: 'resolution',
          category: 'Resolution',
          description: 'Issue Resolution',
          score: null,
        },
        {
          id: 'explanation',
          category: 'Resolution',
          description: 'Explanation of Resolution',
          score: null,
        },
        {
          id: 'alternatives',
          category: 'Resolution',
          description: 'Alternatives Offered',
          score: null,
        },
        {
          id: 'next_steps',
          category: 'Closing',
          description: 'Next Steps',
          score: null,
        },
        {
          id: 'gratitude',
          category: 'Closing',
          description: 'Gratitude',
          score: null,
        },
        {
          id: 'professionalism',
          category: 'Overall',
          description: 'Professionalism',
          score: null,
        },
      ],
      general: [
        {
          id: 'general-1',
          description: 'General assessment item 1',
          score: null,
        },
        {
          id: 'general-2',
          description: 'General assessment item 2',
          score: null,
        },
      ],
    },
  },
  {
    id: 'customer-relations-email',
    name: 'Customer Relations - Email',
    sections: {
      mandatory: [
        {
          id: 'greeting-email',
          category: 'Opening',
          description: 'Greeting',
          score: null,
        },
        {
          id: 'identification-email',
          category: 'Opening',
          description: 'Identification',
          score: null,
        },
        {
          id: 'purpose-email',
          category: 'Opening',
          description: 'Purpose of email',
          score: null,
        },
        {
          id: 'understanding-email',
          category: 'Content',
          description: 'Understanding of Issue',
          score: null,
        },
        {
          id: 'resolution-email',
          category: 'Content',
          description: 'Issue Resolution',
          score: null,
        },
        {
          id: 'explanation-email',
          category: 'Content',
          description: 'Explanation of Resolution',
          score: null,
        },
        {
          id: 'alternatives-email',
          category: 'Content',
          description: 'Alternatives Offered',
          score: null,
        },
        {
          id: 'next_steps-email',
          category: 'Closing',
          description: 'Next Steps',
          score: null,
        },
        {
          id: 'gratitude-email',
          category: 'Closing',
          description: 'Gratitude',
          score: null,
        },
        {
          id: 'professionalism-email',
          category: 'Overall',
          description: 'Professionalism',
          score: null,
        },
      ],
      general: [
        {
          id: 'general-1-email',
          description: 'General assessment item 1',
          score: null,
        },
        {
          id: 'general-2-email',
          description: 'General assessment item 2',
          score: null,
        },
      ],
    },
  },
  {
    id: 'financial-reviews',
    name: 'Financial Reviews',
    sections: {
      mandatory: [
        {
          id: 'completeness',
          category: 'Data Completeness',
          description: 'All required fields are completed',
          score: null,
        },
        {
          id: 'accuracy',
          category: 'Data Accuracy',
          description: 'Data entered is accurate and consistent',
          score: null,
        },
        {
          id: 'compliance',
          category: 'Regulatory Compliance',
          description: 'Review complies with regulatory requirements',
          score: null,
        },
        {
          id: 'risk_assessment',
          category: 'Risk Assessment',
          description: 'Appropriate risk assessment performed',
          score: null,
        },
        {
          id: 'documentation',
          category: 'Documentation',
          description: 'Sufficient documentation provided',
          score: null,
        },
      ],
      general: [
        {
          id: 'general-1-financial',
          description: 'General assessment item 1',
          score: null,
        },
        {
          id: 'general-2-financial',
          description: 'General assessment item 2',
          score: null,
        },
      ],
    },
  },
  {
    id: 'closures',
    name: 'Closures',
    sections: {
      mandatory: [
        {
          id: 'authorization',
          category: 'Authorization',
          description: 'Proper authorization obtained',
          score: null,
        },
        {
          id: 'notification',
          category: 'Notification',
          description: 'Relevant parties notified',
          score: null,
        },
        {
          id: 'documentation-closure',
          category: 'Documentation',
          description: 'Closure documented accurately',
          score: null,
        },
        {
          id: 'compliance-closure',
          category: 'Compliance',
          description: 'Closure complies with policies',
          score: null,
        },
        {
          id: 'system_updates',
          category: 'System Updates',
          description: 'Systems updated correctly',
          score: null,
        },
      ],
      general: [
        {
          id: 'general-1-closure',
          description: 'General assessment item 1',
          score: null,
        },
        {
          id: 'general-2-closure',
          description: 'General assessment item 2',
          score: null,
        },
      ],
    },
  },
  {
    id: 'creditor-services-assignment',
    name: 'Creditor Services - Assignment',
    sections: {
      mandatory: [
        {
          id: 'reference-numbers-match',
          category: 'Reference Numbers',
          description: 'Do the Reference Numbers match? If no, were they updated correctly? Was the claim submitted/admitted? Has the advisor checked for possible Duplicates and take appropriate action? Was reclaim of dividend notified to recon team?',
          score: null
        },
        {
          id: 'verification-required',
          category: 'Verification',
          description: 'Verification required for the below',
          score: null,
          subItems: [
            {
              id: 'account-reference-number',
              category: 'Verification',
              description: 'Account Reference Number',
              score: null
            },
            {
              id: 'duplicate-claims',
              category: 'Verification',
              description: 'Duplicate claims',
              score: null
            },
            {
              id: 'register-check',
              category: 'Verification',
              description: 'Register (IIR/AIB/eDEN)',
              score: null
            },
            {
              id: 'bacs-detail',
              category: 'Verification',
              description: 'BACS detail',
              score: null
            }
          ]
        }
      ],
      general: [
        {
          id: 'general-1',
          description: 'General assessment item 1',
          score: null
        },
        {
          id: 'general-2',
          description: 'General assessment item 2',
          score: null
        }
      ]
    }
  }
];

export { scorecardData };
