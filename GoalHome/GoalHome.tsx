//

import React from 'react';
import {AppPageHeader} from 'src/mui-views/app/AppPageHeader';
import {AppPageParagraph} from 'src/mui-views/app/AppPageParagraph';
import {ICountdownEntry, ICountDownPrimaryAndSecondaryBundle} from '../resources/typed-countdowns';
import {IGoal} from '../resources/typed-goals';
import {CardCountdownEntry} from '../views/CardCountdownEntry';
import {PanelDefaultCountdown} from '../views/PanelDefaultCountdown';
import {useStyles} from './styles';

interface IProps {
	goal: IGoal;
}

export const GoalHome = React.memo(({goal}: IProps) => {
	const cls = useStyles();
	const {name, description, countdown, countdowns} = goal;

	const renderCountdownEntries = (countdowns?: ICountdownEntry<ICountDownPrimaryAndSecondaryBundle>[]) => (
		<div className={cls.ctnSection}>
			{countdowns && countdowns.length > 0 ? countdowns.map(countdown => (
				<CardCountdownEntry key={countdown.name} countdown={countdown}/>
			)) : undefined}
		</div>
	);

	return (
		<div className={cls.ctnPage}>
			<AppPageHeader title={name}/>
			<AppPageParagraph description={description}/>
			<div className={cls.ctnSections}>
				<div className={cls.ctnLeftSections}>
					{countdown ? <PanelDefaultCountdown goal={goal} days={countdown}/> : undefined}
					{renderCountdownEntries(countdowns)}
				</div>
				<div className={cls.ctnRightSections}/>
			</div>
		</div>
	);
});
