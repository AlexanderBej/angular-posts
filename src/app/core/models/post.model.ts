export class Post {
    id: number;
    userId: number | undefined;
    title: string;
    body: string | undefined;

    constructor() {
        this.id = -1;
        this.title = '';
      }
}
