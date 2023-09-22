import {WebsiteRecord, Execution} from "./model";
import { BasicMongoUrl } from "../config";


export async function getRecordByID(id: string): Promise<WebsiteRecord|null>{
    const response = await fetch(`${BasicMongoUrl}/api/record/${id}`);
    if (response.status !== 200){
        return null;
    }
    return await response.json();
}


export async function getExecutionByID(id: string): Promise<Execution|null>{
    const response = await fetch(`${BasicMongoUrl}/api/execution/${id}`);
    if (response.status !== 200){
        return null;
    }
    return await response.json();
}


export async function getExecutionsByOwnerIDAndGroupID(ownerId: string, groupId: number): Promise<Execution[]>{
    const response = await fetch(`${BasicMongoUrl}/api/executions?ownerId=${ownerId}&groupId=${groupId}`);
    if (response.status !== 200){
        throw new Error(`${BasicMongoUrl}/api/records returns status code: ${response.status}`);
    }
    return await response.json();
}


export async function getRecords(): Promise<WebsiteRecord[]>{
    const response = await fetch(`${BasicMongoUrl}/api/records`);
    return await response.json();
}


export async function getRootExecutions(): Promise<Execution[]>{
    const response = await fetch(`${BasicMongoUrl}/api/executions`);
    return await response.json();
}