import { ButtonHTMLAttributes } from 'react';
import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';

interface ButtonAttrs extends ButtonHTMLAttributes<HTMLButtonElement> {}

export type ButtonProps = ResultWebComponentProps<ButtonAttrs>;

export default withWebUtilProps<ButtonAttrs>()('button');
