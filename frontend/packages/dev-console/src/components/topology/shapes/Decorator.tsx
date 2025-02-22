import * as React from 'react';
import SvgDropShadowFilter from '../../svg/SvgDropShadowFilter';
import { createSvgIdUrl } from '../../../utils/svg-utils';

import './Decorator.scss';

type DecoratorTypes = {
  x: number;
  y: number;
  radius: number;
  onClick?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
  href?: string;
  external?: boolean;
};

const FILTER_ID = 'DecoratorDropShadowFilterId';

const Decorator: React.FunctionComponent<DecoratorTypes> = ({
  x,
  y,
  radius,
  onClick,
  children,
  href,
  external,
}) => {
  const decorator = (
    <g className="odc-decorator" transform={`translate(${x}, ${y})`} onClick={onClick}>
      <SvgDropShadowFilter id={FILTER_ID} stdDeviation={1} floodOpacity={0.5} />
      <circle
        className="odc-decorator__bg"
        cx={0}
        cy={0}
        r={radius}
        filter={createSvgIdUrl(FILTER_ID)}
      />
      {children}
    </g>
  );
  if (href) {
    return (
      /*
      // @ts-ignore */
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className="odc-decorator__link" xlinkHref={href} target={external ? '_blank' : null}>
        {decorator}
      </a>
    );
  }
  return decorator;
};

export default Decorator;
