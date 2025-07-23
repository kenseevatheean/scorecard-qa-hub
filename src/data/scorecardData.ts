
import { DepartmentScorecard } from '@/types/scorecard';

export const scorecardData: DepartmentScorecard[] = [
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
  },
  {
    id: 'creditor-services-assignment',
    name: 'Creditor Services - Assignment',
    sections: {
      mandatory: [
        {
          id: 'cs-assign-1',
          category: 'Mandatory',
          description: 'Was the assignment updated to the correct case?',
          score: null,
        },
        {
          id: 'cs-assign-2',
          category: 'Mandatory',
          description: 'Do the debtor/creditor/representative details match?',
          score: null,
        },
        {
          id: 'cs-assign-3',
          category: 'Mandatory',
          description: 'Verification required for the below - Account Reference Number, Duplicate claims, Register (IIR/AIB/eDEN), BACS detail',
          score: null,
        },
        {
          id: 'cs-assign-4',
          category: 'Mandatory',
          description: 'Do the Reference Numbers match? If no, were they updated correctly? Was the claim submitted/admitted? Has the advisor checked for possible Duplicates and take appropriate action? Was reclaim of dividend notified to recon team?',
          score: null,
        },
        {
          id: 'cs-assign-5',
          category: 'Mandatory',
          description: 'Incorrect representative, escalate to Manager to update?',
          score: null,
        },
      ],
      general: [
        {
          id: 'cs-assign-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
          ],
        },
        {
          id: 'cs-assign-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'creditor-services-claims-breach',
    name: 'Creditor Services - Claims Breach',
    sections: {
      mandatory: [
        {
          id: 'cs-breach-1',
          category: 'Mandatory',
          description: 'Did the advisor check if there was already a variation meeting held for the same claim breach?',
          score: null,
        },
        {
          id: 'cs-breach-2',
          category: 'Mandatory',
          description: 'Has the advisor correctly identified the claim breach (check Proposal and CR) - 15%, 20% or 25%?',
          score: null,
        },
        {
          id: 'cs-breach-3',
          category: 'Mandatory',
          description: 'Has the advisor checked for possible Duplicates?',
          score: null,
        },
        {
          id: 'cs-breach-4',
          category: 'Mandatory',
          description: 'Has the advisor checked correct reference for the higher claim(s)?',
          score: null,
        },
        {
          id: 'cs-breach-5',
          category: 'Mandatory',
          description: 'Has the advisor checked Docuware and case files for the POD and Statement for the claims that have caused the breach?',
          score: null,
        },
        {
          id: 'cs-breach-6',
          category: 'Mandatory',
          description: 'Has the advisor chased unadmitted claims for potential claim breach?',
          score: null,
        },
        {
          id: 'cs-breach-7',
          category: 'Mandatory',
          description: 'Has the advisor contacted the debtor for written consent?',
          score: null,
        },
        {
          id: 'cs-breach-8',
          category: 'Mandatory',
          description: 'Has the advisor informed debtor that claims breach will result in extension of the IVA?',
          score: null,
        },
        {
          id: 'cs-breach-9',
          category: 'Mandatory',
          description: 'Has the advisor investigated in case of dispute?',
          score: null,
        },
        {
          id: 'cs-breach-10',
          category: 'Mandatory',
          description: 'Did the advisor raise an IP Query after 3rd chaser?',
          score: null,
        },
      ],
      general: [
        {
          id: 'cs-breach-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'cs-breach-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'cs-breach-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'cs-breach-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'cs-breach-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'creditor-services-claims-exclusion',
    name: 'Creditor Services - Claims Exclusion',
    sections: {
      mandatory: [
        {
          id: 'cs-exclusion-1',
          category: 'Mandatory',
          description: 'All creditor claims received/admitted/rejected/excluded',
          score: null,
        },
        {
          id: 'cs-exclusion-2',
          category: 'Mandatory',
          description: 'Did the Advisor chase creditors for outstanding claims?',
          score: null,
        },
        {
          id: 'cs-exclusion-3',
          category: 'Mandatory',
          description: 'NOID – SLA of 2 Weeks for email and SLA of 3 weeks for letter followed',
          score: null,
        },
        {
          id: 'cs-exclusion-4',
          category: 'Mandatory',
          description: 'Claim exclusion sent to IP',
          score: null,
        },
        {
          id: 'cs-exclusion-5',
          category: 'Mandatory',
          description: 'Did the advisor update the exclusion on the creditor\'s module?',
          score: null,
        },
        {
          id: 'cs-exclusion-6',
          category: 'Mandatory',
          description: 'Did the advisor contact the debtor to enquire on the claims, where applicable?',
          score: null,
        },
      ],
      general: [
        {
          id: 'cs-exclusion-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'cs-exclusion-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'cs-exclusion-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'creditor-services-email-audit',
    name: 'Creditor Services - Email Audit',
    sections: {
      mandatory: [
        {
          id: 'cs-email-1',
          category: 'Mandatory',
          description: 'Was the advisor able to locate the case with details provided from debtor/creditor/representative? Did the advisor check Register (IIR/AIB/eDEN) if unable to locate?',
          score: null,
        },
        {
          id: 'cs-email-2',
          category: 'Mandatory',
          description: 'Did the advisor use the correct CNC to allocate the email?',
          score: null,
        },
        {
          id: 'cs-email-3',
          category: 'Mandatory',
          description: 'Did the advisor identify and answer the query correctly?',
          score: null,
        },
        {
          id: 'cs-email-4',
          category: 'Mandatory',
          description: 'Did the advisor address all queries and provide additional information where necessary?',
          score: null,
        },
        {
          id: 'cs-email-5',
          category: 'Mandatory',
          description: 'Was any misleading information provided?',
          score: null,
        },
        {
          id: 'cs-email-6',
          category: 'Mandatory',
          description: 'Did the advisor use effective questioning skills where necessary?',
          score: null,
        },
        {
          id: 'cs-email-7',
          category: 'Mandatory',
          description: 'Did the advisor raise an IP Query, if applicable?',
          score: null,
        },
      ],
      general: [
        {
          id: 'cs-email-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'All correspondences updated on case note?',
            'Were the correspondences docuwared correctly?',
          ],
        },
        {
          id: 'cs-email-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'cs-email-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'cs-email-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'cs-email-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'creditor-services-reconciliation',
    name: 'Creditor Services - Reconciliation',
    sections: {
      mandatory: [
        {
          id: 'cs-recon-1',
          category: 'Mandatory',
          description: 'Was the email assigned to the correct case?',
          score: null,
        },
        {
          id: 'cs-recon-2',
          category: 'Mandatory',
          description: 'Do the debtor/creditor/representative details match?',
          score: null,
        },
        {
          id: 'cs-recon-3',
          category: 'Mandatory',
          description: 'Do the Reference Numbers match? If no, were they updated correctly?',
          score: null,
        },
        {
          id: 'cs-recon-4',
          category: 'Mandatory',
          description: 'Was the document/ Email/ Remittance actioned?',
          score: null,
        },
        {
          id: 'cs-recon-5',
          category: 'Mandatory',
          description: 'Was the claim submitted/ admitted?',
          score: null,
        },
        {
          id: 'cs-recon-6',
          category: 'Mandatory',
          description: 'Was the Representative/ Original Creditor contacted for returned dividend reasons?',
          score: null,
        },
        {
          id: 'cs-recon-7',
          category: 'Mandatory',
          description: 'Proof of Debt/ Banking Details requested where applicable?',
          score: null,
        },
        {
          id: 'cs-recon-8',
          category: 'Mandatory',
          description: 'Did the advisor use effective questioning skills where necessary?',
          score: null,
        },
        {
          id: 'cs-recon-9',
          category: 'Mandatory',
          description: 'Was withhold dividend marker removed once resolved?',
          score: null,
        },
        {
          id: 'cs-recon-10',
          category: 'Mandatory',
          description: 'Was the correct dividend amount paid to the creditor?',
          score: null,
        },
        {
          id: 'cs-recon-11',
          category: 'Mandatory',
          description: 'Was the dividend paid to the correct creditor?',
          score: null,
        },
        {
          id: 'cs-recon-12',
          category: 'Mandatory',
          description: 'Was the dividend paid to the correct account reference?',
          score: null,
        },
      ],
      general: [
        {
          id: 'cs-recon-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'cs-recon-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'cs-recon-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'financial-reviews-call-audit',
    name: 'Financial Reviews - Call Audit',
    sections: {
      mandatory: [
        {
          id: 'fr-call-1',
          category: 'Mandatory',
          description: 'Did the advisor confirm full DPA (Three separate parts of information) and explain that call would be recorded?',
          score: null,
        },
        {
          id: 'fr-call-2',
          category: 'Mandatory',
          description: 'Did the advisor explain the purpose of the call? (Outbound)',
          score: null,
        },
        {
          id: 'fr-call-3',
          category: 'Mandatory',
          description: 'Did the advisor identify and answer the query correctly? (Inbound)',
          score: null,
        },
        {
          id: 'fr-call-4',
          category: 'Mandatory',
          description: 'Did the advisor complete the questionings required by the reviewer?',
          score: null,
        },
        {
          id: 'fr-call-5',
          category: 'Mandatory',
          description: 'Was the outcome of the review discussed and explained?',
          score: null,
        },
        {
          id: 'fr-call-6',
          category: 'Mandatory',
          description: 'Was the review amended accordingly on the I/E Review Tab?',
          score: null,
        },
        {
          id: 'fr-call-7',
          category: 'Mandatory',
          description: 'Was the ICT amended where necessary?',
          score: null,
        },
        {
          id: 'fr-call-8',
          category: 'Mandatory',
          description: 'Did the advisor address all queries and provide additional information where necessary?',
          score: null,
        },
        {
          id: 'fr-call-9',
          category: 'Mandatory',
          description: 'Was any misleading information provided?',
          score: null,
        },
        {
          id: 'fr-call-10',
          category: 'Mandatory',
          description: 'Did the advisor use effective questioning skills where necessary?',
          score: null,
        },
        {
          id: 'fr-call-11',
          category: 'Mandatory',
          description: 'Did the advisor demonstrate good soft skills? (active listening, empathy, patience…)',
          score: null,
        },
      ],
      general: [
        {
          id: 'fr-call-procedural',
          description: 'Procedural (font colour in light blue)',
          score: null,
          subItems: [
            'Are the contact details correct?',
            'Did the advisor avoid interrupting or talking over the caller?',
            'Did the advisor inform the debtor before he/she is put on hold or transferred?',
            'Did the advisor ask for help from seniors/managers if unsure about process/solution?',
          ],
        },
        {
          id: 'fr-call-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'fr-call-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'fr-call-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'fr-call-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'fr-call-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'financial-reviews-case-audit',
    name: 'Financial Reviews - Case Audit',
    sections: {
      mandatory: [
        {
          id: 'fr-case-1',
          category: 'Mandatory',
          description: 'Income - Income / Benefits frequency checked (weekly, four-weekly, monthly, etc)',
          score: null,
        },
        {
          id: 'fr-case-2',
          category: 'Mandatory',
          description: 'Average income calculated correctly',
          score: null,
        },
        {
          id: 'fr-case-3',
          category: 'Mandatory',
          description: 'Check Tax Return, Profit & Loss Account (where debtor is self-employed)',
          score: null,
        },
        {
          id: 'fr-case-4',
          category: 'Mandatory',
          description: 'Were wage slips requested if average income is more than 10% of last review?',
          score: null,
        },
        {
          id: 'fr-case-5',
          category: 'Mandatory',
          description: 'Benefits frequency checked if any (weekly, four-weekly, monthly, etc)',
          score: null,
        },
        {
          id: 'fr-case-6',
          category: 'Mandatory',
          description: 'Check regular overtime and bonuses',
          score: null,
        },
        {
          id: 'fr-case-7',
          category: 'Mandatory',
          description: 'Check year to date figure for previous additional income',
          score: null,
        },
        {
          id: 'fr-case-8',
          category: 'Mandatory',
          description: 'Check for unusual tax codes (K, W, M, X) and query them',
          score: null,
        },
        {
          id: 'fr-case-9',
          category: 'Mandatory',
          description: 'Check for any deductions (AOE, share save scheme, etc) and query them',
          score: null,
        },
        {
          id: 'fr-case-10',
          category: 'Mandatory',
          description: 'Check any pension deductions are reasonable / not excessive',
          score: null,
        },
        {
          id: 'fr-case-11',
          category: 'Mandatory',
          description: 'Expenses - Any change from last I&E using bank statements',
          score: null,
        },
        {
          id: 'fr-case-12',
          category: 'Mandatory',
          description: 'Does rent or mortgage (secured loans if applicable) match?',
          score: null,
        },
        {
          id: 'fr-case-13',
          category: 'Mandatory',
          description: 'Does car HP (if applicable) match?',
          score: null,
        },
        {
          id: 'fr-case-14',
          category: 'Mandatory',
          description: 'Does council tax (recalculated from 10 to 12 months) match?',
          score: null,
        },
        {
          id: 'fr-case-15',
          category: 'Mandatory',
          description: 'Check insurance payments',
          score: null,
        },
        {
          id: 'fr-case-16',
          category: 'Mandatory',
          description: 'Do gas / electric / other utilities match?',
          score: null,
        },
        {
          id: 'fr-case-17',
          category: 'Mandatory',
          description: 'Evidence of any items outside guideline figures provided and explained',
          score: null,
        },
        {
          id: 'fr-case-18',
          category: 'Mandatory',
          description: 'Transactions - Any large transfers to/from other accounts - ask for explanation and evidence',
          score: null,
        },
        {
          id: 'fr-case-19',
          category: 'Mandatory',
          description: 'Any evidence of additional credit - ask for details',
          score: null,
        },
        {
          id: 'fr-case-20',
          category: 'Mandatory',
          description: 'Any recurring direct debits checked - ask for details',
          score: null,
        },
      ],
      general: [
        {
          id: 'fr-case-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CCN used?',
            'Detailed case note left?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'fr-case-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'fr-case-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'general-call-audit',
    name: 'General - Call Audit',
    sections: {
      mandatory: [
        {
          id: 'gen-call-1',
          category: 'Mandatory',
          description: 'Did the advisor confirm full DPA (Three separate parts of information) and explain that call would be recorded?',
          score: null,
        },
        {
          id: 'gen-call-2',
          category: 'Mandatory',
          description: 'Did the advisor identify and answer the query correctly?',
          score: null,
        },
        {
          id: 'gen-call-3',
          category: 'Mandatory',
          description: 'Did the advisor address all queries and provide additional information where necessary?',
          score: null,
        },
        {
          id: 'gen-call-4',
          category: 'Mandatory',
          description: 'Was any misleading information provided?',
          score: null,
        },
        {
          id: 'gen-call-5',
          category: 'Mandatory',
          description: 'Did the advisor use effective questioning skills where necessary?',
          score: null,
        },
        {
          id: 'gen-call-6',
          category: 'Mandatory',
          description: 'Did the advisor demonstrate good soft skills? (active listening, empathy, patience…)',
          score: null,
        },
      ],
      general: [
        {
          id: 'gen-call-procedural',
          description: 'Procedural',
          score: null,
          subItems: [
            'Are the contact details correct?',
            'Did the advisor avoid interrupting or talking over the caller?',
            'Did the advisor inform the debtor before he/she is put on hold or transferred?',
            'Did the advisor ask for help from seniors/managers if unsure about process/solution?',
          ],
        },
        {
          id: 'gen-call-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'gen-call-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'gen-call-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'gen-call-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'gen-call-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'general-email-audit',
    name: 'General - Email Audit',
    sections: {
      mandatory: [
        {
          id: 'gen-email-1',
          category: 'Mandatory',
          description: 'Was the email/ CC assigned (docuwared) to the correct case?',
          score: null,
        },
        {
          id: 'gen-email-2',
          category: 'Mandatory',
          description: 'Do the debtor details match?',
          score: null,
        },
        {
          id: 'gen-email-3',
          category: 'Mandatory',
          description: 'Does the creditor/third party have authorisation to receive information/documents regarding the case?',
          score: null,
        },
        {
          id: 'gen-email-4',
          category: 'Mandatory',
          description: 'Did the advisor identify and answer the query correctly?',
          score: null,
        },
        {
          id: 'gen-email-5',
          category: 'Mandatory',
          description: 'Did the advisor address all queries and provide additional information where necessary?',
          score: null,
        },
        {
          id: 'gen-email-6',
          category: 'Mandatory',
          description: 'Was any misleading information provided?',
          score: null,
        },
        {
          id: 'gen-email-7',
          category: 'Mandatory',
          description: 'Did the advisor use effective questioning skills where necessary?',
          score: null,
        },
        {
          id: 'gen-email-8',
          category: 'Mandatory',
          description: 'Has the correct attachment been issued? Was the document issued in the correct format? (word, pdf…)',
          score: null,
        },
        {
          id: 'gen-email-9',
          category: 'Mandatory',
          description: 'Was the query passed on to the relevant department? Was the debtor / creditor advised their query has been passed on?',
          score: null,
        },
      ],
      general: [
        {
          id: 'gen-email-procedural',
          description: 'Procedural',
          score: null,
          subItems: [
            'Correct signature used?',
            'Were the grammar, spelling, and punctuation correct?',
          ],
        },
        {
          id: 'gen-email-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'gen-email-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'gen-email-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'gen-email-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'gen-email-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'retentions-case-audit',
    name: 'Retentions - Case Audit',
    sections: {
      mandatory: [
        {
          id: 'ret-1',
          category: 'Mandatory',
          description: 'Did the Advisor check IP approved for Termination',
          score: null,
        },
        {
          id: 'ret-2',
          category: 'Mandatory',
          description: 'Did the advisor check the proposal / Chairman\'s report / Mods ( E.g 30% rule, Fixed Fee, etc )',
          score: null,
        },
        {
          id: 'ret-3',
          category: 'Mandatory',
          description: 'Did the Advisor issued the draft termination letter to debtor?',
          score: null,
        },
        {
          id: 'ret-4',
          category: 'Mandatory',
          description: 'All assets realised following correct process',
          score: null,
        },
        {
          id: 'ret-5',
          category: 'Mandatory',
          description: 'All disbursements and fees been paid correctly?',
          score: null,
        },
        {
          id: 'ret-6',
          category: 'Mandatory',
          description: 'Confirm all fees & dividends paid and bank balance at zero prior to closing (check dividends paid pari-passu and report states correct payment made)',
          score: null,
        },
        {
          id: 'ret-7',
          category: 'Mandatory',
          description: 'Did the Advisor follow the process for refund prior to Closure ? ( E.g. Chase debtor, get BACs details, raise request on Jira )',
          score: null,
        },
        {
          id: 'ret-8',
          category: 'Mandatory',
          description: 'Has the advisor calculated the final dividends correctly?',
          score: null,
        },
        {
          id: 'ret-9',
          category: 'Mandatory',
          description: 'Check date of breach letter issued – Pass to relevant department if breach was not issued',
          score: null,
        },
        {
          id: 'ret-10',
          category: 'Mandatory',
          description: 'Assignment stage updated correctly ( e.g. Fee Request, Final Report, Termination )',
          score: null,
        },
        {
          id: 'ret-11',
          category: 'Mandatory',
          description: 'Did the advisor choose correct Termination Route (e.g. Arrears)',
          score: null,
        },
        {
          id: 'ret-12',
          category: 'Mandatory',
          description: 'Prepare Termination Report and issue to debtor and creditors',
          score: null,
        },
        {
          id: 'ret-13',
          category: 'Mandatory',
          description: 'All information on the Final Report correct?',
          score: null,
        },
      ],
      general: [
        {
          id: 'ret-procedural',
          description: 'Procedural',
          score: null,
          subItems: [
            'Termination review case note category (Termination Draft Sent, Termination Fee Request Raised, Termination - Fee Request Raised, Termination Review – Case information)',
          ],
        },
        {
          id: 'ret-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Correct CNC used?',
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'ret-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'ret-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'ret-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'ret-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'td-asset-realisation',
    name: 'TD - Asset Realisation',
    sections: {
      mandatory: [
        {
          id: 'td-asset-1',
          category: 'Mandatory',
          description: 'Letter of Authority/ Email/ Verbal authorising external Parties dealing with the case (Third Party Authority case note used)',
          score: null,
        },
        {
          id: 'td-asset-2',
          category: 'Mandatory',
          description: 'Evidence on File for Redundancy, Inheritance, Tax Rebate, Insurance Claim, and Mis Sold Pension',
          score: null,
        },
        {
          id: 'td-asset-3',
          category: 'Mandatory',
          description: 'IP Query raised?',
          score: null,
        },
        {
          id: 'td-asset-4',
          category: 'Mandatory',
          description: 'Is the EOS correct? Was this docuwared?',
          score: null,
        },
        {
          id: 'td-asset-5',
          category: 'Mandatory',
          description: 'Receipt of Funds - Cases moved to respective stage & Funds allocated on COA',
          score: null,
        },
        {
          id: 'td-asset-6',
          category: 'Mandatory',
          description: 'Assignment Stage updated',
          score: null,
        },
      ],
      general: [
        {
          id: 'td-asset-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'td-asset-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'td-asset-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'td-asset-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'td-asset-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'td-closure-review',
    name: 'TD - Closure Review',
    sections: {
      mandatory: [
        {
          id: 'td-closure-1',
          category: 'Mandatory',
          description: 'Assignment stage/details updated correctly?',
          score: null,
        },
        {
          id: 'td-closure-2',
          category: 'Mandatory',
          description: 'All creditor claims received & admitted?',
          score: null,
        },
        {
          id: 'td-closure-3',
          category: 'Mandatory',
          description: 'Did the Advisor chase creditors for outstanding claims?',
          score: null,
        },
        {
          id: 'td-closure-4',
          category: 'Mandatory',
          description: 'Recall of Inhibition - Date verified and letter saved on Folder?',
          score: null,
        },
        {
          id: 'td-closure-5',
          category: 'Mandatory',
          description: 'Fee Request Raised?',
          score: null,
        },
        {
          id: 'td-closure-6',
          category: 'Mandatory',
          description: 'Dividends Paid correctly? (Equalisation followed by Final Dividends)',
          score: null,
        },
        {
          id: 'td-closure-7',
          category: 'Mandatory',
          description: 'All contributions made and debtor advised to stop payment?',
          score: null,
        },
        {
          id: 'td-closure-8',
          category: 'Mandatory',
          description: 'Has the advisor submitted the Form 5 correctly on ASTRA?',
          score: null,
        },
        {
          id: 'td-closure-9',
          category: 'Mandatory',
          description: 'Has the advisor issued the Form 5 to debtor?',
          score: null,
        },
        {
          id: 'td-closure-10',
          category: 'Mandatory',
          description: 'Has the advisor submitted the Form 6 correctly on ASTRA?',
          score: null,
        },
        {
          id: 'td-closure-11',
          category: 'Mandatory',
          description: 'Has the advisor issued the Form 6 to creditors?',
          score: null,
        },
      ],
      general: [
        {
          id: 'td-closure-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'td-closure-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'td-closure-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'td-closure-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'td-closure-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'td-case-audit-form-4',
    name: 'TD Case Audit - Form 4',
    sections: {
      mandatory: [
        {
          id: 'td-form4-1',
          category: 'Mandatory',
          description: 'Did the advisor update the ICS?',
          score: null,
        },
        {
          id: 'td-form4-2',
          category: 'Mandatory',
          description: 'Did the advisor calculate gross realisation correctly in Form 4?',
          score: null,
        },
        {
          id: 'td-form4-3',
          category: 'Mandatory',
          description: 'Did the advisor calculate Trustee fees correctly in Form 4?',
          score: null,
        },
        {
          id: 'td-form4-4',
          category: 'Mandatory',
          description: 'Did the advisor calculate net realisation correctly in Form 4?',
          score: null,
        },
        {
          id: 'td-form4-5',
          category: 'Mandatory',
          description: 'Did the advisor calculate the final expected p/£ correctly in Form 4?',
          score: null,
        },
        {
          id: 'td-form4-6',
          category: 'Mandatory',
          description: 'Are the statements listed on page 6 accurate and relevant to the case?',
          score: null,
        },
        {
          id: 'td-form4-7',
          category: 'Mandatory',
          description: 'Did the advisor upload the form 4 on Astra?',
          score: null,
        },
        {
          id: 'td-form4-8',
          category: 'Mandatory',
          description: 'Does total to date on Astra reflect total to date in R&P and Form 4 table?',
          score: null,
        },
        {
          id: 'td-form4-9',
          category: 'Mandatory',
          description: 'Does the final dividend expected on Astra match the final dividend in Form 4 table?',
          score: null,
        },
        {
          id: 'td-form4-10',
          category: 'Mandatory',
          description: 'Did the advisor complete the letter to debtor correctly + issued to debtor?',
          score: null,
        },
        {
          id: 'td-form4-11',
          category: 'Mandatory',
          description: 'Has the advisor updated the assignment stage correctly and escalate case where applicable?',
          score: null,
        },
        {
          id: 'td-form4-12',
          category: 'Mandatory',
          description: 'Did the advisor amended the Covering Letter correctly in the Form4?',
          score: null,
        },
        {
          id: 'td-form4-13',
          category: 'Mandatory',
          description: 'Did the advisor update all statements on Astra?',
          score: null,
        },
        {
          id: 'td-form4-14',
          category: 'Mandatory',
          description: 'Did the advisor leave a proper case note on file?',
          score: null,
        },
      ],
      general: [
        {
          id: 'td-form4-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'variation-case-audit',
    name: 'Variation - Case Audit',
    sections: {
      mandatory: [
        {
          id: 'var-1',
          category: 'Mandatory',
          description: 'Did we check properly if the case was viable or not?',
          score: null,
        },
        {
          id: 'var-2',
          category: 'Mandatory',
          description: 'All relevant documents are saved on file?',
          score: null,
        },
        {
          id: 'var-3',
          category: 'Mandatory',
          description: 'Variation consent call / email completed?',
          score: null,
        },
        {
          id: 'var-4',
          category: 'Mandatory',
          description: 'I & E review completed? Have other expenses been specified, if applicable?',
          score: null,
        },
        {
          id: 'var-5',
          category: 'Mandatory',
          description: 'Appropriate wordings used as agreed by the Insolvency Practitioner (Decision procedures tab)',
          score: null,
        },
        {
          id: 'var-6',
          category: 'Mandatory',
          description: 'All relevant dates added to VB',
          score: null,
        },
        {
          id: 'var-7',
          category: 'Mandatory',
          description: 'Tasks updated/stage date',
          score: null,
        },
        {
          id: 'var-8',
          category: 'Mandatory',
          description: 'Has correspondence been docuwared correctly?',
          score: null,
        },
        {
          id: 'var-9',
          category: 'Mandatory',
          description: 'IP Query raised, where applicable?',
          score: null,
        },
        {
          id: 'var-10',
          category: 'Mandatory',
          description: 'Is the EOS correct and fees in line with the Chairman\'s Report?',
          score: null,
        },
        {
          id: 'var-11',
          category: 'Mandatory',
          description: 'Were the variation packs issued to debtor and creditor?',
          score: null,
        },
      ],
      general: [
        {
          id: 'var-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'var-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'var-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'var-follow-up',
          description: 'Follow up',
          score: null,
        },
        {
          id: 'var-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
  {
    id: 'votes-case-audit',
    name: 'Votes - Case Audit',
    sections: {
      mandatory: [
        {
          id: 'votes-1',
          category: 'Mandatory',
          description: 'Check all proxies, representative, claim reference, amount and ensure this reflects on both Decision procedures and Creditor\'s module',
          score: null,
        },
        {
          id: 'votes-2',
          category: 'Mandatory',
          description: 'Update "Accepted Variation Fee" box',
          score: null,
        },
        {
          id: 'votes-3',
          category: 'Mandatory',
          description: 'Did we chase creditors in case of no votes?',
          score: null,
        },
        {
          id: 'votes-4',
          category: 'Mandatory',
          description: 'Were modifications saved on Decision procedures?',
          score: null,
        },
        {
          id: 'votes-5',
          category: 'Mandatory',
          description: 'Was any modification discussed with debtor prior to accepting/rejecting the meeting?',
          score: null,
        },
        {
          id: 'votes-6',
          category: 'Mandatory',
          description: 'Have we used the necessary measures to overturn the rejection?',
          score: null,
        },
        {
          id: 'votes-7',
          category: 'Mandatory',
          description: 'Was IP Query raised where applicable?',
          score: null,
        },
        {
          id: 'votes-8',
          category: 'Mandatory',
          description: 'Follow Up',
          score: null,
        },
      ],
      general: [
        {
          id: 'votes-case-note',
          description: 'Case note',
          score: null,
          subItems: [
            'Detailed case note left?',
            'Case note reflect conversation?',
            'All correspondences updated on case note?',
          ],
        },
        {
          id: 'votes-eod',
          description: 'EOD process followed, if applicable',
          score: null,
        },
        {
          id: 'votes-vulnerability',
          description: 'Vulnerability process followed, if applicable',
          score: null,
        },
        {
          id: 'votes-auditor-comments',
          description: 'Auditor\'s comments',
          score: null,
          subItems: [
            'Summary – Positives – Negatives – Remarks/ Observation / Suggestions-',
          ],
        },
      ],
    },
  },
];
