export interface Workspace {
  id: string;
  name: string;
}

export interface User {
  name: string;
  email: string;
  image?: string;
}

export type JobStatus = "ACTIVE" | "PAUSED";
export type ExecutionStatus = "PENDING" | "RUNNING" | "DONE" | "FAILED";
export type UrlStatus = "ACTIVE" | "INACTIVE";

export interface TargetURL {
  id: string;
  name: string;
  url: string;
  status: UrlStatus;
  createdAt: string;
  updatedAt: string;
  _count: {
    datapoints: number;
  };
  datapoints: {
    jobs: { status: JobStatus }[];
  }[];
}

export interface Datapoint {
  id: string;
  name: string;
  path: string;
  targetUrlId: string;
  createdAt: string;
  updatedAt: string;
  targetUrl: {
    id: string;
    url: string;
    name: string;
    status: UrlStatus;
  };
}
export interface JobExecution {
  id: string;
  status: ExecutionStatus;
  startedAt: string | null;
  finishedAt: string | null;
  jobId: string;
  createdAt: string;
  logs: Log[];
  results: Result[];
}

export interface Log {
  id: string;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  message: string;
  date: string;
  executionId: string;
}

export interface Result {
  id: string;
  date: string;
  definition: Record<string, unknown>;
  executionId: string;
}

export interface Job {
  id: string;
  status: JobStatus;
  definition: string;
  scheduleStart: string | null;
  cron: string | null;
  datapointId: string;
  extractorType: "SMART" | "BASIC";
  outputFormat: "JSON" | "MD" | "TXT";
  notifyOnFinish: boolean;
  notifyOnDiff: boolean;
  notifyOnFail: boolean;
  createdAt: string;
  updatedAt: string;
  datapoint: {
    id: string;
    name: string;
    path: string;
    targetUrl: {
      id: string;
      url: string;
      name: string;
      status: UrlStatus;
    };
  };
  _count: {
    executions: number;
  };
}

export interface FieldProps {
  label: string;
  value: React.ReactNode;
  editable?: boolean;
}
export interface ExecutionWithResults extends JobExecution {
  results: Result[];
  _count: { logs: number; results: number };
}

export interface ExecutionSummary {
  id: string;
  status: ExecutionStatus;
  startedAt: string | null;
  finishedAt: string | null;
  jobId: string;
  createdAt: string;
  _count: { logs: number; results: number };
}
export type NotificationType = "EXECUTION_DONE" | "EXECUTION_FAILED" | "EXECUTION_DIFF";

export interface Notification {
  id: string;
  userId: string;
  jobId: string | null;
  executionId: string | null;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}