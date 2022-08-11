import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Post } from "src/app/core/models/post.model";
import { PostService } from "src/app/core/services/post.service";
import { MergeListsService } from "src/app/core/utils/merge-lists.service";

@Injectable()
export class PostResolver implements Resolve<Post | undefined> {
    constructor(private postsService: PostService, private mergeService: MergeListsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Post | undefined> {
        const postID = route.params.id;
        const foundPost = this.mergeService.getSinglePostFromStorage(postID);
        if(foundPost !== undefined) {
            return of(foundPost);
        }
        return this.postsService.getPostByID(postID);
    }
}