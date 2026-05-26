import * as React from 'react';
import * as ReactDom from 'react-dom';

import type { SPFI } from './SPFIType';

import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AuditdashboardWebPartStrings';
import Auditdashboard from './components/Auditdashboard';
import AuditService from './Services/AuditService';


export interface IAuditdashboardWebPartProps {
  description: string;
  title: string;
  sp: SPFI;
  auditService: AuditService;
}


export default class AuditdashboardWebPart extends BaseClientSideWebPart<IAuditdashboardWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _sp: SPFI;
  private _auditService: AuditService;

  
  public render(): void {
    const element = React.createElement(
      Auditdashboard,
      {
        description: this.properties.description,
        title: this.properties.title,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        sp: this._sp,
        auditService: this._auditService
      }
    );
    //ReactDom.render(React.createElement(), this.domElement);
    ReactDom.render(element, this.domElement);
    
  }

  protected async onInit(): Promise<void> {
    await super.onInit();

    const { spfi, SPFx } = await import(/* webpackChunkName: 'pnp-sp' */ '@pnp/sp');
    await import(/* webpackChunkName: 'pnp-sp-webs' */ '@pnp/sp/webs');
    await import(/* webpackChunkName: 'pnp-sp-lists' */ '@pnp/sp/lists');
    await import(/* webpackChunkName: 'pnp-sp-items' */ '@pnp/sp/items');

    this._sp = spfi().using(SPFx(this.context)) as unknown as SPFI;

    if (!this.properties.title) {
      this.properties.title = "Audit Dashboard"; // default value
    }

    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
