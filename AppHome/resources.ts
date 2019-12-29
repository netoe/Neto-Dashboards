'use strict';

export type IR = typeof R;

export const R = {
	title: 'Dashboards',
};

const R_ZH: IR = {
	// [ 目标管理 | 目标助手 | 仪表盘 | 项目助手 | 任务助手 ]
	title: '目标管理',
};

// Recourse > Bundle
export const RB = {df: R, en: R, zh: R_ZH};
