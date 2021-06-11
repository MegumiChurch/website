import { CSSProperties, ReactChild } from 'react';
import MediaQuery from 'react-responsive';

interface Props {
  children?: ReactChild | ReactChild[];
  style?: CSSProperties;
  className?: string;
}

export function Desktop({ className, style, children }: Props) {
  return (
    <MediaQuery query="(min-width: 768px)">
      <div className={className} style={style}>
        {children}
      </div>
    </MediaQuery>
  );
}

export function Mobile({ className, style, children }: Props) {
  return (
    <MediaQuery query="(max-width: 767px)">
      <div className={className} style={style}>
        {children}
      </div>
    </MediaQuery>
  );
}
