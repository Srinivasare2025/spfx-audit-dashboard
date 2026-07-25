import AuditService from '../Services/AuditService';
import type { SPFI } from '../SPFIType';
//import { Auditservice } from '../Services/AuditService';

export interface IAuditdashboardProps {
  description: string;
  title: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  sp: SPFI;
  auditService: AuditService;
}
