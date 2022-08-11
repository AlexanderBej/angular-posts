import { Injectable } from "@angular/core";
import { Comment } from "../models/comment.model";
import { Post } from "../models/post.model";

const NEW_POSTS_KEY = 'new_posts';
const EDITED_POSTS_KEY = 'edited_posts'
const REMOVED_POST_IDS_KEY = 'removed_post_ids';
const NEW_COMMENTS_KEY = 'new_comments';
const EDITED_COMMENTS_KEY = 'edited_comments'
const REMOVED_COMMENT_IDS_KEY = 'removed_comment_ids';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public saveNewPosts(posts: Post[]): void {
        window.sessionStorage.setItem(NEW_POSTS_KEY, JSON.stringify(posts))
    }

    public getNewPosts(): string | null {
        return window.sessionStorage.getItem(NEW_POSTS_KEY)
    }


    public saveEditedPosts(posts: Post[]): void {
        window.sessionStorage.setItem(EDITED_POSTS_KEY, JSON.stringify(posts))
    }

    public getEditedPosts(): string | null {
        return window.sessionStorage.getItem(EDITED_POSTS_KEY)
    }


    public saveRemovedPostIds(postIds: number[]): void {
        window.sessionStorage.setItem(REMOVED_POST_IDS_KEY, JSON.stringify(postIds))
    }

    public getRemovedPostIds(): string | null {
        return window.sessionStorage.getItem(REMOVED_POST_IDS_KEY)
    }



    public saveNewComments(comments: Comment[]): void {
        window.sessionStorage.setItem(NEW_COMMENTS_KEY, JSON.stringify(comments))
    }

    public getNewComments(): string | null {
        return window.sessionStorage.getItem(NEW_COMMENTS_KEY)
    }


    public saveEditedComments(comments: Comment[]): void {
        window.sessionStorage.setItem(EDITED_COMMENTS_KEY, JSON.stringify(comments))
    }

    public getEditedComments(): string | null {
        return window.sessionStorage.getItem(EDITED_COMMENTS_KEY)
    }

    
    public saveRemovedCommentIds(commentIds: number[]): void {
        window.sessionStorage.setItem(REMOVED_COMMENT_IDS_KEY, JSON.stringify(commentIds))
    }

    public getRemovedCommentIds(): string | null {
        return window.sessionStorage.getItem(REMOVED_COMMENT_IDS_KEY)
    }
}