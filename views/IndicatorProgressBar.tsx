//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	ctn: {
		borderRadius: '5px', display: 'flex', alignItems: 'stretch',
		// Configurable styles.
		background: '#bbb', margin: '4px 0', height: 16,
		// Text Label
		color: 'white', fontSize: 'x-small', textAlign: 'left',
	},
	label2: {display: 'flex', alignItems: 'center'},
	label: {flex: 1, padding: '0 6px', display: 'flex', alignItems: 'center'},
});

interface IProps {
	total: number;
	label?: React.ReactNode;
	label2?: React.ReactNode;
	style?: object;
	// margin?: string;
	// bg?: string;
	// height?: number;
	primary: number;
	bgPrimary?: string;
	secondary: number;
	bgSecondary?: string;
}

export const IndicatorProgressBar = React.memo((
	{
		total, primary, secondary,
		label = '', label2, style,
		bgPrimary = '#3a3', bgSecondary = '#ffa500',
	}: IProps,
) => {
	const cls = useStyles();

	const ps = Math.round(secondary / total * 100);
	return (
		<div className={cls.ctn} style={style}>
			<div style={{width: Math.round(primary / total * 100) + '%', background: bgPrimary}}/>
			<div className={cls.label2} style={{width: ps + '%', background: bgSecondary}}>{ps > 3 ? label2 : undefined}</div>
			<div className={cls.label}>{label}</div>
		</div>
	);
});