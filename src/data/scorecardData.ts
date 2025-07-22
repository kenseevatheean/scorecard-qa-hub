
import { DepartmentScorecard } from '@/types/scorecard';

export const departmentScorecards: DepartmentScorecard[] = [
  {
    id: 'financial-reviews',
    name: 'Financial Reviews',
    sections: {
      mandatory: [
        {
          id: 'income-benefits-freq',
          category: 'Income',
          description: 'Income / Benefits frequency checked',
          score: null
        },
        {
          id: 'average-income',
          category: 'Income',
          description: 'Average income calculated correctly',
          score: null
        },
        {
          id: 'tax-return',
          category: 'Income',
          description: 'Check Tax Return, P&L (if self-employed)',
          score: null
        },
        {
          id: 'wage-slips',
          category: 'Income',
          description: 'Wage slips requested if income >10% of last review?',
          score: null
        },
        {
          id: 'benefits-freq',
          category: 'Income',
          description: 'Benefits frequency checked',
          score: null,
          subItems: [
            {
              id: 'benefits-freq-sub',
              category: 'Income',
              description: 'Check regular overtime and bonuses',
              score: null
            }
          ]
        },
        {
          id: 'ytd-figure',
          category: 'Income',
          description: 'Check YTD figure for previous additional income',
          score: null,
          subItems: [
            {
              id: 'unusual-tax-codes',
              category: 'Income',
              description: 'Check for unusual tax codes (K, W, M, X)',
              score: null
            }
          ]
        }
      ],
      general: [
        { id: 'correct-ccn', description: 'Correct CCN used?', score: null },
        { id: 'detailed-note', description: 'Detailed case note left?', score: null },
        { id: 'correspondence-updated', description: 'All correspondence updated on case note?', score: null },
        { id: 'follow-up', description: 'Follow up', score: null }
      ]
    }
  },
  {
    id: 'customer-relations-email',
    name: 'Customer Relations - Email',
    sections: {
      mandatory: [
        {
          id: 'query-identified',
          category: 'Mandatory',
          description: 'Did the advisor identify and answer the query correctly?',
          score: null
        },
        {
          id: 'address-queries',
          category: 'Mandatory',
          description: 'Did the advisor address all queries and provide additional information where necessary?',
          score: null
        },
        {
          id: 'misleading-info',
          category: 'Mandatory',
          description: 'Was any misleading information provided?',
          score: null
        },
        {
          id: 'questioning-skills',
          category: 'Mandatory',
          description: 'Did the advisor use effective questioning skills where necessary?',
          score: null
        },
        {
          id: 'ip-query',
          category: 'Mandatory',
          description: 'Did the advisor raise an IP Query, if applicable?',
          score: null
        }
      ],
      general: [
        {
          id: 'query-type',
          description: 'Did the advisor note the correct type of query?',
          score: null
        },
        {
          id: 'correct-cnc',
          description: 'Did the advisor use the correct CNC to allocate the email?',
          score: null
        },
        {
          id: 'correct-signature',
          description: 'Correct signature used?',
          score: null
        },
        {
          id: 'grammar-spelling',
          description: 'Were the grammar, spelling, and punctuation correct?',
          score: null
        },
        {
          id: 'case-note-detailed',
          description: 'Detailed case note left?',
          score: null,
          subItems: ['All correspondences updated on case note?', 'Were the correspondences docuwared correctly?']
        },
        {
          id: 'eod-process',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-general',
          description: 'Follow up',
          score: null
        }
      ]
    }
  }
];
