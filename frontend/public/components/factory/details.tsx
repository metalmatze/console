import * as React from 'react';
import { match } from 'react-router-dom';
import * as _ from 'lodash-es';
import { getBadgeFromType } from '@console/shared';
import {
  Firehose,
  HorizontalNav,
  PageHeading,
  FirehoseResource,
  KebabOptionsCreator,
} from '../utils';
import { K8sResourceKindReference, K8sResourceKind, K8sKind } from '../../module/k8s';
import { withFallback } from '../utils/error-boundary';
import { ErrorBoundaryFallback } from '../error';
import { breadcrumbsForDetailsPage } from '../utils/breadcrumbs';

export const DetailsPage = withFallback<DetailsPageProps>((props) => {
  const resourceKeys = _.map(props.resources, 'prop');

  return (
    <Firehose
      resources={[
        {
          kind: props.kind,
          kindObj: props.kindObj,
          name: props.name,
          namespace: props.namespace,
          isList: false,
          prop: 'obj',
        } as FirehoseResource,
      ].concat(props.resources || [])}
    >
      <PageHeading
        detail={true}
        title={props.name}
        titleFunc={props.titleFunc}
        menuActions={props.menuActions}
        buttonActions={props.buttonActions}
        kind={props.kind}
        breadcrumbsFor={
          props.breadcrumbsFor
            ? props.breadcrumbsFor
            : breadcrumbsForDetailsPage(props.kindObj, props.match)
        }
        resourceKeys={resourceKeys}
        customData={props.customData}
        badge={props.badge || getBadgeFromType(props.kindObj && props.kindObj.badge)}
        icon={props.icon}
      />
      <HorizontalNav
        pages={props.pages}
        pagesFor={props.pagesFor}
        className={`co-m-${_.get(props.kind, 'kind', props.kind)}`}
        match={props.match}
        label={props.label || (props.kind as any).label}
        resourceKeys={resourceKeys}
        customData={props.customData}
      />
    </Firehose>
  );
}, ErrorBoundaryFallback);

export type Page = {
  href: string;
  name: string;
  component?: React.ComponentType<any>;
};

export type DetailsPageProps = {
  match: match<any>;
  title?: string | JSX.Element;
  titleFunc?: (obj: K8sResourceKind) => string | JSX.Element;
  menuActions?: Function[] | KebabOptionsCreator; // FIXME should be "KebabAction[] |" refactor pipeline-actions.tsx, etc.
  buttonActions?: any[];
  pages?: Page[];
  pagesFor?: (obj: K8sResourceKind) => Page[];
  kind: K8sResourceKindReference;
  kindObj?: K8sKind;
  label?: string;
  name?: string;
  namespace?: string;
  resources?: FirehoseResource[];
  breadcrumbsFor?: (obj: K8sResourceKind) => { name: string; path: string }[];
  customData?: any;
  badge?: React.ReactNode;
  icon?: React.ComponentType<{ obj: K8sResourceKind }>;
};

DetailsPage.displayName = 'DetailsPage';
