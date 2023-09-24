import { WebsiteRecord, Execution, ExecutionSatus } from "./model";
import { BasicMongoUrl } from "../config";
import fetch from "node-fetch";

/** Fetching */

enum fetchMethod{
    GET="GET",
    PUT="PUT",
    DEL="DELETE",
    POST="POST"
}

const recordWithIdUrl = (id:string | undefined) => {
    if (id === undefined){
        throw new Error("Expected id but it is undefined");
    }
    return `/api/record/${id}`;
};

const executionWithIdUrl = (id: string | undefined) => {
    if (id === undefined){
        throw new Error("Expected id but it is undefined");
    }
    return `/api/execution/${id}`;
};


/** For all exectutions with handled errors */
async function executeFetch(apiUrl: string, method: fetchMethod, body: object | null = null) {
    let response;
    if (body){
        response = await fetch(`${BasicMongoUrl}${apiUrl}`,{
            method:method,
            body:JSON.stringify(body)
        });
        if (response.status !== 200){
            throw new Error(`Error when execute fetch to the db with URL: ${BasicMongoUrl}${apiUrl}, METHOD: ${method} and BODY: ${JSON.stringify(body)}`);
        }
    } else {
        response = await fetch(`${BasicMongoUrl}${apiUrl}`,{
            method:method,
        });
        if (response.status !== 200){
            throw new Error(`Error when execute fetch to the db with URL: ${BasicMongoUrl}${apiUrl}, METHOD: ${method}`);
        }
    }
    return await response.json();
}

/** RECORDS */

export async function getRecordByID(id: string): Promise<any>{
    try{
        return executeFetch(recordWithIdUrl(id), fetchMethod.GET);
    }
    catch (error) {
        throw new Error("Error in getRecordByID");
    }
}


export async function updateRecord(record: WebsiteRecord) {
    try{
    executeFetch(recordWithIdUrl(record.id), fetchMethod.PUT, record);
    }
    catch (error ) {
        throw new Error("Error in updateRecord");
    }
}


export async function deleteRecord(record: WebsiteRecord) {
    try{
    executeFetch(recordWithIdUrl(record.id), fetchMethod.DEL);
    }
    catch (error) {
        throw new Error("Error in deleteRecord");
    }
}


export async function createRecord(record: WebsiteRecord) {
    executeFetch("/api/record", fetchMethod.POST, record);
}


export async function getRecordsList(): Promise<any>{
    return executeFetch("/api/records", fetchMethod.GET);
}

/** EXECUTIONS */

export async function getExecutionByID(id: string): Promise<any>{
    return executeFetch(executionWithIdUrl(id), fetchMethod.GET);
}

export async function updateExecution(exe: Execution) {
    executeFetch(executionWithIdUrl(exe.id), fetchMethod.PUT, exe);
}

export async function deleteExecution(exe: Execution) {
    executeFetch(executionWithIdUrl(exe.id), fetchMethod.DEL, exe);
}


export async function createExecution(exe: Execution) {
    executeFetch("/api/execution", fetchMethod.POST, exe);
}


export async function getRootExecutions(): Promise<any>{
    return executeFetch("/api/executions", fetchMethod.GET);
}


export async function getExecutionsByOwnerIDAndGroupID(ownerId: string, groupId: number): Promise<any>{
    return executeFetch(`/api/executions?ownerId=${ownerId}&groupId=${groupId}`, fetchMethod.GET);
}

/** Just usefull functions */

export async function getLatestRootExecutionByRecord(record: WebsiteRecord): Promise<any> {
    if (record.latestGroupId === 0){
        return null;
    }

    const lastExecutionsGroup = await getExecutionsByOwnerIDAndGroupID(record.id!, record.latestGroupId);
    const exe = lastExecutionsGroup.find((exe: Execution) => exe.root==true);
    if (exe === undefined) {
        throw new Error(`Not found root execution for ownerId: ${record.id} and latestGroupId: ${record.latestGroupId}`);
    }
    return exe;
}
