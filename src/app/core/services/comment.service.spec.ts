import { CommentService } from "./comment.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";

describe("CommentService", () => {
  let service: CommentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(CommentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getCommentsForPost should use GET to retrieve data', () => {
    service.getCommentsForPost(1).subscribe();

    const testRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/comments?postId=' + 1);

    expect(testRequest.request.method).toEqual('GET');
  });
});