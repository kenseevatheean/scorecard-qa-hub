-- Add scorecard items for 'Closures - Case Audit'
-- First, get the scorecard ID (we'll use a variable approach)
DO $$
DECLARE
    scorecard_uuid uuid;
BEGIN
    -- Get the scorecard ID for 'Closures - Case Audit'
    SELECT id INTO scorecard_uuid FROM public.scorecards WHERE name = 'Closures - Case Audit';
    
    -- Insert mandatory assessment items
    INSERT INTO public.scorecard_items (scorecard_id, item_id, section_type, category, description) VALUES
    (scorecard_uuid, 'CCA_M001', 'mandatory', 'Assignment Stage', 'Assignment stage updated correctly (e.g. Review for Closure, Fee Request, Final Report, Termination)'),
    (scorecard_uuid, 'CCA_M002', 'mandatory', 'Case Review', 'Final review case note completed - note on file to confirm that the advisor has reviewed the case prior to closure and confirmed all assets have been realised'),
    (scorecard_uuid, 'CCA_M003', 'mandatory', 'Contributions', 'All contributions made and debtor advised to stop payment'),
    (scorecard_uuid, 'CCA_M004', 'mandatory', 'Communication', 'Email/Letter regarding closure sent to debtor'),
    (scorecard_uuid, 'CCA_M005', 'mandatory', 'Documentation Review', 'Did the advisor check the proposal / Chairman''s report / Mods (E.g 30% rule, Fixed Fee, etc)'),
    (scorecard_uuid, 'CCA_M006', 'mandatory', 'Creditor Claims', 'All creditor claims received/admitted/rejected/excluded'),
    (scorecard_uuid, 'CCA_M007', 'mandatory', 'Dividend Management', 'Did the Advisor Check for returned dividends / dividend reclaim'),
    (scorecard_uuid, 'CCA_M008', 'mandatory', 'Creditor Follow-up', 'Did the Advisor chase creditors for outstanding claims'),
    (scorecard_uuid, 'CCA_M009', 'mandatory', 'NOID Process', 'NOID – SLA of 2 Weeks for email and SLA of 3 weeks for letter followed'),
    (scorecard_uuid, 'CCA_M010', 'mandatory', 'Claim Exclusion', 'Claim exclusion sent to IP'),
    (scorecard_uuid, 'CCA_M011', 'mandatory', 'IP Query', 'Did the advisor raise an IP Query, where applicable'),
    (scorecard_uuid, 'CCA_M012', 'mandatory', 'Asset Realisation', 'All assets realised following correct process'),
    (scorecard_uuid, 'CCA_M013', 'mandatory', 'Financial Management', 'All disbursements and fees been paid correctly'),
    (scorecard_uuid, 'CCA_M014', 'mandatory', 'Final Balance', 'Confirm all fees & dividends paid and bank balance at zero prior to closing (check dividends paid per pence and report states correct payment made)'),
    (scorecard_uuid, 'CCA_M015', 'mandatory', 'Refund Process', 'Did the Advisor follow the process for refund prior to Closure (E.g. Chase debtor, get BACs details, raise request on Jira)'),
    (scorecard_uuid, 'CCA_M016', 'mandatory', 'Final Report', 'Prepare Final Report and issue to debtor and creditors'),
    (scorecard_uuid, 'CCA_M017', 'mandatory', 'Report Footnote', 'Did the advisor use the correct footnote on the final report, where applicable'),
    (scorecard_uuid, 'CCA_M018', 'mandatory', 'Case Notes', 'Case note - Correct CNC used? Detailed case note left? Case note reflect conversation? All correspondences updated on case note?'),
    (scorecard_uuid, 'CCA_M019', 'mandatory', 'EOD Process', 'EOD process followed, if applicable'),
    (scorecard_uuid, 'CCA_M020', 'mandatory', 'Vulnerability', 'Vulnerability process followed, if applicable'),
    (scorecard_uuid, 'CCA_M021', 'mandatory', 'Follow Up', 'Follow up');
    
    -- Insert general assessment items for comments and summary
    INSERT INTO public.scorecard_items (scorecard_id, item_id, section_type, description) VALUES
    (scorecard_uuid, 'CCA_G001', 'general', 'Auditor''s comments'),
    (scorecard_uuid, 'CCA_G002', 'general', 'Summary – Positives – Negatives – Remarks/Observation/Suggestions');
    
END $$;