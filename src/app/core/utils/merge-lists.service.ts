import { Injectable } from "@angular/core";
import { Comment } from "../models/comment.model";
import { Post } from "../models/post.model";
import { StorageService } from "../services/storage.service";

@Injectable({
    providedIn: 'root'
})
export class MergeListsService {

    private storageNewPosts: Post[] = [];
    private storageEditedPosts: Post[] = [];
    private storageRemovedPostIds: number[] = [];

    private storageNewComments: Comment[] = [];
    private storageEditedComments: Comment[] = [];
    private storageRemovedCommentIds: number[] = [];


    constructor(private storageService: StorageService) {
        this.setObjectArrays();
    }


    /**
     * 
     * @param postId the id of the post to get from storage
     * @returns the post saved in session storage
     * usually called when the id is higher than 100, which is the limit on https://jsonplaceholder.typicode.com/
     * 
     * first it searches in edited posts, since that would be the latest modification to any post
     * if it is not found there, it searches in new posts
     * 
     */
    public getSinglePostFromStorage(postId: number): Post | undefined {
        let foundPost: Post | undefined;
        const editedPostFromStorage = this.storageEditedPosts.find(editedPost => {
            return editedPost.id == postId;
        });

        if(editedPostFromStorage === undefined) {
            const newPostFromStorage = this.storageNewPosts.find(newPost => {
                return newPost.id == postId;
            });
            foundPost = newPostFromStorage
        } else foundPost = editedPostFromStorage

        return foundPost;
    }


    /**
     * 
     * @param posts - the list of posts returned from the API call
     * @returns - the list of posts from the API
     *              + new added posts by the user from the session storage
     *              + replaced edited posts with the ones from the storage
     *              + removed posts based on the id list from the storage  
     */
    public mergePostList(posts: Post[]): Post[] {
        // replace the edited posts with the storaged ones
        if (this.storageEditedPosts !== []) {
            posts = this.mergeEditedPosts(posts);
        }

        // add the new posts from the storage
        if (this.storageNewPosts !== []) {
            posts = posts.concat(this.storageNewPosts)
        }

        // remove the posts based on the ids in storage
        if (this.storageRemovedPostIds.length > 0) {
            posts = this.removePostsFromList(posts);
        }

        return posts;
    }

    /**
     * 
     * @param posts the posts fed from the API
     * @returns posts merged with edited ones from session storage
     * 
     * creates a list of IDs which is iterated to remove the 
     * original post from the list and replaced it with the 
     * edited one from the storage
     */
    private mergeEditedPosts(posts: Post[]): Post[] {
        const editedPostIdList: number[] = [];
        this.storageEditedPosts.forEach(editedPost => {
            editedPostIdList.push(editedPost.id);
        });

        editedPostIdList.forEach(postId => {
            const postToRemove = posts.find(post => {
                return post.id == postId;
            });

            const postToReplace = this.storageEditedPosts.find(post => {
                return post.id == postId;
            });
            if (postToRemove !== undefined) {
                const index = posts.indexOf(postToRemove);
                posts.splice(index, 1);
                if (postToReplace !== undefined) {
                    posts.push(postToReplace);
                }
            }
        });

        return posts;
    }

    private removePostsFromList(posts: Post[]) {
        this.storageRemovedPostIds.forEach(remPostId => {
            const postToRemove = posts.find(post => {
                return post.id == remPostId;
            });
            if (postToRemove !== undefined) {
                const index = posts.indexOf(postToRemove);
                posts.splice(index, 1);
            }
        });
        return posts;
    }


    /**
     * 
     * @param post post object completed by the user
     * 
     * creates an ID (the one fed from the API response is always '101')
     * and adds the post to the session storage
     */
    public saveNewPostToStorage(post: Post): void {
        if (this.storageNewPosts !== []) {
            const postId = 101 + this.storageNewPosts.length
            post.id = postId
        }
        this.storageNewPosts?.push(post)

        this.storageService.saveNewPosts(this.storageNewPosts)
    }


    /**
     * 
     * @param post post object edited by the user
     * 
     * searches the session storage if the post was previously edited
     * if so, it will be removed
     * and the new object is saved in storage
     */
    public saveEditedPostToStorage(post: Post): void {
        if (this.storageEditedPosts !== []) {
            const editedPost = this.storageEditedPosts.find(editedPost => {
                return editedPost.id == post.id;
            })
            if (editedPost !== undefined) {
                const index = this.storageEditedPosts.indexOf(editedPost)
                this.storageEditedPosts.splice(index, 1);
            }
        }
        this.storageEditedPosts.push(post)

        this.storageService.saveEditedPosts(this.storageEditedPosts)
    }

    /**
     * 
     * @param postId ID of the removed post
     * 
     * adds the ID to the removedPostId list in session storage
     */
    public addToRemovedPostsList(postId: number): void {
        this.storageRemovedPostIds.push(postId);

        this.storageService.saveRemovedPostIds(this.storageRemovedPostIds);
    }






    /**
     * 
     * @param commId the id of the comment to get from storage
     * @returns the comment saved in session storage
     * usually called when the id is higher than 500, which is the limit on https://jsonplaceholder.typicode.com/
     * 
     * first it searches in edited comments, since that would be the latest modification to any comment
     * if it is not found there, it searches in new comments
     * 
     */
     public getSingleCommentFromStorage(commId: number): Comment | undefined {
        let foundComment: Comment | undefined;
        const editedCommFromStorage = this.storageEditedComments.find(editedComm => {
            return editedComm.id == commId;
        });

        if(editedCommFromStorage === undefined) {
            const newCommFromStorage = this.storageNewComments.find(newComm => {
                return newComm.id == commId;
            });
            foundComment = newCommFromStorage
        } else foundComment = editedCommFromStorage

        return foundComment;
    }


