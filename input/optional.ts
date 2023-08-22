export interface AddressOptional {
    street: any;
    city: string;
    postalCodeOptional?: string;
}

export interface ContactOptional {
    email: string;
    phone: string;
    faxOptional?: string;
}

export type PersonOptional = {
    name: string;
    age: number;
    address: AddressOptional;
    contact: ContactOptional;
};

export type EmployeeOptional = {
    jobTitle: string;
    department: string;
    supervisorOptional?: EmployeeOptional;
} & PersonOptional;

export type ProjectOptional = {
    projectTitle: string;
    startDate: string;
    endDateOptional?: string;
};

export type CompanyOptional = {
    companyName: any;
    companyUnknown?: unknown;
    address: AddressOptional;
    contact: ContactOptional;
    employees?: EmployeeOptional[];
    projects: ProjectOptional[];
};
