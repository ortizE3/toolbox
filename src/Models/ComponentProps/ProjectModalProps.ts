import { Project } from "../Projects/Project";

export class ProjectModalProps {
    isEdit?: boolean;
    project?: Project;
    open: boolean = false;
    openHandler: any;
}