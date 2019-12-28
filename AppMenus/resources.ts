//

import {getAppSecondaryMenu, IMenuSection, newMenuSection} from '../../components/AppSecondaryMenu';
import {newDashboardGoal} from '../resources/constructors';
import {mocked} from '../resources/mocked-goals';
import {IGoal} from '../resources/typed-goals';

export const AppMenuGoals = getAppSecondaryMenu<IGoal, IMenuSection>();

const secOverview = newMenuSection<IGoal>('sec-overview', 'Overview', [
	newDashboardGoal('goals', 'All Goals'),
]);
const secGoals = newMenuSection<IGoal>('sec-goals', 'Overview',
	mocked.goals,
);
const sections: IMenuSection<IGoal>[] = [
	secOverview,
	secGoals,
];
const defaultMenuItemId = sections[0].items[0]._id;

// Resource > General Resource
export const RR = {
	sections,
	defaultMenuItemId,
};