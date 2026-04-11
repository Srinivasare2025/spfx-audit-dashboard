declare interface IAuditdashboardWebPartStrings {
  PropertyPaneDescription: string;
  TitleFieldLabel: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'AuditdashboardWebPartStrings' {
  const strings: IAuditdashboardWebPartStrings;
  export = strings;
}
