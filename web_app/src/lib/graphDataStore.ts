import {writable} from 'svelte/store';
import type { Execution } from '$lib/types';

export const websiteGraphData = writable<{ 
    nodes: {
        data: {
            id: string, 
            status: string, 
            title: string | undefined, 
            crawlTimeStart: number | undefined, 
            crawlTimeEnd: number | undefined,
            links: string[]
        }}[], 

        edges: {
            data: {
                source: string, 
                target: string
            }}[]

}>({ nodes: [], edges: [] });

export const domainGraphData = writable<{
    nodes: { 
        data: { 
            id: string; 
            links: string[]; 
        }; }[], 

    edges: {
        data: {
            source: string, 
            target: string
        }}[]
}>({ nodes: [], edges: []})

export const executionsStore = writable<Execution[]>([]);

export const viewModeStore = writable(true);

export const livePreview = writable(false);