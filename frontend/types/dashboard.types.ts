export interface Workspace {
  id: string;
  name: string;
}

export interface User {
  name: string;
  email: string;
  image?: string;
}

export type JobStatus = "PENDING" | "STARTED" | "DONE" | "FAILED";
export type UrlStatus = "ACTIVE" | "INACTIVE";

export interface JobCounts {
  pending: number;
  started: number;
  finished: number;
}

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
}

export interface Job {
  id: string;
  status: "PENDING" | "STARTED" | "DONE" | "FAILED";
  definition: string;
  scheduleStart: string | null;
  cron: string | null;
  startedAt: string | null;
  finishedAt: string | null;
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
    logs: number;
    results: number;
  };
}
export interface FieldProps {
  label: string;
  value: React.ReactNode;
  editable?: boolean;
}
