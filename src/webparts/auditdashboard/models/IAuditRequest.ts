import { IUser } from "./IUser";

export interface IAuditRequest {
  Id: number;
  Title: string;
  AuditStatus: string;
  Priority: string;
  Auditor:IUser;
  Created: string;
}