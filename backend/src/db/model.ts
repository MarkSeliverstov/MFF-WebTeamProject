import { model, Schema } from "mongoose";

export enum PageStatus{
    PENDING = "pending", 
    RUNNING = "running", 
    SUCCESS = "success",
    FAILED = "failed"
}

export enum PageStatusCode{
    ABORTED = "aborted",
    FAILED = "failed"
}


// For records on the main page
export interface WebPageRecordDocument {
    url: string; // primary key
    label: string;
    regexp: string;
    tags: string[];
    active: boolean;
    periodicity: number;
    status: PageStatus;
    timestampStart: number;
    timestampEnd?: number;
    crawledCount?: number;
    totalCount?: number;
    error?: string;
}


// For graphQL
export interface WebPageNodes {
    url: string; // primary key
    nodes: Record<string, WebPageNode>;
}


// For each Node
export interface WebPageNode {
    url: string; // primary key
    statusCode: number | PageStatusCode;
    links: string[];
    title?: string;
    timestampStart?: number;
    timestampEnd?: number;
}


const WebPageRecordSchema = new Schema<WebPageRecordDocument>({
    url: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    regexp: { type: String, required: true },
    tags: [{ type: String }],
    active: { type: Boolean, required: true },
    periodicity: { type: Number, required: true },
    status: { type: String, enum: Object.values(PageStatus), required: true },
    timestampStart: { type: Number, required: true },
    timestampEnd: { type: Number },
    crawledCount: { type: Number },
    totalCount: { type: Number },
    error: { type: String },
});
  

const WebPageNodesSchema = new Schema<WebPageNodes>({
    url: { type: String, required: true, unique: true },
    nodes: {
        type: Map,
        of: {
            url: { type: String, required: true },
            statusCode: { type: Schema.Types.Mixed, required: true },
            links: [{ type: String }],
            title: { type: String },
            timestampStart: { type: Number },
            timestampEnd: { type: Number },
        },
    },
});
  
  const WebPageRecordModel = model<WebPageRecordDocument>("WebPageRecord", WebPageRecordSchema);
  const WebPageNodesModel = model<WebPageNodes>("WebPageNodes", WebPageNodesSchema);
  
  export { WebPageRecordModel, WebPageNodesModel };