/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

interface ICompany {
  name: string;
  description: string;
  departments: IDepartment[];
}

interface IDepartment {
  id: string;
  name: string;
  description?: string;
  teamLeader?: IMember;
  members?: IMember[];
}

interface IMember {
  id: string;
  name: string;
  gender: 'M' | 'F';
  job: string;
  description: string;
  skills: ISkills;
}

interface ISkills {
  [key: string]: number;
}

interface ISkill {
  name: string;
  level: number;
}
