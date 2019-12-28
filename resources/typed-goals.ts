//

// A general goal like project,
// containing countdowns, projects, tasks, schedules, plans, histories, and etc.
import {ICountdownEntry} from './typed-countdowns';

export interface IGoal {
	_id: string;
	name: string;
	description?: string;
	countdowns?: ICountdownEntry<any>[];
}
