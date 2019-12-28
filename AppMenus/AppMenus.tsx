//

import React from 'react';
import {IGoal} from '../resources/typed-goals';
import {AppMenuGoals, RR} from './resources';

interface IProps {
	selectedMenuItem?: IGoal;
	onSelected: (entry: IGoal) => any;
}


// The controlled menus for text tailor.
export const AppMenus = React.memo(({selectedMenuItem, onSelected}: IProps) => (
	<AppMenuGoals
		sections={RR.sections} color={'#099'}
		selectedMenuItemId={selectedMenuItem?._id || RR.defaultMenuItemId}
		onSelect={(entryId, entry) => onSelected(entry)}
	/>
));
