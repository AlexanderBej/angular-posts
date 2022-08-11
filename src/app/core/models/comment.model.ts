export class Comment {
    id: number
    postId: number | undefined
    name: string | undefined
    email: string | undefined
    body: string | undefined

    constructor() {
        this.id = -1;
      }
}