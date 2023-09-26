import {writable} from 'svelte/store';

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

export const viewModeStore = writable(true);