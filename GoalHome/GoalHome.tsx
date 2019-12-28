//

import React from 'react';
import {AppPageDescription} from '../../components/AppPageDescription';
import {AppPageHeader} from '../../components/AppPageHeader';
import {ICountdownEntry, ICountDownPrimaryAndSecondaryBundle} from '../resources/typed-countdowns';
import {IGoal} from '../resources/typed-goals';
import {CardCountdownEntry} from '../views/CardCountdownEntry';
import {useStyles} from './styles';

interface IProps {
	goal: IGoal;
}

export const GoalHome = React.memo(({goal}: IProps) => {
	const cls = useStyles();
	const {name, description, countdowns} = goal;

	const renderCountdownEntries = (countdowns?: ICountdownEntry<ICountDownPrimaryAndSecondaryBundle>[]) => (
		<div className={cls.ctnSection}>
			{countdowns && countdowns.length > 0 ? countdowns.map(countdown => (
				<CardCountdownEntry key={countdown.name} countdown={countdown}/>
			)) : undefined}
		</div>
	);

	return (
		<div>
			<AppPageHeader title={name}/>
			<AppPageDescription description={description}/>
			<div className={cls.ctnSections}>
				<div className={cls.ctnLeftSections}>
					{renderCountdownEntries(countdowns)}
				</div>
				<div className={cls.ctnRightSections}/>
			</div>
		</div>
	);
});
