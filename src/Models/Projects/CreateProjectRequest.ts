export class CreateProjectRequest {
    constructor() {
        this.description = "";
        this.title = ""
        this.userId = ""
    }

    userId: string;
    description: string;
    title: string;
}