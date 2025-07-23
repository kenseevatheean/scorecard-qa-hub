
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
  },
  {
    id: 'supervision-rx1-rx4',
    name: 'Supervision Case Audit - RX1 and RX4',
    sections: {
      mandatory: [
        {
          id: 'restriction-tackled-sla',
          category: 'Mandatory',
          description: 'Was the restriction tackled within SLA?',
          score: null
        },
        {
          id: 'form-filled-sent-lr',
          category: 'Mandatory',
          description: 'Was the form filled correctly and sent to LR?',
          score: null
        },
        {
          id: 'proposal-check-supervision',
          category: 'Mandatory',
          description: 'Proposal Check',
          score: null
        },
        {
          id: 'advisor-raise-ip-supervision',
          category: 'Mandatory',
          description: 'Did the advisor raise an IP if applicable?',
          score: null
        },
        {
          id: 'requisition-tackled-sla',
          category: 'Mandatory',
          description: 'Was the requisition tackled correctly and within SLA?',
          score: null
        },
        {
          id: 'customer-consent-vary-terms',
          category: 'Mandatory',
          description: 'Did the customer provide consent to vary the terms of the IVA if applicable?',
          score: null
        }
      ],
      general: [
        {
          id: 'case-note-supervision-rx',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'All correspondences updated on case note?',
            'Were the correspondences docuwared correctly?'
          ]
        },
        {
          id: 'eod-process-supervision-rx',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-supervision-rx',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-supervision-rx',
          description: 'Follow up',
          score: null
        }
      ]
    }
  },
  {
    id: 'supervision-mods',
    name: 'Supervision Case Audit - MODS',
    sections: {
      mandatory: [
        {
          id: 'modification-correctly-identified',
          category: 'Mandatory',
          description: 'Was the modification correctly identified?',
          score: null
        },
        {
          id: 'advisor-raise-ip-query-mods',
          category: 'Mandatory',
          description: 'Did the advisor raise an IP query if applicable?',
          score: null
        },
        {
          id: 'case-passed-financial-reviews',
          category: 'Mandatory',
          description: 'Did the advisor pass the case to Financial Reviews if applicable?',
          score: null
        },
        {
          id: 'evidence-requested-saved',
          category: 'Mandatory',
          description: 'Evidence requested and saved on file',
          score: null
        },
        {
          id: 'customer-consent-vary-terms-mods',
          category: 'Mandatory',
          description: 'Did the customer provide consent to vary the terms of the IVA if applicable?',
          score: null
        },
        {
          id: 'breach-issued-applicable',
          category: 'Mandatory',
          description: 'Breach Issued if applicable',
          score: null
        }
      ],
      general: [
        {
          id: 'case-note-supervision-mods',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'All correspondences updated on case note?',
            'Were the correspondences docuwared correctly?'
          ]
        },
        {
          id: 'eod-process-supervision-mods',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-supervision-mods',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-supervision-mods',
          description: 'Follow up',
          score: null
        }
      ]
    }
  },
  {
    id: 'supervision-annual-report',
    name: 'Supervision Case Audit - Annual Report',
    sections: {
      mandatory: [
        {
          id: 'exception-worked-sla',
          category: 'Mandatory',
          description: 'Was the exception worked within SLA (2 months)?',
          score: null
        },
        {
          id: 'coa-updated-passed-bit',
          category: 'Mandatory',
          description: 'Was the COA updated correctly and passed to BIT?',
          score: null
        },
        {
          id: 'details-checked-changes-made',
          category: 'Mandatory',
          description: 'Were all details checked correctly and changes made accordingly?',
          score: null
        },
        {
          id: 'annual-report-sent',
          category: 'Mandatory',
          description: 'Was the annual report correctly sent to debtor & creditors?',
          score: null
        },
        {
          id: 'advisor-left-case-note',
          category: 'Mandatory',
          description: 'Did the advisor leave a case note?',
          score: null
        }
      ],
      general: []
    }
  },
  {
    id: 'asset-full-final',
    name: 'Asset Case Audit - Full & Final',
    sections: {
      mandatory: [
        {
          id: 'third-party-documents-requested',
          category: 'Mandatory',
          description: 'Third party documents requested (Proof of ID, BS & offer letter)',
          score: null
        },
        {
          id: 'evidence-on-file-asset',
          category: 'Mandatory',
          description: 'Evidence on File',
          score: null
        },
        {
          id: 'ip-query-raised-asset',
          category: 'Mandatory',
          description: 'IP Query raised',
          score: null
        },
        {
          id: 'case-referred-variation',
          category: 'Mandatory',
          description: 'Was case referred to Variation?',
          score: null
        },
        {
          id: 'ic-tab-updated-asset',
          category: 'Mandatory',
          description: 'Was the IC Tab updated?',
          score: null
        },
        {
          id: 'receipt-funds-closure-stage',
          category: 'Mandatory',
          description: 'Receipt of Funds - Case moved to closure stage & funds allocated on COA',
          score: null
        }
      ],
      general: [
        {
          id: 'case-note-asset-full-final',
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
          id: 'eod-process-asset-full-final',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-asset-full-final',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-asset-full-final',
          description: 'Follow up',
          score: null
        }
      ]
    }
  },
  {
    id: 'asset-month-54',
    name: 'Asset Case Audit - Month 54',
    sections: {
      mandatory: [
        {
          id: 'property-included-excluded',
          category: 'Mandatory',
          description: 'Property - Included or Excluded',
          score: null
        },
        {
          id: 'case-passed-supervision-breach',
          category: 'Mandatory',
          description: 'Was case passed to Supervision to issue Breach Letter - Non Compliance of Obligation towards property',
          score: null
        },
        {
          id: 'breach-expired-cases-ip-query',
          category: 'Mandatory',
          description: 'Breach Cases & Expired Cases - IP Query',
          score: null
        },
        {
          id: 'property-review-complete',
          category: 'Mandatory',
          description: 'Property Review Complete - case passed to Select Partnership / 3rd party',
          score: null
        },
        {
          id: 'ip-query-raised-month-54',
          category: 'Mandatory',
          description: 'IP Query raised?',
          score: null
        },
        {
          id: 'options-letter-debtor',
          category: 'Mandatory',
          description: 'Options Letter to Debtor',
          score: null
        },
        {
          id: 'evidence-remortgage-requested',
          category: 'Mandatory',
          description: 'Evidence of remortgage requested, if applicable',
          score: null
        },
        {
          id: 'extension-letter-sent',
          category: 'Mandatory',
          description: 'Extension Letter sent to debtor',
          score: null
        },
        {
          id: 'receipt-funds-variation',
          category: 'Mandatory',
          description: 'Receipt of Funds - Case moved to respective stage & Funds allocated on COA, following variation',
          score: null
        },
        {
          id: 'ic-tab-assignment-amended',
          category: 'Mandatory',
          description: 'IC Tab, Assignment Stage and Assignment Details Amended',
          score: null
        }
      ],
      general: [
        {
          id: 'case-note-asset-month-54',
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
          id: 'eod-process-asset-month-54',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-asset-month-54',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-asset-month-54',
          description: 'Follow up',
          score: null
        }
      ]
    }
  },
  {
    id: 'asset-other-asset',
    name: 'Asset Case Audit - Other Asset',
    sections: {
      mandatory: [
        {
          id: 'letter-authority-external-parties',
          category: 'Mandatory',
          description: 'Letter of Authority - External Parties dealing with the case (where applicable)',
          score: null
        },
        {
          id: 'ip-query-raised-other-asset',
          category: 'Mandatory',
          description: 'IP query raised',
          score: null
        },
        {
          id: 'evidence-on-file-other-asset',
          category: 'Mandatory',
          description: 'Evidence on File',
          score: null
        },
        {
          id: 'pif-saved-note-docuware',
          category: 'Mandatory',
          description: 'PIF - saved on note & Docuware',
          score: null
        },
        {
          id: 'receipt-funds-respective-stage',
          category: 'Mandatory',
          description: 'Receipt of Funds - Cases moved to respective stage & Funds allocated on COA',
          score: null
        },
        {
          id: 'ic-tab-updated-other-asset',
          category: 'Mandatory',
          description: 'Was the IC Tab updated?',
          score: null
        },
        {
          id: 'supervision-team-notified-breach',
          category: 'Mandatory',
          description: 'Was Supervision Team notified for Breach where funds have already been used or debtor not complied with T&Cs?',
          score: null
        }
      ],
      general: [
        {
          id: 'case-note-asset-other',
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
          id: 'eod-process-asset-other',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-asset-other',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-asset-other',
          description: 'Follow up',
          score: null
        }
      ]
    }
  },
  {
    id: 'asset-property-sale',
    name: 'Asset Case Audit - Property Sale',
    sections: {
      mandatory: [
        {
          id: 'letter-authority-external-parties-sale',
          category: 'Mandatory',
          description: 'Letter of Authority - External Parties dealing with the case',
          score: null
        },
        {
          id: 'ip-query-raised-property-sale',
          category: 'Mandatory',
          description: 'IP query raised, where applicable',
          score: null
        },
        {
          id: 'evidence-on-file-property-sale',
          category: 'Mandatory',
          description: 'Evidence on File',
          score: null
        },
        {
          id: 'pif-saved-note-docuware-sale',
          category: 'Mandatory',
          description: 'PIF - saved on note & Docuware',
          score: null
        },
        {
          id: 'receipt-funds-respective-stage-sale',
          category: 'Mandatory',
          description: 'Receipt of Funds - Cases moved to respective stage & Funds allocated on COA',
          score: null
        },
        {
          id: 'supervision-team-notified-breach-sale',
          category: 'Mandatory',
          description: 'Was Supervision Team notified for Breach where funds have already been used or debtor not complied with T&Cs?',
          score: null
        }
      ],
      general: [
        {
          id: 'case-note-asset-property-sale',
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
          id: 'eod-process-asset-property-sale',
          description: 'EOD process followed, if applicable',
          score: null
        },
        {
          id: 'vulnerability-process-asset-property-sale',
          description: 'Vulnerability process followed, if applicable',
          score: null
        },
        {
          id: 'follow-up-asset-property-sale',
          description: 'Follow up',
          score: null
        }
      ]
    }
  }
];
