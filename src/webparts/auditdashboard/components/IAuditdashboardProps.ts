import type { SPFI } from '../SPFIType';
export interface IAuditdashboardProps {
  description: string;
  title: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  sp: SPFI;
}
