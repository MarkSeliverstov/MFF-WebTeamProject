import { WebsiteRecord, Execution, PreparedExecution, PreparedWebsiteRecord } from './model';
import { BASIC_MONGO_URL } from "../config";
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
        response = await fetch(`${BASIC_MONGO_URL}${apiUrl}`,{
            method:method,
            body:JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status !== 200){
            throw new Error(`Error when execute fetch to the db with URL: ${BASIC_MONGO_URL}${apiUrl}, METHOD: ${method} and BODY: ${JSON.stringify(body)}, status code: ${response.status}`);
        }
    } else {
        response = await fetch(`${BASIC_MONGO_URL}${apiUrl}`,{
            method:method,
        });
        if (response.status !== 200){
            throw new Error(`Error when execute fetch to the db with URL: ${BASIC_MONGO_URL}${apiUrl}, METHOD: ${method}, status code: ${response.status}`);
        }
    }
    return await response.json();
}

/** RECORDS */

export async function getRecordByID(id: string): Promise<any>{
    try{
        return await executeFetch(recordWithIdUrl(id), fetchMethod.GET);
    }
    catch (error) {
        console.error(`(db api) Error in getRecordByID: ${error}`);
    }
}


export async function updateRecord(record: WebsiteRecord) {
    try{
        const id  = record.id!;
        record.id = undefined;
        await executeFetch(`/api/record/${id}`, fetchMethod.PUT, record);
        record.id = id;
    }
    catch (error) {
        console.error(`(db api) Error in updateRecord: ${error}`);
    }
}


export async function deleteRecord(record: WebsiteRecord) {
    try{
        await executeFetch(recordWithIdUrl(record.id), fetchMethod.DEL);
    }
    catch (error) {
        console.error(`(db api) Error in deleteRecord: ${error}`);
    }
}


export async function createRecord(record: WebsiteRecord) {
    await executeFetch("/api/record", fetchMethod.POST, record);
}


export async function getRecordsList(): Promise<any>{
    return await executeFetch("/api/records", fetchMethod.GET);
}

/** EXECUTIONS */

export async function getExecutionByID(id: string): Promise<any>{
    return await executeFetch(executionWithIdUrl(id), fetchMethod.GET);
}

export async function updateExecution(exe: Execution) {
    try{
        const id  = exe.id!;
        exe.id = undefined;
        await executeFetch(`/api/execution/${id}`, fetchMethod.PUT, exe);
        exe.id = id;
    } catch (error) {
        console.error(`(db api) Error in updateExecution: ${error}`);
    }
}

export async function deleteExecution(exe: Execution) {
    await executeFetch(executionWithIdUrl(exe.id), fetchMethod.DEL, exe);
}


export async function createExecution(exe: Execution): Promise<any> {
    return await executeFetch("/api/execution", fetchMethod.POST, exe);
}


export async function getRootExecutions(): Promise<any>{
    return await executeFetch("/api/executions", fetchMethod.GET);
}


export async function getExecutionsByOwnerIDAndGroupID(ownerId: string, groupId: number): Promise<any>{
    return await executeFetch(`/api/executions?ownerId=${ownerId}&groupId=${groupId}`, fetchMethod.GET);
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
