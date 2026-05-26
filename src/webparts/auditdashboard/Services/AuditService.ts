import type { SPFI } from '../SPFIType';
import { IAuditRequest } from '../models/IAuditRequest';

export default class AuditService {
  private _sp: SPFI;
  constructor(sp: SPFI) {
    this._sp = sp;
  }

  public async getAuditRequests(): Promise<IAuditRequest[]> {
    try {
      const items = await this._sp.web.lists
        .getByTitle('AuditRequests')
        .items.select('Id', 'Title', 'AuditStatus', 'Priority')() as unknown as IAuditRequest[];
      return items;
        /*
      const items: IAuditRequest[] = await this._sp.web.lists.getByTitle("AuditRequests").items.select("Id", "Title", "AuditStatus", "Priority")();
      return items;
      */
    } catch (error) {
      console.error("Error fetching audit requests: ", error);
      return [];
    }
  }
}
