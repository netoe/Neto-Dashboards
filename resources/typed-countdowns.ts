//

import React from 'react';

// Definition of a countdown with a bundle of (realtime )values.
export interface ICountdownEntry<T> {
	name: string;
	description?: string;
	labels: string[];
	colors?: string[];
	bundle: T;
}

// A group of countdown consisting of 1. total, 2. primary, and 3. secondary.
// Like Weekdays and Weekends, Free Hours and Working Hours.
export interface ICountDownPrimaryAndSecondaryBundle<T = number> {
	unit?: string;
	total: T;
	primary: T;
	secondary: T;
	render?: (value: T) => React.ReactNode;
}

export interface ICountDown {
	label: string;
	value: number | string;
	color: string;
}