    /**
         * 
         * @param comments - the list of comments returned from the API call
         * @param postId - the id of the post the comments belong to
         * @returns - the list of comments from the API
         *              + new added comments by the user from the session storage
         *              + replaced edited comments with the ones from the storage
         *              + removed comments based on the id list from the storage  
         */
    public mergePostCommentList(comments: Comment[], postId: number): Comment[] {
        // replace the edited comments with the storaged ones
        if (this.storageEditedComments !== []) {
            comments = this.mergeEditedComments(postId, comments);
        }

        // add the new comments from the storage
        if (this.storageNewComments !== []) {
            const newPostComments: Comment[] = []
            this.storageNewComments.forEach(newComm => {
                if (newComm.postId === postId) {
                    newPostComments.push(newComm)
                }
            });
            if (newPostComments !== []) {
                comments = comments.concat(newPostComments)
            }
        }

        // remove the comments based on the ids in storage
        if (this.storageRemovedCommentIds.length > 0) {
            comments = this.removeCommentsFromList(comments);
        }
        return comments;
    }


    private removeCommentsFromList(comments: Comment[]) {
        this.storageRemovedCommentIds.forEach(remCommentId => {
            const commToRemove = comments.find(comm => {
                return comm.id == remCommentId;
            });

            if (commToRemove !== undefined) {
                const index = comments.indexOf(commToRemove);
                comments.splice(index, 1);
            }
        });
        return comments;
    }

    /**
     * 
     * @param postId the ID of the post related to the comments
     * @param comments the comments fed from the API based on the post ID
     * @returns comments merged with edited ones from session storage
     * 
     * creates a list of IDs which is iterated to remove the 
     * original comment from the list and replaced it with the 
     * edited one from the storage
     */
    private mergeEditedComments(postId: number, comments: Comment[]) {
        const editedCommentIdList: number[] = [];
        this.storageEditedComments.forEach(editedComm => {
            if (editedComm.postId === postId) {
                editedCommentIdList.push(editedComm.id);
            }
        });

        editedCommentIdList.forEach(commentId => {
            const commToRemove = comments.find(comment => {
                return comment.id == commentId;
            });

            const commToReplace = this.storageEditedComments.find(comment => {
                return comment.id == commentId;
            });
            if (commToRemove !== undefined) {
                const index = comments.indexOf(commToRemove);
                comments.splice(index, 1);
                if (commToReplace !== undefined) {
                    comments.push(commToReplace);
                }
            }
        });
        return comments;
    }

    /**
    * 
    * @param comment comment object completed by the user
    * 
    * creates an ID (the one fed from the API response is always '501')
    * and adds the comment to the session storage
    */
    public saveNewCommentToStorage(comment: Comment): void {
        if (this.storageNewComments !== []) {
            const commId = 501 + this.storageNewComments.length
            comment.id = commId
        }
        this.storageNewComments?.push(comment)
        this.storageService.saveNewComments(this.storageNewComments)
    }


    /**
    * 
    * @param comment comment object edited by the user
    * 
    * searches the session storage if the comment was previously edited
    * if so, it will be removed
    * and the new object is saved in storage
    */
    public saveEditedCommentToStorage(comment: Comment): void {
        if (this.storageEditedComments !== []) {
            const editedComment = this.storageEditedComments.find(editedComm => {
                return editedComm.id == comment.id;
            })
            if (editedComment !== undefined) {
                const index = this.storageEditedComments.indexOf(editedComment)
                this.storageEditedComments.splice(index, 1);
            }
        }
        this.storageEditedComments.push(comment)

        this.storageService.saveEditedComments(this.storageEditedComments)
    }


    /**
         * 
         * @param commentId ID of the removed comment
         * 
         * adds the ID to the removedCommentId list in session storage
         */
    public addToRemovedCommentsList(commentId: number): void {
        this.storageRemovedCommentIds.push(commentId);

        this.storageService.saveRemovedCommentIds(this.storageRemovedCommentIds);
    }



    /**
     *  get the JSON objects from session storage (in case they exist)
     * and parse them in arrays declared in class
     * */
    private setObjectArrays(): void {
        const newPostString = this.storageService.getNewPosts();
        if (newPostString !== null) {
            this.storageNewPosts = JSON.parse(newPostString);
        }

        const editedPostString = this.storageService.getEditedPosts();
        if (editedPostString !== null) {
            this.storageEditedPosts = JSON.parse(editedPostString);
        }

        const removedPostIdString = this.storageService.getRemovedPostIds();
        if (removedPostIdString !== null) {
            this.storageRemovedPostIds = JSON.parse(removedPostIdString);
        }


        const newCommentString = this.storageService.getNewComments();
        if (newCommentString !== null) {
            this.storageNewComments = JSON.parse(newCommentString);
        }

        const editedCommentString = this.storageService.getEditedComments();
        if (editedCommentString !== null) {
            this.storageEditedComments = JSON.parse(editedCommentString);
        }

        const removedCommentIdString = this.storageService.getRemovedCommentIds();
        if (removedCommentIdString !== null) {
            this.storageRemovedCommentIds = JSON.parse(removedCommentIdString);
        }
    }
}