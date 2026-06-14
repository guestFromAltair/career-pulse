export enum ApplicationStatus {
    WISHLIST  = 'WISHLIST',
    APPLIED   = 'APPLIED',
    SCREENING = 'SCREENING',
    INTERVIEW = 'INTERVIEW',
    OFFER     = 'OFFER',
    REJECTED  = 'REJECTED',
    WITHDRAWN = 'WITHDRAWN',
    GHOSTED   = 'GHOSTED'
}

export enum WorkMode {
    REMOTE = 'REMOTE',
    HYBRID = 'HYBRID',
    ONSITE = 'ONSITE'
}

export enum ExperienceLevel {
    JUNIOR    = 'JUNIOR',
    MID       = 'MID',
    SENIOR    = 'SENIOR',
    STAFF     = 'STAFF',
    PRINCIPAL = 'PRINCIPAL'
}

export interface JobApplication {
    id:               string;
    userId:           string;
    company:          string;
    role:             string;
    jobUrl?:          string;
    jobDescription?:  string;
    location?:        string;
    workMode:         WorkMode;
    experienceLevel?: ExperienceLevel;
    salaryMin?:       number;
    salaryMax?:       number;
    currency:         string;
    status:           ApplicationStatus;
    appliedAt?:       string;
    followUpAt?:      string;
    responseAt?:      string;
    excitement:       number;
    referral:         boolean;
    referralContact?: string;
    source?:          string;
    notes?:           string;
    interviewStages:  InterviewStage[];
    activities:       Activity[];
    createdAt:        string;
    updatedAt:        string;
}

export interface InterviewStage {
    id:               string;
    applicationId:    string;
    stageName:        string;
    scheduledAt?:     string;
    completedAt?:     string;
    interviewerName?: string;
    interviewerRole?: string;
    format?:          string;
    notes?:           string;
    outcome?:         string;
    createdAt:        string;
    updatedAt:        string;
}

export interface Activity {
    id:            string;
    applicationId: string;
    type:          string;
    description:   string;
    metadata?:     Record<string, unknown>;
    createdAt:     string;
}

export const KANBAN_COLUMNS: ApplicationStatus[] = [
    ApplicationStatus.WISHLIST,
    ApplicationStatus.APPLIED,
    ApplicationStatus.SCREENING,
    ApplicationStatus.INTERVIEW,
    ApplicationStatus.OFFER
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
    [ApplicationStatus.WISHLIST]:  'Wishlist',
    [ApplicationStatus.APPLIED]:   'Applied',
    [ApplicationStatus.SCREENING]: 'Screening',
    [ApplicationStatus.INTERVIEW]: 'Interviewing',
    [ApplicationStatus.OFFER]:     'Offer Received',
    [ApplicationStatus.REJECTED]:  'Rejected',
    [ApplicationStatus.WITHDRAWN]: 'Withdrawn',
    [ApplicationStatus.GHOSTED]:   'Ghosted'
};