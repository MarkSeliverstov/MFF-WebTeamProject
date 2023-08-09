import {writable} from 'svelte/store';

export const graphData = writable<{ nodes: {data: {id: string, status: string, title: string | undefined, crawlTimeStart: number | undefined, crawlTimeEnd: number | undefined}}[], edges: {data: {source: string, target: string}}[] }>({ nodes: [], edges: [] });