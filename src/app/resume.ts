export class Resume {
    profilePic: string;
    name: string;
    address: string;
    objective:string;
    contactNo: number;
    email: string;
    socialProfile: string;
    projects: Projects[] = [];
    educations: Education[] = [];
    otherDetails: string;
    skills: Skill[] = [];
    technicalskills: TechnicalSkill[] = [];
    achievements: Achievement[] = [];


    constructor() {
        this.projects.push(new Projects());
        this.educations.push(new Education());
        this.skills.push(new Skill());
        this.technicalskills.push(new TechnicalSkill());
        this.achievements.push(new Achievement());
    }
}

export class Projects {
    projectTitle: string;
    projectDesc: string;
    // jobDescription: string;
    // startDate: string;
    // experience: number;
}
export class TechnicalSkill {
    tech: string;
   
    
}
export class Achievement {
    achievement: string;
   
    
}

export class Education {
    college: string;
    course: string;
    // location: string;
    percentage: number;
    passingyear:number;
}

export class Skill {
    value: string;
}
