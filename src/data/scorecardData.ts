
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
  },
  {
    id: 'customer-support-call',
    name: 'Customer Support - Call',
    sections: {
      mandatory: [
        {
          id: 'dpa-confirmation',
          category: 'Mandatory',
          description: 'Did the advisor confirm full DPA (Three separate parts of information) and explain that call would be recorded?',
          score: null
        },
        {
          id: 'query-identified-call',
          category: 'Mandatory',
          description: 'Did the advisor identify and answer the query correctly?',
          score: null
        },
        {
          id: 'address-queries-call',
          category: 'Mandatory',
          description: 'Did the advisor address all queries and provide additional information where necessary?',
          score: null
        },
        {
          id: 'misleading-info-call',
          category: 'Mandatory',
          description: 'Was any misleading information provided?',
          score: null
        },
        {
          id: 'questioning-skills-call',
          category: 'Mandatory',
          description: 'Did the advisor use effective questioning skills where necessary?',
          score: null
        },
        {
          id: 'soft-skills',
          category: 'Mandatory',
          description: 'Did the advisor demonstrate good soft skills? (active listening, empathy, patience...)',
          score: null
        }
      ],
      general: [
        {
          id: 'contact-details-correct',
          description: 'Are the contact details correct?',
          score: null
        },
        {
          id: 'query-type-call',
          description: 'Did the advisor note the correct type of query?',
          score: null
        },
        {
          id: 'avoid-interrupting',
          description: 'Did the advisor avoid interrupting or talking over the caller?',
          score: null
        },
        {
          id: 'appropriate-language',
          description: 'Did the advisor use appropriate language, avoiding abbreviations (IP, PIF, CIC, and NOID...)?',
          score: null
        },
        {
          id: 'inform-hold-transfer',
          description: 'Did the advisor inform the debtor before he/she is put on hold or transferred?',
          score: null
        },
        {
          id: 'ask-for-help',
          description: 'Did the advisor ask for help from seniors/managers if unsure about process/solution?',
          score: null
        },
        {
          id: 'correct-cnc-call',
          description: 'Correct CNC used?',
          score: null
        },
        {
          id: 'detailed-case-note-call',
          description: 'Detailed case note left?',
          score: null
        },
        {
          id: 'case-note-reflect',
          description: 'Case note reflect conversation?',
          score: null
        },
        {
          id: 'correspondences-updated-call',
          description: 'All correspondences updated on case note?',
          score: null
        },
        {
          id: 'eod-process-call',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-call',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-call',
          description: 'Follow up',
          score: null
        }
      ]
    }
  },
  {
    id: 'closures',
    name: 'Closures - Case Audit',
    sections: {
      mandatory: [
        {
          id: 'assignment-stage-updated',
          category: 'Mandatory',
          description: 'Assignment stage updated correctly (e.g. Review for Closure, Fee Request, Final Report, Termination)',
          score: null
        },
        {
          id: 'final-review-note',
          category: 'Mandatory',
          description: 'Final review case note completed - note on file to confirm that the advisor has reviewed the case prior to closure and confirmed all assets have been realised?',
          score: null
        },
        {
          id: 'contributions-made',
          category: 'Mandatory',
          description: 'All contributions made and debtor advised to stop payment?',
          score: null
        },
        {
          id: 'closure-email-sent',
          category: 'Mandatory',
          description: 'Email/ Letter regarding closure sent to debtor',
          score: null
        },
        {
          id: 'proposal-check',
          category: 'Mandatory',
          description: 'Did the advisor check the proposal / Chairman\'s report / Mods ( E.g 30% rule, Fixed Fee, etc )',
          score: null
        },
        {
          id: 'creditor-claims',
          category: 'Mandatory',
          description: 'All creditor claims received/admitted/rejected/excluded',
          score: null
        },
        {
          id: 'dividend-reclaim-check',
          category: 'Mandatory',
          description: 'Did the Advisor Check for returned dividends / dividend reclaim?',
          score: null
        },
        {
          id: 'chase-creditors',
          category: 'Mandatory',
          description: 'Did the Advisor chase creditors for outstanding claims ?',
          score: null
        },
        {
          id: 'noid-sla',
          category: 'Mandatory',
          description: 'NOID – SLA of 2 Weeks for email and SLA of 3 weeks for letter followed',
          score: null
        },
        {
          id: 'claim-exclusion-sent',
          category: 'Mandatory',
          description: 'Claim exclusion sent to IP',
          score: null
        },
        {
          id: 'ip-query-raised',
          category: 'Mandatory',
          description: 'Did the advisor raise an IP Query, where applicable?',
          score: null
        },
        {
          id: 'assets-realised',
          category: 'Mandatory',
          description: 'All assets realised following correct process',
          score: null
        },
        {
          id: 'disbursements-fees-paid',
          category: 'Mandatory',
          description: 'All disbursements and fees been paid correctly?',
          score: null
        },
        {
          id: 'fees-dividends-zero-balance',
          category: 'Mandatory',
          description: 'Confirm all fees & dividends paid and bank balance at zero prior to closing (check dividends paid per pence and report states correct payment made)',
          score: null
        },
        {
          id: 'refund-process',
          category: 'Mandatory',
          description: 'Did the Advisor follow the process for refund prior to Closure? ( E.g. Chase debtor, get BACs details, raise request on Jira )',
          score: null
        },
        {
          id: 'final-report-prepared',
          category: 'Mandatory',
          description: 'Prepare Final Report and issue to debtor and creditors',
          score: null
        },
        {
          id: 'correct-footnote',
          category: 'Mandatory',
          description: 'Did the advisor use the correct footnote on the final report, where applicable?',
          score: null
        }
      ],
      general: [
        {
          id: 'case-note-closures',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?'
          ]
        },
        {
          id: 'eod-process-closures',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-closures',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-closures',
          description: 'Follow up',
          score: null
        }
      ]
    }
  }
];
