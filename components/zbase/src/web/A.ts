import { AnchorHTMLAttributes } from 'react';
import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';

interface AnchorAttrs extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export type AnchorProps = ResultWebComponentProps<AnchorAttrs>;

export default withWebUtilProps<AnchorAttrs>()('a');
